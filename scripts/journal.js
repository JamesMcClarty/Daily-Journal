import API from "./data.js"
import entryComponent from "./entryComponent"

const journal = {

    fillEntries: function () {
        return API.getJournalEntries() //Initial page load
            .then(data => {
                entryComponent.fillArticle(data) //Fills article
            })
    },


    saveEntry: function () {
        if (document.querySelector("#editEntryId").value === "") { //If the hidden value is empty, make a new entry
            const journalObject = entryComponent.makeObject(); // Make the object
            if (journalObject !== undefined) { // If journal object isn't undefined
                API.saveJournalEntries(journalObject) //Saves entry
                    .then((response) => { //Nested function for another .then
                        if (response.status === 201) { //If the promise is successful
                            API.getJournalEntries() //refresh page
                                .then(data => {
                                    entryComponent.fillArticle(data) // Fills the article
                                })
                                .then(data => {
                                    var radio = document.getElementsByName("moodRadio");
                                    for (let i = 0; i < radio.length; i++)
                                        radio[i].checked = false; // Unchecks the radio buttons
                                })
                        }
                    })
            }
        }

        else { //If the hidden value is populated
            API.editJournalEntry(document.getElementById("editEntryId").value)
                .then(data => {
                    document.querySelector("#journalDate").value = ""
                    document.querySelector("#conceptsForm").value = ""
                    document.querySelector("#journalEntry").value = ""
                    document.querySelector("#moodOption").value = ""
                    document.getElementById("editEntryId").value = ""
                    API.getJournalEntries() //Repopulates
                        .then(apiData => {
                            document.querySelector(".journalArray").innerHTML = " " // clears article
                            entryComponent.fillArticle(apiData)
                            var radio = document.getElementsByName("moodRadio");
                            for (let i = 0; i < radio.length; i++)
                                radio[i].checked = false; // Unchecks the radio buttons
                        })
                })
        }
    },

    radioFunctionSearch: function (event) { //Event for Radio Buttons

        API.getJournalEntries() //Retrieves the array
            .then(data => {
                var sortedData = data.filter(element => { //Filters the json and puts in the object
                    let matchesRadio = false; // boolean
                    console.log(event.target.value)
                    console.log(element.moodId)
                    if (event.target.value === element.moodId) { //If the radio button matches the current mood
                        matchesRadio = true;
                    }
                    return matchesRadio //Returns result
                });
                document.querySelector(".journalArray").innerHTML = " " //Clears array
                entryComponent.fillArticle(sortedData) //Populates article with results.

            })
    },

    deleteEntryButton: function (event) { //Deletes the journal entry
        let splitID = event.target.id.split("-"); //Splits the id of the button
        API.deleteJournalEntry(splitID[1]) //Deletes the journal with the button's matching ID
            .then(data => {
                document.querySelector(".journalArray").innerHTML = " " // clears article
                API.getJournalEntries() //Repopulates
                    .then(data => {
                        entryComponent.fillArticle(data)
                        var radio = document.getElementsByName("moodRadio");
                        for (let i = 0; i < radio.length; i++)
                            radio[i].checked = false; // Unchecks the radio buttons
                    })
            })
    },

    editEntryButton: function (event) {
        let entryNum = event.target.id.split("-") //Splits the ID of the string!
        document.getElementById("editEntryId").value = entryNum[1] //Gets the ID
        fetch(`http://localhost:8088/entries/${entryNum[1]}?_expand=mood`)
            .then(response => response.json())
            .then(parsedRespone => { //Fills forms
                document.querySelector("#journalDate").value = parsedRespone.date
                document.querySelector("#conceptsForm").value = parsedRespone.concept
                document.querySelector("#journalEntry").value = parsedRespone.entry
                document.querySelector("#moodOption").value = parsedRespone.moodId
            })
    },

    //Function searches the keyword in entries upon pressing enter.
    searchEntry: function (event) {

        if (event.which === 13) {
            let dataArray = [] //Makes data array
            API.getJournalEntries() //Gets the entries
                .then(data => data.forEach(entry => { //For each entry...
                    for (const value of Object.values(entry)) { //Get the values of the article
                        let searchResult = event.target.value.toString().toUpperCase() //Uppercase the values
                        let valueResult = value.toString().toUpperCase()
                        if (valueResult.includes(searchResult)) { // If there is a comparison...
                            dataArray.push(entry)//Push into the array
                            break //Break
                        }
                    }

                    if (dataArray.length !== 0) {
                        document.querySelector(".journalArray").innerHTML = " " // clears article
                        entryComponent.fillArticle(dataArray) //Fills article
                    }
                })
                )
        }
    }
}
export default journal

import apiImport from "./data.js"
import entryComponent from "./entryComponent.js"
import API from "./data.js";

/*
    Importing objects from different JS files and executing them 
    in journal.js
*/

apiImport.getJournalEntries() //Initial page load
    .then(data => {
        entryComponent.fillArticle(data) //Fills article
        data.forEach(element => { // For each element, assigns a delete button event handler.
            $(`#deleteButton-${element.id}`).click(deleteEntryButton)
            $(`#editButton-${element.id}`).click(editEntryButton)
        });
    })

const saveButton = $("#submitButton")//Assign button

// IMPORTANT
saveButton.click(function () {
    if (document.querySelector("#editEntryId").value === "") { //If the hidden value is empty, make a new entry
        const journalObject = entryComponent.makeObject(); // Make the object
        if (journalObject != undefined) { // If journal object isn't undefined
            apiImport.saveJournalEntries(journalObject) //Saves entry
                .then((response) => { //Nested function for another .then
                    if (response.status === 201) { //If the promise is successful
                        apiImport.getJournalEntries() //refresh page
                            .then(data => {
                                entryComponent.fillArticle(data) // Fills the article
                                var radio = document.getElementsByName("moodRadio");
                                for (let i = 0; i < radio.length; i++)
                                    radio[i].checked = false; // Unchecks the radio buttons
                                data.forEach(element => { //For each data entry, assign an event handler
                                    $(`#deleteButton-${element.id}`).click(deleteEntryButton)
                                    $(`#editButton-${element.id}`).click(editEntryButton)
                                });

                            })

                    }
                })
        }
    }

    else { //If the hidden value is populated
        API.editJournalEntry(document.getElementById("editEntryId").value)
            .then(data => {
                $("#journalDate").val("")
                $("#conceptsForm").val("")
                $("#journalEntry").val("")
                $("#moodOption").val("")
                document.getElementById("editEntryId").value = ""
                apiImport.getJournalEntries() //Repopulates
                    .then(apiData => {
                        document.querySelector(".journalArray").innerHTML = " " // clears article
                        entryComponent.fillArticle(apiData)
                        var radio = document.getElementsByName("moodRadio");
                        for (let i = 0; i < radio.length; i++)
                            radio[i].checked = false; // Unchecks the radio buttons
                        apiData.forEach(element => {
                            $(`#deleteButton-${element.id}`).click(deleteEntryButton)
                            $(`#editButton-${element.id}`).click(editEntryButton)
                        })
                    })
            })

    }
})


const radioFunctionSearch = (event) => { //Event for Radio Buttons

    apiImport.getJournalEntries() //Retrieves the array
        .then(data => {

            var sortedData = data.filter(element => { //Filters the json and puts in the object
                let matchesRadio = false; // boolean
                if (event.target.value === element.mood) { //If the radio button matches the current mood
                    matchesRadio = true;
                }
                return matchesRadio //Returns result
            });
            document.querySelector(".journalArray").innerHTML = " " //Clears array
            entryComponent.fillArticle(sortedData) //Populates article with results.
            sortedData.forEach(element => {
                $(`#deleteButton-${element.id}`).click(deleteEntryButton)
                $(`#editButton-${element.id}`).click(editEntryButton)
            })
        })
}

const deleteEntryButton = (event) => { //Deletes the journal entry
    let splitID = event.target.id.split("-"); //Splits the id of the button
    apiImport.deleteJournalEntry(splitID[1]) //Deletes the journal with the button's matching ID
        .then(data => {
            document.querySelector(".journalArray").innerHTML = " " // clears article
            apiImport.getJournalEntries() //Repopulates
                .then(data => {
                    entryComponent.fillArticle(data)
                    var radio = document.getElementsByName("moodRadio");
                    for (let i = 0; i < radio.length; i++)
                        radio[i].checked = false; // Unchecks the radio buttons
                    data.forEach(element => {
                        $(`#deleteButton-${element.id}`).click(deleteEntryButton)
                        $(`#editButton-${element.id}`).click(editEntryButton)
                    })
                })
        })
}

const editEntryButton = (event) => {
    let entryNum = event.target.id.split("-")
    document.getElementById("editEntryId").value = entryNum[1]
    fetch(`http://localhost:8088/entries/${entryNum[1]}`)
        .then(response => response.json())
        .then(parsedRespone => {
            $("#journalDate").val(parsedRespone.date)
            $("#conceptsForm").val(parsedRespone.concept)
            $("#journalEntry").val(parsedRespone.entry)
            $("#moodOption").val(parsedRespone.mood)
        })
}

//Function searches the keyword in entries upon pressing enter.
const searchEntry = (event) => {

    if (event.which === 13) {
        let dataArray = []
        apiImport.getJournalEntries()
            .then(data => data.forEach(entry => {
                for (const value of Object.values(entry)) {
                    let searchResult = event.target.value.toString().toUpperCase()
                    let valueResult = value.toString().toUpperCase()
                    if (valueResult.includes(searchResult)) {
                        dataArray.push(entry)
                        break
                    }
                }

                if (dataArray.length != 0) {
                    document.querySelector(".journalArray").innerHTML = " " // clears article
                    entryComponent.fillArticle(dataArray) //Fills article
                    data.forEach(element => { // For each element, assigns a delete button event handler.
                        $(`#deleteButton-${element.id}`).click(deleteEntryButton)
                        $(`#editButton-${element.id}`).click(editEntryButton)
                    });
                }
            }))
    }
}

//Searching for text on keypress
document.getElementById("searchBox").addEventListener('keypress', searchEntry)

//Radio Buttons
$("#happyRadio").click(radioFunctionSearch)
$("#sadRadio").click(radioFunctionSearch)
$("#angryRadio").click(radioFunctionSearch)
$("#confusedRadio").click(radioFunctionSearch)
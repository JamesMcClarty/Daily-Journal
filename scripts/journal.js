import apiImport from "./data.js"
import entryComponent from "./entryComponent.js"

/*
    Importing objects from different JS files and executing them 
    in journal.js
*/

apiImport.getJournalEntries()
    .then(data => entryComponent.fillArticle(data))

const saveButton = $("#submitButton")//Assign button

// IMPORTANT
saveButton.click(function () {

    const journalObject = entryComponent.makeObject(); // Make the object
    if (journalObject != undefined) { // If journal object isn't undefined
        apiImport.saveJournalEntries(journalObject) //Saves entry
            .then((response) => { //Nested function for another .then
                if (response.status === 201) { //If the promise is successful
                    console.log(response) // You can check if a response is true.
                    apiImport.getJournalEntries() //refresh page
                        .then(data => entryComponent.fillArticle(data))
                }
            })
    }
})


const radioFunctionSearch = (event) => { //Event for Radio Buttons
    
    apiImport.getJournalEntries() //Retrieves the array
        .then(data => {        

            var sortedData = data.filter(element => { //Filters the json and puts in the object
                let matchesRadio = false; // boolean
                if(event.target.value === element.mood){ //If the radio button matches the current mood
                    matchesRadio = true;
                }
                return matchesRadio //Returns result
            });
            document.querySelector(".journalArray").innerHTML = " " //Clears array
        entryComponent.fillArticle(sortedData) //Populates article with results.
        })
}

//Radio Buttons
$("#happyRadio").click(radioFunctionSearch)
$("#sadRadio").click(radioFunctionSearch)
$("#angryRadio").click(radioFunctionSearch)
$("#confusedRadio").click(radioFunctionSearch)
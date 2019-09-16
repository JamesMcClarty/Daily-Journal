import journalObject from "./journal.js"

journalObject.fillEntries();

document.querySelector("#submitButton").addEventListener("click", function(){
    journalObject.saveEntry()
    .then(data => {
            journalObject.fillEntries();
            var radio = document.getElementsByName("moodRadio");
            for (let i = 0; i < radio.length; i++)
                radio[i].checked = false; // Unchecks the radio buttons
            data.forEach(element => { //For each data entry, assign an event handler
                document.querySelector(`#deleteButton-${element.id}`).addEventListener("click", journalObject.deleteEntryButton)
                document.querySelector(`#editButton-${element.id}`).addEventListener("click", journalObject.editEntryButton)
            });
    })
})

//Searching for text on keypress
document.getElementById("searchBox").addEventListener("keypress", journalObject.searchEntry)

//Radio Buttons
document.getElementById("happyRadio").addEventListener("click", journalObject.radioFunctionSearch)
document.getElementById("sadRadio").addEventListener("click", journalObject.radioFunctionSearch)
document.getElementById("angryRadio").addEventListener("click", journalObject.radioFunctionSearch)
document.getElementById("confusedRadio").addEventListener("click", journalObject.radioFunctionSearch)
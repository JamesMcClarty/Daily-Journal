import journalObject from "./journal.js"

journalObject.fillEntries() //Fills on start up

//Submits or edits form on keypress
document.querySelector("#submitButton").addEventListener("click", function () {
    journalObject.saveEntry()
})

//Searching for text on keypress
document.getElementById("searchBox").addEventListener("keypress", journalObject.searchEntry)

//Radio Buttons
document.getElementById("happyRadio").addEventListener("click", journalObject.radioFunctionSearch)
document.getElementById("sadRadio").addEventListener("click", journalObject.radioFunctionSearch)
document.getElementById("angryRadio").addEventListener("click", journalObject.radioFunctionSearch)
document.getElementById("confusedRadio").addEventListener("click", journalObject.radioFunctionSearch)

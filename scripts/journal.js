import apiImport from "./data.js"
import entryComponent from "./entryComponent.js"

/*
    Importing objects from different JS files and executing them 
    in journal.js
*/

apiImport.getJournalEntries()
    .then(data => entryComponent.fillArticle(data))

const saveButton = $("#submitButton")
saveButton.click(apiImport.saveJournalEntries)
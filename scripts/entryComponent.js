import entriesDOM from "./entriesDOM.js"

const entryComponentClass = {

    fillArticle: function(journalEntry) {
        const journalArray = document.querySelector(".journalArray");
        for(let i = 0; i < Object.keys(journalEntry).length; i++){
            journalArray.innerHTML += entriesDOM.fillJournalEntry(journalEntry[i]);
        }
    }
}

export default entryComponentClass
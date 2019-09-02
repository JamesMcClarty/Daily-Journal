entriesDOMObject = Object.create(entryDOMClass);

const entryComponentClass = {

    fillArticle: function(journalEntry) {
        const journalArray = document.querySelector(".journalArray");
        for(let i = 0; i < Object.keys(journalEntry).length; i++){
            journalArray.innerHTML += entriesDOMObject.fillJournalEntry(journalEntry[i]);
        }
    }
}

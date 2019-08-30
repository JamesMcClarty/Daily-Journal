entriesDOMObject = Object.create(entryDOMClass);

const entryComponentClass = {

    fillArticle: function(journalEntry) {
        const journalArray = document.querySelector(".journalArray");
        journalArray.innerHTML += entriesDOMObject.fillJournalEntry(journalEntry);
    }
}

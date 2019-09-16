import entriesDOM from "./entriesDOM"

const entryComponentClass = {

    fillArticle: function(journalEntry) {
        const journalArray = document.querySelector(".journalArray");
        for(let i = 0; i < Object.keys(journalEntry).length; i++){
            journalArray.innerHTML += entriesDOM.fillJournalEntry(journalEntry[i]);
        }
    },

    makeObject: function(){
        //Makes journal object
        const newJournalEntry = {
            date: document.querySelector("#journalDate").value,
            concept: document.querySelector("#conceptsForm").value,
            entry: document.querySelector("#journalEntry").value,
            mood: document.querySelector("#moodOption").value
        }
        //If any of the fields are empty
        if (newJournalEntry.date === "" ||
            newJournalEntry.concept === "" ||
            newJournalEntry.entry === "") {

            alert("Please fill out the forms.");
            return(undefined) //makes an alert and returns undefined.
        }

        else{ //else, it returns the object.
            return newJournalEntry;
        }
    }
}

export default entryComponentClass
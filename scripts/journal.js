const journalEntry = {
    date: "07/24/2018",
    concept: "Array methods",
    entry: "We learned about 4 different array methods today. forEach made sense, but the others still confuse me.",
    mood: "Ok"
};

const javaEntryArray = [journalEntry];

const journalArray = document.querySelector(".journalArray");

const fillJournalEntry = (entry) => {

    return`
    <div>
    <h3> ${entry.concept} </h3>
    <p> ${entry.date} </p>
    <p> ${entry.entry} </p>
    <p> ${entry.mood} </p>
    </div>
    `
}

journalArray.innerHTML += fillJournalEntry(journalEntry);
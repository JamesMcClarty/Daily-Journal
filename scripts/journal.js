fetch("http://localhost:8088/entries") // Fetch from the API
    .then(entries => entries.json())  // Parse as JSON
    .then(entriesList => {
        entriesList.forEach(entry => {
            fillArticle(entry);
        })
    })

const journalArray = document.querySelector(".journalArray");

const fillJournalEntry = (entry) => {

    return `
    <div>
    <h3> ${entry.concept} </h3>
    <p> ${entry.date} </p>
    <p> ${entry.entry} </p>
    <p> ${entry.mood} </p>
    </div>
    `
}

const fillArticle = (journalEntry) => {
    journalArray.innerHTML += fillJournalEntry(journalEntry);
}
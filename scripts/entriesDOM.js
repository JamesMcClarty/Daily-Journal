const entryDOMClass = {
    fillJournalEntry: (entry) => {
        console.table(entry)
        return `
        <div>
        <h3> ${entry.concept} </h3>
        <p> ${entry.date} </p>
        <p> ${entry.entry} </p>
        <p> ${entry.mood} </p>
        </div>
        `
    }
}

export default entryDOMClass
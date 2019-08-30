const entryDOMClass = {
    fillJournalEntry: (entry) => {
        console.table(entry)
        return `
        <div>
        <h3> ${entry[1].concept} </h3>
        <p> ${entry[1].date} </p>
        <p> ${entry[1].entry} </p>
        <p> ${entry[1].mood} </p>
        </div>
        `
    }
}
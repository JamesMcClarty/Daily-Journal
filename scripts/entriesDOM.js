const entryDOMClass = {
    fillJournalEntry: (entry) => {
        return `
        <div>
        <h3> ${entry.concept} </h3>
        <p> ${entry.date} </p>
        <p> ${entry.entry} </p>
        <p> ${entry.mood} </p>
        </div>
        <input id="deleteButton-${entry.id}" class="deleteButton" type="button" value="Delete">
        `
    }
}

export default entryDOMClass
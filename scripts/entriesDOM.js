const entryDOMClass = {
    fillJournalEntry: (entry) => { //Fills the entry DOM
        return `
        <div>
        <h3> ${entry.concept} </h3>
        <p> ${entry.date} </p>
        <p> ${entry.entry} </p>
        <p> ${entry.mood.type} </p>
        </div>
        <input id="deleteButton-${entry.id}" class="deleteButton" type="button" value="Delete">
        <input id="editButton-${entry.id}" class="editButton" type="button" value="Edit">
        `
    }
}

export default entryDOMClass
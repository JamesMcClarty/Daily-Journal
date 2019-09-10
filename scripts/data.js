import entryComponent from "./entryComponent.js"

const API = {
    getJournalEntries: async function () {
        const response = await fetch("http://localhost:8088/entries")
        return await response.json()
    },

    saveJournalEntries: function () {
        // Invoke the factory function, passing along the form field values
        const newJournalEntry = {
            date: $("#journalDate").val(),
            concept: $("#conceptsForm").val(),
            entry: $("#journalEntry").val(),
            mood: $("#moodOption").val()
        }

        console.log(newJournalEntry)

        // Use `fetch` with the POST method to add your entry to your API
        fetch("http://localhost:8088/entries", { // Replace "url" with your API's URL
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newJournalEntry)
        })
    }
}

export default API
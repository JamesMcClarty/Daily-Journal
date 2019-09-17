const API = {
    getJournalEntries: function () { //Gets the entire JSON list
        return fetch("http://localhost:8088/entries?_expand=mood")
            .then(response => response.json())
    },

    saveJournalEntries: function (object) {
        {
            document.querySelector(".journalArray").innerHTML = " " //Clears list
            return fetch("http://localhost:8088/entries", { // Adds a new entry
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(object)
            })
        }
    },

    deleteJournalEntry: function (id) {
        return fetch(`http://localhost:8088/entries/${id}`, { //Deletes entry by id
            method: "DELETE"
        })
            .then(response => response.json())
    },

    editJournalEntry: function (id) { //Edits journal entry

        const editedEntry = {
            date: document.querySelector("#journalDate").value,
            concept: document.querySelector("#conceptsForm").value,
            entry: document.querySelector("#journalEntry").value,
            moodId: document.querySelector("#moodOption").value
        }

        return fetch(`http://localhost:8088/entries/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(editedEntry)
        })
    }
}

export default API
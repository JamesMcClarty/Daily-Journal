import entryComponent from "./entryComponent.js"

const API = {
    getJournalEntries: function () {
        return fetch("http://localhost:8088/entries")
            .then(response => response.json())
    },

    saveJournalEntries: function (object) {
        {
            document.querySelector(".journalArray").innerHTML = " "
            // Use `fetch` with the POST method to add your entry to your API
            return fetch("http://localhost:8088/entries", { // Replace "url" with your API's URL
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(object)
            })
        }
    },

    deleteJournalEntry: function (id){
        return fetch(`http://localhost:8088/entries/${id}`, {
            method: "DELETE"
        })
            .then(response => response.json())
    }


}

export default API
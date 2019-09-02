/*
    Main application logic that uses the functions and objects
    defined in the other JavaScript files.

    Change the fake variable names below to what they should be
    to get the data and display it.
*/
const apiObject = Object.create(API);
const entryComponentObject = Object.create(entryComponentClass);

apiObject.getJournalEntries()
.then(data => entryComponentObject.fillArticle(data))
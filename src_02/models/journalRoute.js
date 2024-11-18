export default function JournalEntryRoute(args) {
    const {
        journalEntryGuid
        , date
        , notes
        , picturesDictionary
        , routes
    } = args;

    this.journalEntryGuid = journalEntryGuid;
    this.date = date;
    this.notes = notes;
    this.picturesDictionary = picturesDictionary;
    this.routes = routes.map(x => new JournalEntryRoute(x));

    // do the ternary operator on empty string b/c technically you're sending null
    // although api has the option to reject empty string (but not defaults like for guid)
    // https://stackoverflow.com/questions/7187576/validation-of-guid
}
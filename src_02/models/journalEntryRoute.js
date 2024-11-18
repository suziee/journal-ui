export default function JournalEntryRoute(args) {
    const {
        areaName
        , cragName
        , routeName
        , routeGuid
        , type
        , grade
        , numberOfPitches
        , journalEntryGuid
        , date
        , journalEntryRouteGuid
        , pitchesClimbed
        , notes
        , sortId
        , picturesDictionary
    } = args;

    this.areaName = areaName;
    this.cragName = cragName;
    this.routeName = routeName;
    this.routeGuid = routeGuid;
    this.routeType = type;
    this.grade = grade;
    this.numberOfPitches = parseInt(numberOfPitches);
    this.journalEntryGuid = journalEntryGuid;
    this.date = date;
    this.journalEntryRouteGuid = journalEntryRouteGuid;
    this.pitchesClimbed = parseInt(pitchesClimbed);
    this.notes = notes;
    this.sortId = parseInt(sortId);
    this.picturesDictionary = picturesDictionary;

    this.fullName = areaName + " / " + cragName + " / " + routeName;

    // do the ternary operator on empty string b/c technically you're sending null
    // although api has the option to reject empty string (but not defaults like for guid)
    // https://stackoverflow.com/questions/7187576/validation-of-guid
}
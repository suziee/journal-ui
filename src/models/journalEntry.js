export default function JournalEntry(args) {
    const {
        // route fields
        routeGuid,
        location,
        locationCrumbs,
        routeName,
        routeType,
        bookGrade,
        mountainProjectGrade,
        numberOfPitches,
        approachFilePath, // this will probably turn into pictures for the day as part of JE
        // journal entry fields
        journalEntryGuid,
        pitchesClimbed,
        date,
        notes,
        sortId,
    } = args;

    this.routeGuid = routeGuid;
    this.locationCrumbs = locationCrumbs;
    this.routeName = routeName == "" ? null : routeName;
    this.routeType = routeType == "" ? null : routeType;
    this.bookGrade = bookGrade == "" ? null : bookGrade;
    this.mountainProjectGrade = mountainProjectGrade == "" ? null : mountainProjectGrade;
    this.numberOfPitches = parseInt(numberOfPitches);
    this.approachFilePath = approachFilePath;
    this.journalEntryGuid = journalEntryGuid;
    this.pitchesClimbed = parseInt(pitchesClimbed);
    this.date = date == "" ? null : date;
    this.notes = notes == "" ? null : notes;
    this.sortId = parseInt(sortId);
    this.location = location == "" ? null : location;

    if (this.locationCrumbs != null) {
        this.location = this.locationCrumbs.join(" / ");
        this.fullName = `${this.location} / ${this.routeName}`;
    } else if (this.location != null
        && this.location != ""
        && this.locationCrumbs == null) {
        this.locationCrumbs = this.location.split("/");
        this.locationCrumbs = this.locationCrumbs.map(x => x.trim());
    }

    // do the ternary operator on empty string b/c technically you're sending null
    // although api has the option to reject empty string (but not defaults like for guid)
    // https://stackoverflow.com/questions/7187576/validation-of-guid
}
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
    this.routeName = routeName;
    this.routeType = routeType;
    this.bookGrade = bookGrade;
    this.mountainProjectGrade = mountainProjectGrade;
    this.numberOfPitches = parseInt(numberOfPitches);
    this.approachFilePath = approachFilePath;
    this.journalEntryGuid = journalEntryGuid;
    this.pitchesClimbed = parseInt(pitchesClimbed);
    this.date = date;
    this.notes = notes;
    this.sortId = parseInt(sortId);
    this.location = location;

    if (this.locationCrumbs != null) {
        this.location = this.locationCrumbs.join(" / ");
        this.fullName = `${this.location} / ${this.routeName}`;
    } else if (this.location != null && this.locationCrumbs == null) {
        this.locationCrumbs = this.location.split(" / ");
    }

    // remove later? or use don't allow default values data annotation on api
    // just keep b/c don't allow default values was removed in .net 8
    // https://stackoverflow.com/questions/7187576/validation-of-guid
    if (notes == "") {
        this.notes = null;
    }

    if (date == "") {
        this.date = null;
    }
}
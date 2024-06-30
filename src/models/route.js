export default function Route(args) {
    const {
        location,
        locationCrumbs,
        routeName,
        routeType,
        bookGrade,
        mountainProjectGrade,
        numberOfPitches,
        routeGuid,
        approachFilePath,
    } = args;

    this.routeGuid = routeGuid;
    this.locationCrumbs = locationCrumbs;
    this.routeName = routeName;
    this.routeType = routeType;
    this.bookGrade = bookGrade;
    this.mountainProjectGrade = mountainProjectGrade;
    this.numberOfPitches = numberOfPitches;
    this.approachFilePath = approachFilePath;
    this.location = location;

    if (this.locationCrumbs != null) {
        this.location = this.locationCrumbs.join(" / ");
        this.fullName = `${this.location} / ${this.routeName}`;
    }
}
export function DateHelper(){}

DateHelper.getTotalDaysForYear = function(date) {
    if ((date.getFullYear() % 4 === 0 && date.getFullYear() % 100 > 0)
        || date.getFullYear() % 400 === 0) {
        return 366;
    }
    return 365;
}

DateHelper.addDays = function(oldDate, days) {
    let date = new Date(oldDate.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}

DateHelper.startOfYear = function(date) {
    return new Date(date.getFullYear(), DateHelper.JANUARY, 1);
}

DateHelper.toAlignedString = function(date, delimiter = "-") {
    const month = date.getMonth() + 1;

    // if (delimiter == null || delimiter == undefined) {
    //     delimiter = "-";
    // }
    
    // let str = month.toString().padLeft(2, '0') 
    // + delimiter + date.getDate().toString().padLeft(2, '0') 
    // + delimiter + date.getFullYear();

    let str = date.getFullYear()
    + delimiter + month.toString().padStart(2, '0') 
    + delimiter + date.getDate().toString().padStart(2, '0');
    
    return str;
}

DateHelper.equals = function(date1, date2) {
    return date1.getFullYear() == date2.getFullYear()
    && date1.getMonth() == date2.getMonth()
    && date1.getDate() == date2.getDate();
}

DateHelper.JANUARY = 0;
DateHelper.FEBRUARY = 1;
DateHelper.MARCH = 2;
DateHelper.APRIL = 3;
DateHelper.MAY = 4;
DateHelper.JUNE = 5;
DateHelper.JULY = 6;
DateHelper.AUGUST = 7;
DateHelper.SEPTEMBER = 8;
DateHelper.OCTOBER = 9;
DateHelper.NOVEMBER = 10;
DateHelper.DECEMBER = 11;

DateHelper.MonthsAbbr = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
DateHelper.DaysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
import { DateHelper } from './helper.js';

export function CalendarBuilder(args) {
    const {
        dates, year
    } = args;

    this.dates = dates;
    const startDate = getStartDate(this.dates, year);
    const startOfYear = DateHelper.startOfYear(startDate);
    const numberOfDays = DateHelper.getTotalDaysForYear(startDate);

	this.days = getDatesForYear(numberOfDays, startOfYear);
    
    this.gridDays = [];
    this.columns = [];
    initGrid(this, numberOfDays);

    this.outsideDays = [];
    initDaysClimbed(this);

    calculateColspan(this);
}

CalendarBuilder.prototype.build = function(id, tdOnClickFunc) {
    if (!tdOnClickFunc) {
        return;
    }

    const yAxis = DateHelper.DaysOfWeek;
    let xAxis = ["", ...DateHelper.MonthsAbbr];

    // build the header / x-axis / months
    const header = document.createElement("thead");
    const headerRow = document.createElement("tr");
    xAxis.map((x, index) => {
        const column = document.createElement("td");
        if (index === 0) {
            column.innerText = x;
        } else {
            column.innerText = x;
            column.setAttribute("colspan", this.columns[index - 1]);
        }
        headerRow.append(column);
    });
    header.append(headerRow);


    // build the body row by row (days of the week)
    const now = new Date(Date.now());
    const body = document.createElement("tbody");
    yAxis.map((row, rowIndex) => {
        const dataRow = document.createElement("tr");
        let colCounter = 0;
        xAxis.map((col, colIndex) => {
            if (colIndex === 0) {
                const column = document.createElement("td");
                column.innerText = row;
                dataRow.append(column);
            } else {
                const index = colIndex - 1;
                const colspan = this.columns[index];
                let colspanCounter = 0;
                
                while (colspanCounter < colspan) {
                    const column = document.createElement("td");
                    const date = this.gridDays[(colCounter * 7) + (rowIndex)];
                    if (date != null) {
                        column.innerText = date.getDate();
                        column.setAttribute("name", DateHelper.toAlignedString(date));
                        column.addEventListener("click", tdOnClickFunc);

                        if (this.outsideDays[(colCounter * 7) + (rowIndex)]) {
                            column.setAttribute("class", "bar-graph-fill");
                        }

                        if (DateHelper.equals(date, now)) {
                            column.setAttribute("id", "current-date");
                        } else {
                            column.className += " not-current-date";
                        }
                    } else {
                        column.setAttribute("class", "bar-graph-void");
                    }

                    dataRow.append(column);
                    colCounter++;
                    colspanCounter++;
                }
            }
        });

        body.append(dataRow);
    });

    const graph = document.getElementById(id);

    // clear original calendar
    while (graph.hasChildNodes()) {
        graph.removeChild(graph.firstChild);
    }

    graph.append(header, body);
}


/** "private" methods called in constructor */
function getStartDate(dates, year) {
    let startDate = new Date(year, DateHelper.JANUARY, 1);
    if (dates.length > 0) {
        startDate = dates[0];
    }

    return startDate;
}

function getDatesForYear(numberOfDays, startOfYear) {
    // set up dates for the whole year
    let days = Array.from(Array(numberOfDays).keys());
	days = days.map((day, index) => {
        return DateHelper.addDays(startOfYear, index);
    });
    return days;
}

function initGrid(_this, numberOfDays) {
    let counter = 0;
    // go through the entire year
    while (counter < numberOfDays) {
        // for each week
        for (let i = 0; i < 7; i++) {
            const date = _this.days[counter];
            // getDay returns day of week, so 
            if (counter < numberOfDays && date.getDay() === i) {
                _this.gridDays = [..._this.gridDays, date];
                counter++;
            } else {
                // this is for incomplete columns (first and/or last week of the year)
                _this.gridDays = [..._this.gridDays, null];
            }
            if (i === 0) {
                _this.columns = [..._this.columns, date.getMonth()]
            }
        }
    }
}

function initDaysClimbed(_this) {
    // later on when you do if (outsideDays[index]), out of bounds will return undefined which is treated as false
	let counter = 0;
	for (let index in _this.gridDays) {
        // exit early b/c no use in iterating the future
        // edit: used to be at the end of the loop but what if dates is empty?
        // for some reason dates[counter] did not throw error...
        // b/c gridDay != null is false and short circuits; would throw error when jan 01 is first gridDay
		if (counter == _this.dates.length) {
			break;
		}

        let gridDay = _this.gridDays[index];
		if (gridDay != null && DateHelper.equals(gridDay, _this.dates[counter])) {
			_this.outsideDays = [..._this.outsideDays, true];
			counter++;
		} else {
			_this.outsideDays = [..._this.outsideDays, false];
		}
	}
}

function calculateColspan(_this) {
    //https://stackoverflow.com/questions/5667888/counting-the-occurrences-frequency-of-array-elements
    _this.columns = _this.columns.reduce((accumulator, currentValue, currentIndex) => {
        if (accumulator[currentValue]) {
            accumulator[currentValue]++;
        } else {
            accumulator[currentValue] = 1;
        }

        return accumulator[currentValue], accumulator;
    }, {});
}

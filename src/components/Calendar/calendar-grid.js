import { DateHelper } from './helper.js';

export function getCalendarGrid(dates, year) {
    let tempDate = new Date(year, DateHelper.JANUARY, 1);
    if (dates.length > 0) {
        tempDate = dates[0];
    }

	const startOfYear = DateHelper.startOfYear(tempDate);
	const numberOfDays = DateHelper.getTotalDaysForYear(tempDate);
	
	// set up dates for the whole year
	let days = Array.from(Array(numberOfDays).keys());
	days = days.map((day, index) => {
        return DateHelper.addDays(startOfYear, index);
    });
	
	let gridDays = [];
	let columns = [];
	let counter = 0;
	
	// go through the entire year
	while (counter < numberOfDays) {
		// for each week
		for (let i = 0; i < 7; i++) {
            const date = days[counter];
			// getDay returns day of week, so 
            if (counter < numberOfDays && date.getDay() === i) {
                gridDays = [...gridDays, date];
                counter++;
            } else {
				// this is for incomplete columns (first and/or last week of the year)
                gridDays = [...gridDays, null];
            }
            if (i === 0) {
                columns = [...columns, date.getMonth()]
            }
        }
	}
	
    // later on when you do if (outsideDays[index]), out of bounds will return undefined which is treated as false
	let outsideDays = [];
	counter = 0;
	for (let index in gridDays) {
        // exit early b/c no use in iterating the future
        // edit: used to be at the end of the loop but what if dates is empty?
        // for some reason dates[counter] did not throw error...
        // b/c gridDay != null is false and short circuits; would throw error when jan 01 is first gridDay
		if (counter == dates.length) {
			break;
		}

        let gridDay = gridDays[index];
		if (gridDay != null && DateHelper.equals(gridDay, dates[counter])) {
			outsideDays = [...outsideDays, true];
			counter++;
		} else {
			outsideDays = [...outsideDays, false];
		}
	}

    //https://stackoverflow.com/questions/5667888/counting-the-occurrences-frequency-of-array-elements
    columns = columns.reduce((accumulator, currentValue, currentIndex) => {
        if (accumulator[currentValue]) {
            accumulator[currentValue]++;
        } else {
            accumulator[currentValue] = 1;
        }

        return accumulator[currentValue], accumulator;
    }, {});

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
            column.setAttribute("colspan", columns[index - 1]);
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
                const colspan = columns[index];
                let colspanCounter = 0;
                
                while (colspanCounter < colspan) {
                    const column = document.createElement("td");
                    const date = gridDays[(colCounter * 7) + (rowIndex)];
                    if (date != null) {
                        column.innerText = date.getDate();

                        if (outsideDays[(colCounter * 7) + (rowIndex)]) {
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

    const graph = document.getElementById("calendar-graph");

    // clear original calendar
    while (graph.hasChildNodes()) {
        graph.removeChild(graph.firstChild);
    }


    graph.append(header, body);
}
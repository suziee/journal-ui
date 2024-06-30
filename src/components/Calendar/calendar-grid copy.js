import { DateHelper } from './helper.js';

export function getCalendarGrid() {
    const now = new Date(Date.now());
    const startOfYear = DateHelper.startOfYear(now);
    const numberOfDays = DateHelper.getTotalDaysForYear(now);

    let days = Array.from(Array(numberOfDays).keys());
    days = days.map((day, index) => {
        return DateHelper.addDays(startOfYear, index);
    });

    let gridDay = [];
    let columns = [];
    let counter = 0;
    while (counter < numberOfDays) {
        for (let i = 0; i < 7; i++) {
            const date = days[counter];
            if (counter < numberOfDays && date.getDay() === i) {
                gridDay = [...gridDay, date];
                counter++;
            } else {
                gridDay = [...gridDay, null];
            }
            if (i === 0) {
                columns = [...columns, date.getMonth()]
            }
        }
    }

    const randomDays = gridDay.map((day, index) => {
        if (day == null) {
            return null;
        }

        return Math.floor(Math.random() * 2);
    });

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
                    const date = gridDay[(colCounter * 7) + (rowIndex)];
                    if (date != null) {
                        column.innerText = date.getDate();

                        if (randomDays[(colCounter * 7) + (rowIndex)]) {
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
    graph.append(header, body);
}
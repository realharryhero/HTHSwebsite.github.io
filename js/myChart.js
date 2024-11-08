/* Fetching CSV data of research. */

async function getData() {
    const response = await fetch("../data/contraildata.csv");
    const data = await response.text();
    const xEpochs = [];
    const yTrainingLoss = [];
    const yValidationLoss = [];
    const yAccuracy = [];

    // split(\n) - separate table by newline; i.e. by row
    // slice(start, end) - new array with elements with index from start to (end - 1), inclusive

    const table = data.split('\n').slice(2);

    table.forEach(row => {
        const columns = row.split(","); //split row into columns using columns
        const epoch = parseFloat(columns[13]); // assign epoch val
        xEpochs.push(epoch); //add it to list of epochs

        const trainingLoss = parseFloat(columns[0]); //assign temp val
        yTrainingLoss.push(trainingLoss);

        const validationLoss = parseFloat(columns[1]); //assign nhTemp val
        yValidationLoss.push(validationLoss);

        const accuracy = parseFloat(columns[3]); //assign ynhTemp val
        yAccuracy.push(accuracy);

        console.log(epoch, trainingLoss, validationLoss, accuracy);
    });

    return {xEpochs, yTrainingLoss, yValidationLoss, yAccuracy};
}

async function createChart() {
    const data = await getData();
    const myChart = document.getElementById("myChart");

const lineChart = new Chart(myChart, { // Construct the chart
    type: 'line',
    data: { // Define data
        labels: data.xEpochs, // x-axis labels
        datasets: [ // List of datasets
            {
                label: 'Training Loss',         // Dataset label for legend
                data: data.yTrainingLoss,         // Reference to array of y-values
                fill: false,                // Fill area under the linechart (true = yes, false = no)
                backgroundColor: 'rgba(255, 0, 132, 0.2)',  // Color for data marker
                borderColor:     'rgba(255, 0, 132, 1)',    // Color for data marker border
                borderWidth:     1, // Data marker border width
                yAxisID: 'y',
            },
            {
                label: 'Validation Loss',         // Dataset label for legend
                data: data.yValidationLoss,         // Reference to array of y-values
                fill: false,                // Fill area under the linechart (true = yes, false = no)
                backgroundColor: 'rgba(2, 132, 255, 0.2)',  // Color for data marker
                borderColor:     'rgba(2, 132, 255, 1)',    // Color for data marker border
                borderWidth:     1, // Data marker border width
                yAxisID: 'y',
            },
            {
                label: 'Accuracy',         // Dataset label for legend
                data: data.yAccuracy,         // Reference to array of y-values
                fill: false,                // Fill area under the linechart (true = yes, false = no)
                backgroundColor: 'rgba(0, 0, 0, 0.2)',  // Color for data marker
                borderColor:     'rgba(0, 0, 0, 1)',    // Color for data marker border
                borderWidth:     1, // Data marker border width
                yAxisID: 'y1', // Changing axis to right axis for this dataset
            },
        ]
    },
        options: {                      // Define display chart display options
            responsive: true,           // Re-size based on screen size
            maintainAspectRatio: false,
            scales: {                   // Display options for x & y axes
                x: {                    // x-axis properties
                    title: {
                        display: true,
                        text: 'Epoch',   // x-axis title
                        font: {                 // font properties
                            size: 14
                        }
                    },
                    ticks: {                    // x-axis tick mark properties
                        min: 0,                 // starting value
                        font: {
                             size: 14
                        },
                        grid: {                 // x-axis grid properties
                            color: '#6c767e'
                        }
                    }
                },
                y: {                            // y-axis properties
                    title: {
                        display: true,
                        text: 'Loss',   // y-axis title
                        font: {
                            size: 14
                        }
                    },
                    ticks: {
                        count: 10,
                        font: {
                            size: 12
                        }
                    },
                    grid: {                     // y-axis gridlines
                        color: '#6c767e'
                    }
                },
                y1: {                            // right y-axis properties
                    type: 'linear',
                    display: true,
                    position: 'right',
                    min: 0,
                    max: 1,
                    title: {
                        display: true,
                        text: 'Accuracy',   // y-axis title
                        font: {
                            size: 14
                        }
                    },
                    ticks: {
                        count: (context) => {   // Setting number of ticks on right equal to that on left using techniques from this video: https://www.youtube.com/watch?v=xn_U-_UHnF8
                            console.log(context.chart.config);
                            return context.chart.config.options.scales.y.ticks.count;
                        },
                        font: {
                            size: 12
                        },
                    },
                    grid: {                     // y-axis gridlines
                        color: '#6c767e',
                        drawOnChartArea: false // only draw the grid lines for one side
                    }
                }
            },
            plugins: {  // Display options for title and legend
                title: {
                    display: true,
                    text: "Training and Validation Losses & Accuracy from Epochs 1-49",
                    font: {
                        size: 24,
                        family: "system-ui",
                        color: '#000000',
                        padding: {
                            top: 10,
                            bottom: 30,
                        }
                    }
                },
                legend: {
                    align: 'start',
                    position: 'bottom',
                }
            }
        },
    })
};

createChart();
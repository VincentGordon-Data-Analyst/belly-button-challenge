const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// Promise Pending
const dataPromise = d3.json(url);
console.log("Data Promise: ", dataPromise);


// Fetch the JSON data and console.log it
d3.json(url).then(function(data) {
    // Following steps are used to better understand that data
    // Displays the whole data set 
    console.log("Shows the whole dataset:", data)

    // Displays the first individual's name (i.e. 940)
    console.log("Shows first id:" , data.names[0])

    // Displays the information for individual with id 940
    console.log("Shows 940's personal information", data.metadata[0])
    
    // All for id 940
    console.log("940's OTU ids", data.samples[0].otu_ids)
    console.log("940's OTU labels", data.samples[0].otu_labels)
    console.log("940's OTU sample_values", data.samples[0].sample_values)

});

function init() {
    // Choose drop down menu
    let dropdownMenu = d3.select("#selDataset")

    d3.json(url).then(function(data){
        // Add all names to drop down menu
        for (let i = 0; i < data.names.length; i++) {
        name = data.names[i]
        dropdownMenu.append("option")
        .property("value", name)
        .text(name)
        }
        
        // Show the first metadata using id sample-metadata
        let demoInfo = d3.select("#sample-metadata").html("");
        let metadata = data.metadata;
        
        // Add first metadata to demographic info section using key/value pairs
        Object.entries(metadata[0]).forEach(function([key, value]){
            demoInfo.append("p")
            .text(`${key}: ${value}`)
        });
    });

    d3.json(url).then(function (data) {
        // build the initial bar chart for 940
        let samples = data.samples
        let currentSample = samples[0];

        let sample_values = currentSample.sample_values;
        let otu_ids = currentSample.otu_ids;
        let otu_labels = currentSample.otu_labels;

        let trace1 = {
            x: sample_values.slice(0, 10).reverse(),
            y: otu_ids.slice(0,10).map(id => `OTU ${id}`).reverse(),
            labels: otu_labels.slice(0, 10).reverse(),
            type: "bar", 
            orientation: "h"
        };

        let tracedBar = [trace1];        
        Plotly.newPlot("bar", tracedBar);

    }); 
    
    d3.json(url).then(function (data) {
        let metadata = data.metadata;

         // Build the initial gauge chart for 940
         let trace2 = {
            domain: {x: [0, 1], y: [0, 1]},
            value: metadata[0].wfreq,
            title: {text: "Belly Button Washing Frequency: Scrubs per Week"},
            type: "indicator",
            mode: "gauge+number",
            gauge: {
                axis: {range: [0, 10], tickmode: "linear", dticks: 10, dtick: 1, },
                steps: [
                    {range: [0, 1], color: "rgb(179, 255, 102)"},
                    {range: [1, 2], color: "rgb(156, 255, 77)"},
                    {range: [2, 3], color: "rgb(143, 255, 51)"},
                    {range: [3, 4], color: "rgb(130, 255, 26)"},
                    {range: [4, 5], color: "rgb(118, 255, 0)"},
                    {range: [5, 6], color: "rgb(105, 230, 0)"},
                    {range: [6, 7], color: "rgb(99, 204, 0)"},
                    {range: [7, 8], color: "rgb(79, 179, 0)"},
                    {range: [8, 9], color: "rgb(67, 153, 0)"},
                    {range: [9, 10], color: "rgb(53, 123, 0)"}
                ],
            },
            
        }
        let tracedGauge = [trace2];

        let layout = {width: 600, height: 500, margin: {t: 0, b: 0}};
        Plotly.newPlot("gauge", tracedGauge, layout);
    });

    // build bubble chart
    d3.json(url).then(function (data) {
        let currentSample = data.samples[0];
        
        let otu_ids = currentSample.otu_ids;
        let sample_values = currentSample.sample_values;
        let otu_labels = currentSample.otu_labels;

        var trace3 = {
            x: otu_ids,
            y: sample_values,
            mode: 'markers',
            text: otu_labels,
            marker: {
              color: otu_ids,
              size: sample_values
            }
          };
          
          var tracedBubble = [trace3];
          
          var layout = {
            title: 'Marker Size',
            showlegend: false,
            height: 600,
            width: 1200
          };
          
          Plotly.newPlot('bubble', tracedBubble, layout);
    });

    
}
init();

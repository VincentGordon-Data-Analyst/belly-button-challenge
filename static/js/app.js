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

        // Filter for sample
        sampleData = samples.filter(item => item.id == 940)

        // First sample 
        let firstSample = sampleData[0]
        
        let x = firstSample.sample_values;
        let y = firstSample.otu_ids;
        let labels = firstSample.otu_labels;

        
        // let sortedBySampleValues = values.sort((a, b) => b.sample_values - a.sample_values);
        // slicedData = sortedBySampleValues.slice(0, 10);

        // reversedData = slicedData.reverse();

        let trace1 = {
            x: x.slice(0, 10).reverse(),
            y: y.slice(0,10).reverse(),
            labels: labels,
            type: "bar", 
            orientation: "h"
        };

        let tracedData = [trace1];

        

        Plotly.newPlot("bar", tracedData);
    })
   
   

    
}
init();

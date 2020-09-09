function init() {

  var url = "/jobs";

  d3.json(url).then(function(res) {

    var year = res.map(d => d.Year);
    var job_counts = res.map(d => d.total_employments);
    var st = res.map(d => d.STATE);

    console.log(st);

    var trace = [{
      'x': year,
      'y': job_counts,
      'type': 'scatter',
      'line': {
        shape:'hv',
        width: 3
      },
      'marker': {
        color: '#9E2A2B'
      }
    }];

    var layout = {
      title: "Total Employments (Number of Job Openings)",
      xaxis: {
        title: "Year"
      },
      yaxis: {
        title: "Number of Job Openings"
      }
    };

    var config = {responsive: true}

    Plotly.newPlot("plot_jobs", trace, layout, config);
  });
}
init();


// On change function when select the dropdown filter
d3.select('#st_selector').on('change', updateState);

function updateState() {

  selectedState = d3.select('#st_selector').node().value

  console.log(`selected state is ${selectedState}`);

  var url = "/jobs";
  d3.json(url).then(function(res) {

    // Use filter() to filter yearly data
    var filtered_data = res.filter(d => d.STATE == selectedState);

    var year = filtered_data.map(d => d.Year);
    var job_counts = filtered_data.map(d => d.total_employments);

    // var counts_sorted = counts.sort(function(a,b){return b-a});
    // var counts_top10 = counts_sorted.slice(0,10);

    // console.log(`TOP 10 FOR ${selectedState} ARE ${counts_top10}`);
    // console.log(industry.slice(0,10));
    // console.log(counts_top10);

    var trace = [{
      'x': year,
      'y': job_counts,
      type: 'scatter',
      line: {
        shape:'hv',
        width:3
      },
      marker:{
        color: '#9E2A2B'
      },
      text: year.map(String),
      textposition: 'auto'

    }];

    var layout = {
      title: "Total Employments (Number of Job Openings)",
      xaxis: {
        title: "Year"
      },
      yaxis: {
        title: "Number of Job Openings",
        showticklabels: false
      }
    };

    var config = {responsive: true}

    Plotly.react("plot_jobs", trace, layout, config);
  });
}

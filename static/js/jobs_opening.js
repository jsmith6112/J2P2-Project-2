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
      'type': 'bar',
      'marker': {
        color: '#124E78'
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
      type: 'bar',
      // orientation: 'h',
      marker:{
        color: ['#FC9F5B',
                '#FBD1A2',
                '#ECE4B7',
                '#7DCFB6',
                '#33CA7F',
                '#2DC7FF',
                '#00ABE7',
                '#0081AF',
                '#F17300',
                '#054A91']
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

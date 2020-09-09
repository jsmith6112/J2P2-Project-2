function init() {

  var url = "/pop";

  d3.json(url).then(function(res) {

    var year = res.map(d => d.Year);
    var pop = res.map(d => d.Populations);
    var st = res.map(d => d.STATE);

    console.log(st);

    var trace = [{
      'x': year,
      'y': pop,
      'type': 'line',
      'marker': {
        color: '#E09F3E'
      }
    }];

    var layout = {
      title: "State Populations",
      xaxis: {
        title: "Year"
      },
      yaxis: {
        title: "Populations (millions)"
      }
    };

    var config = {responsive: true}

    Plotly.newPlot("plot_pop", trace, layout, config);
  });
}
init();

//======================================================================
//---------- On change function when select the dropdown filter---------
d3.select('#st_selector').on('change', updateState);

function updateState() {

  selectedState = d3.select('#st_selector').node().value

  console.log(`selected state is ${selectedState}`);

  var url = "/pop";
  d3.json(url).then(function(res) {

    // Use filter() to filter yearly data
    var filtered_data = res.filter(d => d.STATE == selectedState);

    var year = filtered_data.map(d => d.Year);
    var pop = filtered_data.map(d => d.Populations);

    // var counts_sorted = counts.sort(function(a,b){return b-a});
    // var counts_top10 = counts_sorted.slice(0,10);

    // console.log(`TOP 10 FOR ${selectedState} ARE ${counts_top10}`);
    // console.log(industry.slice(0,10));
    // console.log(counts_top10);

    var trace = [{
      'x': year,
      'y': pop,
      type: 'line',
      // orientation: 'h',
      marker:{
              color: '#E09F3E'
              },
      text: year.map(String),
      textposition: 'auto'

    }];

    var layout = {
      title: "Populations",
      xaxis: {
        title: "Year"
      },
      yaxis: {
        title: "Populations",
        showticklabels: false
      }
    };

    var config = {responsive: true}

    Plotly.react("plot_pop", trace, layout, config);
  });
}

function init() {

  var url = "/gdp";

  d3.json(url).then(function(res) {

    var year = res.map(d => d.Year);
    var st_gdp = res.map(d => d.GDP_millions);
    var st = res.map(d => d.STATE);

    var trace = [{
      'x': year,
      'y': st_gdp,
      'type': 'bar',
      'marker': {
        color: ['#2A4C55', '#4D6F71', '#66827A',
                '#99A88C', '#F0C977', '#E09F3E',
                '#BF6535', '#9E2A2B', '#791B1D'
              ]
      }
    }];

    var layout = {
      title: "State Gross Domestic Products (GDP)",
      xaxis: {
        title: "Year"
      },
      yaxis: {
        title: "GDP (millions)"
      }
    };

    var config = {responsive: true}

    Plotly.newPlot("plot_gdp", trace, layout, config);
  });
}
init();


// On change function when select the dropdown filter
d3.select('#st_selector').on('change', updateState);

function updateState() {

  selectedState = d3.select('#st_selector').node().value

  console.log(`selected state is ${selectedState}`);

  var url = "/gdp";
  d3.json(url).then(function(res) {

    // Use filter() to filter yearly data
    var filtered_data = res.filter(d => d.STATE == selectedState);

    var year = filtered_data.map(d => d.Year);
    var st_gdp = filtered_data.map(d => d.GDP_millions);

    // var counts_sorted = counts.sort(function(a,b){return b-a});
    // var counts_top10 = counts_sorted.slice(0,10);

    // console.log(`TOP 10 FOR ${selectedState} ARE ${counts_top10}`);
    // console.log(industry.slice(0,10));
    // console.log(counts_top10);

    var trace = [{
      'x': year,
      'y': st_gdp,
      type: 'bar',
      // orientation: 'h',
      'marker': {
        color: ['#2A4C55', '#4D6F71', '#66827A',
                '#99A88C', '#F0C977', '#E09F3E',
                '#BF6535', '#9E2A2B', '#791B1D'
              ]
      },
      text: year.map(String),
      textposition: 'auto'

    }];

    var layout = {
      title: "Gross Domestic Products (GDP) Overtime",
      xaxis: {
        title: "Year"
      },
      yaxis: {
        title: "GDP (millions)",
        showticklabels: false
      }
    };

    var config = {responsive: true}

    Plotly.react("plot_gdp", trace, layout, config);
  });
}

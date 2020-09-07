function init() {

  var url = "/inc_exp";

  d3.json(url).then(function(res) {

    var year = res.map(d => d.Year);
    var inc = res.map(d => d.inc_per_cap);
    var exp = res.map(d => d.exp_per_cap);
    var st = res.map(d => d.STATE)

    console.log(st);
    console.log(inc);
    console.log(exp);

    var trace1 = {
      'x': year,
      'y': inc,
      'type': 'bar',
      'name': 'Income Per Capita',
      'marker': {
        color: '#FF8811'
      }
    };

    var trace2 = {
      'x': year,
      'y': exp,
      'type': 'bar',
      'name': 'Personal Consumtion Expenditures Per Capita',
      'marker': {
        color: '#81ADC8'
      }
    };

    var data = [trace1, trace2];

    var layout = {
      title: "Per Capita Income and Expenses",
      xaxis: {
        title: "Year"
      },
      yaxis: {
        title: "Income and Expenses"
      },
      showlegend: true
    };

    var config = {responsive: true}

    Plotly.newPlot("plot_inc_exp", data, layout, config);
  });
}
init();


// On change function when select the dropdown filter
d3.select('#st_selector').on('change', updateState);

function updateState() {

  selectedState = d3.select('#st_selector').node().value

  console.log(`selected state is ${selectedState}`);

  var url = "/inc_exp";
  d3.json(url).then(function(res) {

    // Use filter() to filter yearly data
    var filtered_data = res.filter(d => d.STATE == selectedState);

    var year = filtered_data.map(d => d.Year);
    var inc = filtered_data.map(d => d.inc_per_cap);
    var exp = filtered_data.map(d => d.exp_per_cap)

    // var counts_sorted = counts.sort(function(a,b){return b-a});
    // var counts_top10 = counts_sorted.slice(0,10);

    // console.log(`TOP 10 FOR ${selectedState} ARE ${counts_top10}`);
    // console.log(industry.slice(0,10));
    // console.log(counts_top10);

    var trace1 = {
      'x': year,
      'y': inc,
      type: 'bar',
      // orientation: 'h',
      marker:{
        color: '#FF8811'
      },
      text: year.map(String),
      textposition: 'auto'

    };

    var trace2 = {
      'x': year,
      'y': exp,
      type: 'bar',
      // orientation: 'h',
      marker:{
        color: '#81ADC8'
      },
      showlegend: true,
      text: year.map(String),
      textposition: 'auto'

    };

    var data = [trace1,trace2]

    var layout = {
      title: "Per Capita Income and Expenses",
      xaxis: {
        title: "Year"
      },
      yaxis: {
        title: "Income and Expenses",
        showticklabels: false
      }
    };

    var config = {responsive: true}

    Plotly.react("plot_inc_exp", data, layout, config);
  });
}

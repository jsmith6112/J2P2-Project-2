function init() {

  var url = "/rural_urban";

  d3.json(url).then(function(res) {

    var area = res.map(d => d.Loan_Group = ['Rural', 'Urban']);
    var loanAmount = res.map(d => d.Loan_Amount);
    var year = res.map(d => d.Year);


    var trace = [{
      'x': area,
      'y': loanAmount,
      'type': 'bar',
      'marker': {
        color: [
          '#3E7CB1',
          '#DBE4EE'
        ]
      }
    }];

    var layout = {
      title: "Rural vs Urban Total Loan Amount in 2014-2019",
      xaxis: {
        title: "Area"
      },
      yaxis: {
        title: "Loan Amount"
      }
    };

    var config = {
      responsive: true
    }

    Plotly.newPlot("plot_rural_urban", trace, layout, config);
  });
}
init();

// On change function when select the dropdown filter
d3.select('#yr_selector').on('change', updateYear());

function updateYear() {

  selectedYear = d3.select('#yr_selector').node().value

  console.log(`selected year is ${selectedYear}`);

  var url = "/rural_urban";
  d3.json(url).then(function(res) {

    // Use filter() to filter yearly data
    var filtered_data = res.filter(d => d.Year == selectedYear);

    var area = filtered_data.map(d => d.Loan_Group = ['Rural', 'Urban']);
    var loanAmount = filtered_data.map(d => d.Loan_Amount);

    // var emp_sorted = emp.sort(function(a,b){return b-a});
    // var emp_top10 = emp_sorted.slice(0,10);
    //
    // console.log(`TOP 10 FOR ${selectedYear} ARE ${emp_top10}`);
    // console.log(industry.slice(0,10));
    // console.log(emp_top10);

    var trace = [{
      'x': area,
      'y': loanAmount,
      'type': 'bar',
      'marker': {
        color: [
          '#3E7CB1',
          '#DBE4EE'
        ]
      }
    }];

    var layout = {
      title: "Rural vs Urban Total Loan Amount in 2014-2019",
      xaxis: {
        title: "Area"
      },
      yaxis: {
        title: "Loan Amount"
      }
    };

    var config = {
      responsive: true
    }

    Plotly.react("plot_rural_urban", trace, layout, config);
  });
}

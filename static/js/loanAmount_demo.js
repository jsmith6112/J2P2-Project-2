function init() {

  var url = "/loan_all_demographic";

  d3.json(url).then(function(res) {

    var group = res.map(d => d.Loan_Group = ['BLACK', 'WHITE', 'HISPANIC', 'ASIAN OR PACIFI', 'AMERICAN INDIAN']);
    var loanAmount = res.map(d => d.Loan_Amount);
    var year = res.map(d => d.Year);


    var trace = [{
      'x': group,
      'y': loanAmount,
      'type': 'bar',
      'marker': {
        color: [
          '#054A91',
          '#3E7CB1',
          '#81A4CD',
          '#DBE4EE',
          '#FF9B71'
        ]
      }
    }];

    var layout = {
      title: "Demographic Groups vs Total Loan Amount (Billions) in 2014 - 2019",
      xaxis: {
        title: "Group"
      },
      showticklabels: true,
      yaxis: {
        title: "Loan Amount"
      }
    };

    var config = {
      responsive: true
    }

    Plotly.newPlot("plot_loan_all_demo", trace, layout, config);
  });
}
init();


// On change function when select the dropdown filter
d3.select('#yr_selector').on('change', updateYear());

function updateYear() {

  selectedYear = d3.select('#yr_selector').node().value;

  console.log(`selected year is ${selectedYear}`);

  var url = "/loan_all_demographic";
  d3.json(url).then(function(res) {

    // Use filter() to filter yearly data
    var filtered_data = res.filter(d => d.Year == selectedYear);

    var group = filtered_data.map(d => d.Loan_Group = ['BLACK', 'WHITE', 'HISPANIC', 'ASIAN OR PACIFI', 'AMERICAN INDIAN']);
    var loanAmount = filtered_data.map(d => d.Loan_Amount);

    // var emp_sorted = emp.sort(function(a,b){return b-a});
    // var emp_top10 = emp_sorted.slice(0,10);
    //
    // console.log(`TOP 10 FOR ${selectedYear} ARE ${emp_top10}`);
    // console.log(industry.slice(0,10));
    // console.log(emp_top10);

    var trace = [{
      'x': group,
      'y': loanAmount,
      'type': 'bar',
      'marker': {
        color: [
          '#054A91',
          '#3E7CB1',
          '#81A4CD',
          '#DBE4EE',
          '#FF9B71'
        ]
      }
    }];

    var layout = {
      title: "Demographic Groups vs Total Loan Amount (Billions) in 2014 - 2019",
      xaxis: {
        title: "Group"
      },
      showticklabels: true,
      yaxis: {
        title: "Loan Amount"
      }
    };

    var config = {
      responsive: true
    }

    Plotly.react("plot_loan_all_demo", trace, layout, config);
  });
}

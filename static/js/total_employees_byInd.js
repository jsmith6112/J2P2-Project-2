function init() {

  var url = "/employees_by_industry";

  d3.json(url).then(function(res) {

    var year = res.map(d => d.Year);
    var industry = res.map(d => d.Industries);
    var emp = res.map(d => d.total_employees);

    var emp_sorted = emp.sort(function(a,b){return b-a});
    var emp_top10 = emp_sorted.slice(0,10);

    console.log(year.slice(0,10));
    console.log(industry.slice(0,10));
    console.log(emp_top10);

    var trace = [{
      'y': industry,
      'x': emp_top10,
      'type': 'bar',
      'orientation': 'h',
      'marker': {
        color: [
                '#054A91',
                '#3E7CB1',
                '#81A4CD',
                '#DBE4EE',
                '#FF9B71',
                '#054A91',
                '#3E7CB1',
                '#81A4CD',
                '#DBE4EE',
                '#FF9B71'
              ]
      },
      text: industry.map(String),
      textposition: 'auto'
    }];

    var layout = {
      title: "Number of Employees by Industry",
      xaxis: {
        title: "Number of Employees"
      },
      yaxis: {
        title: "Business Industris",
        showticklabels: false
      }
    };

    var config = {responsive: true}

    Plotly.newPlot("plot_total_employees", trace, layout, config);
  });
}
init();


// On change function when select the dropdown filter
d3.select('#yr_selector').on('change', updateState);

function updateState() {

  selectedYear = d3.select('#yr_selector').node().value

  console.log(`selected year is ${selectedYear}`);

  var url = "/employees_by_industry";
  d3.json(url).then(function(res) {

    // Use filter() to filter yearly data
    var filtered_data = res.filter(d => d.Year == selectedYear);

    var industry = filtered_data.map(d => d.Industries);
    var emp = filtered_data.map(d => d.total_employees);

    var emp_sorted = emp.sort(function(a,b){return b-a});
    var emp_top10 = emp_sorted.slice(0,10);

    console.log(`TOP 10 FOR ${selectedYear} ARE ${emp_top10}`);
    console.log(industry.slice(0,10));
    console.log(emp_top10);

    var trace = [{
      'y': industry,
      'x': emp_top10,
      type: 'bar',
      orientation: 'h',
      marker:{
        color: ['#738396',
                '#4ECDC4',
                '#BB7E8C',
                '#FF6B6B',
                '#FFE66D',
                '#738396',
                '#4ECDC4',
                '#BB7E8C',
                '#FF6B6B',
                '#FFE66D']
      },
      text: industry.map(String),
      textposition: 'auto'

    }];

    var layout = {
      title: "Number of Employees by Industry",
      xaxis: {
        title: "Number of Employees"
      },
      yaxis: {
        title: "Business Industris",
        showticklabels: false
      }
    };

    var config = {responsive: true}

    Plotly.react("plot_total_employees", trace, layout, config);
  });
}

//////GENDER GRAPH ON TRENDS.HTML////////////////

year = ['2014', '2015', '2016', '2017', '2018', '2019'];

femaleOwnedMoreThan50 = ['2,210,337,400.00',
  '2,786,912,200.00',
  '3,022,707,143.00',
  '3,224,653,200.00',
  '3,105,068,600.00',
  '2,953,646,400.00'
];

// femaleOwnedLessThan50 = ['2,894,365,100.00',
//   '3,542,591,300.00',
//   '3,421,359,800.00',
//   '3,553,821,900.00',
//   '3,514,247,000.00',
//   '2,927,114,200.00'
// ];

maleOwned = ['11,878,294,300.00',
  '15,038,658,800.00',
  '14,898,774,200.00',
  '16,070,989,000.00',
  '16,264,964,400.00',
  '14,993,005,700.00'
];

var trace1 = {
  x: year,
  y: maleOwned,
  name: 'Male Owned',
  type: 'bar',
  textposition: 'auto',
  marker: {
    color: '#EDB763',
    opacity: 0.9
  }
};

// var trace2 = {
//   x: year,
//   y: femaleOwnedLessThan50,
//   name: 'Female Owned Less Than 50%',
//   type: 'bar',
//   textposition: 'auto',
//   marker: {
//     color: '#C65A43',
//     opacity: 0.9
//   }
// };

var trace3 = {
  x: year,
  y: femaleOwnedMoreThan50,
  name: 'Female Owned More Than 50%',
  type: 'bar',
  textposition: 'auto',
  marker: {
    color: '#7793B8',
    opacity: 0.9
  }
};

var data = [trace1, trace3];

var layout = {
  barmode: 'group',
  legend: {
    x: 1,
    xanchor: 'right',
    y: 1
  },
  title: "Total Loan Amount by Gender 2014-2019",
  xaxis: {
    title: "Year"
  },
  yaxis: {
    title: "Loan Amount(B)"
  }
};

var config = {
  responsive: true
}

Plotly.newPlot('plot_gender', data, layout, config);
////END OF GENDER GRAPH /////


////// RACE BY LOAN AMOUNT GRAPH//////
var demoColor = [
    '#495577',
    '#7793B8',
    '#CFDFEC',
    '#F2C467',
    '#DC8F55',
    '#C65A43',
    '#AD4642'
  ]
  
  var data = [{
    values: [39084, 744, 27942, 3174, 7218, 67921, 19294],
    labels: ['Total All Minority', 'American Indian',
      'Asian or Pacific', 'Black', 'Hispanic',
      'White', 'Undetermined'
    ],
    domain: {
      column: 1
    },
    name: 'Total Loan Amount (millions)',
    hoverinfo: 'label+percent+$+value',
    hole: .4,
    type: 'pie',
    marker: {
      colors: demoColor
    },
  }];
  
  var layout = {
    title: 'Total Loan Amount by Ethnicity 2014-2019',
    annotations: [{
      font: {
        size: 14
      },
      showarrow: false,
      text: '% Loan Amount',
      x: 0.5,
      y: 0.5
    }],
    // height: 500,
    // width: 500,
    showlegend: true,
    grid: {
      rows: 1.5,
      columns: 1.5
    }
  };
  
  var config = {
    responsive: true
  }
  
  Plotly.newPlot('plot_loan_all_demo', data, layout, config);

  ////// END RACE BY LOAN AMOUNT GRAPH//////


////// RURAL V URBAN BY LOAN AMOUNT GRAPH//////

  year = ['2014', '2015', '2016', '2017', '2018', '2019'];
rural = ['2,843,513,000.00',
         '3,738,900,000.00',
         '3,753,880,700.00',
         '3,816,073,900.00',
         '3,786,498,800.00',
         '3,161,144,000.00'];

urban = ['14,139,483,800.00',
             '17,629,262,300.00',
             '17,589,024,443.00',
             '19,033,390,200.00',
             '19,097,781,200.00',
             '17,712,622,300.00'];

var trace1 = {
  x: year,
  y: urban,
  name: 'Urban',
  type: 'bar',
  textposition: 'auto',
  marker: {
    color: '#AD4642',
    opacity: 0.9
  }
};

var trace2 = {
  x: year,
  y: rural,
  name: 'Rural',
  type: 'bar',
  textposition: 'auto',
  marker: {
    color: '#495577',
    opacity: 0.9
  }
};


var data = [trace1, trace2];

var layout = {
      barmode: 'group',
      legend: {
        x: 1,
        xanchor: 'right',
        y: 1
      },
      title: "Total Loan Amount by Rural and Urban Area 2014-2019",
      xaxis: {
        title: "Year"
      },
      yaxis: {
        title: "Loan Amount (billions)"
      }
    };

var config = {
  responsive: true
}

Plotly.newPlot('plot_rural_urban', data, layout, config);
////// END RURAL V URBAN BY LOAN AMOUNT GRAPH//////

  
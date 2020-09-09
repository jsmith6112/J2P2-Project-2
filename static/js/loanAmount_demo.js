var demoColor = [
  '#2A4C55',
  '#66827A',
  '#99A88C',
  '#F0C977',
  '#E09F3E',
  '#BF6535',
  '#9E2A2B'
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
  title: 'Demographic Group vs Total Loan Amount (millions) 2014-2019',
  annotations: [{
    font: {
      size: 18
    },
    showarrow: false,
    text: '$ millions',
    x: 0.5,
    y: 0.5
  }],
  height: 500,
  width: 500,
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

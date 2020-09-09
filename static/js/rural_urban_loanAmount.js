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
    color: '#E09F3E',
    opacity: 0.6
  }
};

var trace2 = {
  x: year,
  y: rural,
  name: 'Rural',
  type: 'bar',
  textposition: 'auto',
  marker: {
    color: '#00A6FB',
    opacity: 0.6
  }
};


var data = [trace1, trace2];

var layout = {
      barmode: 'group',
      legend: {
        x: 1,
        xanchor: 'right',
        y: 1
      }
    };

var config = {
  responsive: true
}

Plotly.newPlot('plot_rural_urban', data, layout, config);

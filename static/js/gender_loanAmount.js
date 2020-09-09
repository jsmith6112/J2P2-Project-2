year = ['2014', '2015', '2016', '2017', '2018', '2019'];

femaleOwnedMoreThan50 = ['2,210,337,400.00',
	                       '2,786,912,200.00',
                         '3,022,707,143.00',
                         '3,224,653,200.00',
                         '3,105,068,600.00',
                          '2,953,646,400.00'];

femaleOwnedLessThan50 = ['2,894,365,100.00',
	                       '3,542,591,300.00',
                         '3,421,359,800.00',
                         '3,553,821,900.00',
                         '3,514,247,000.00',
                         '2,927,114,200.00'];

maleOwned = ['11,878,294,300.00',
             '15,038,658,800.00',
             '14,898,774,200.00',
             '16,070,989,000.00',
             '16,264,964,400.00',
             '14,993,005,700.00'];


var trace3 = {
  x: year,
  y: femaleOwnedMoreThan50,
  name: 'Female Owned More Than 50%',
  type: 'bar',
  textposition: 'auto',
  marker: {
    color: '#003554',
    opacity: 0.6
  }
};

var trace2 = {
  x: year,
  y: femaleOwnedLessThan50,
  name: 'Female Owned Less Than 50%',
  type: 'bar',
  textposition: 'auto',
  marker: {
    color: '#BF6535',
    opacity: 0.6
  }
};


var trace1 = {
  x: year,
  y: maleOwned,
  name: 'Male Owned',
  type: 'bar',
  textposition: 'auto',
  marker: {
    color: '#2A4C55',
    opacity: 0.6
  }
};

var data = [trace1, trace2, trace3];

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

Plotly.newPlot('plot_gender', data, layout, config);

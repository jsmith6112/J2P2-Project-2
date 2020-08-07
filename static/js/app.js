
function Businesstypes() {
    /* data route */
  var url = "/api/business_type_state";
  d3.json(url).then(function(response) {
  
    console.log(response);
  
    var bizType = response.map(business => business.BusinessType);
    var approve = response.map(approval => approval.GrossApproval);

    var trace = [{
      'y': bizType,
      'x': approve,
      'type': 'bar',
      text: approve.map(String),
      textposition: 'auto',
      orientation: 'h'
  }];

    var layout = {
      title: "Loans By Business Type",
      xaxis: {
        title: "Business Type"
      },
      yaxis: {
        title: "Gross Aprroval"
      }
    };

    Plotly.newPlot("plot", trace, layout);
  });
}
Businesstypes();

// Function to make Business Type Dynamic
d3.select('#state-selector').on('change', updateBusinessTypes);
function updateBusinessTypes() {
  /* data route */
state = d3.select('#state-selector').node().value;
var url = "/api/business_type_state";
d3.json(url).then(function(response) {
    var stateData = response.filter(d => d.BorrState == state);
    var bizType = stateData.map(business => business.BusinessType);
    var approve = stateData.map(approval => approval.GrossApproval);

  var trace = [{
    'y': bizType,
    'x': approve,
    'type': 'bar',
    text: approve.map(String),
    textposition: 'auto',
    orientation: 'h'
}];

  Plotly.react("plot", trace);
});
}

//CODE FOR FRANCHISE CHART//
function Franchise() {
    /* data route */
  var url = "/api/top_franchise";
  d3.json(url).then(function(response) {
  
    console.log(response);
  
    var franchiseName = response.map(franchise => franchise.FranchiseName);
    var grossApprove = response.map(approval => approval.GrossApproval);
    var year = response.map (year => year.ApprovalFiscalYear);
    
    var ctx = document.getElementById('myChart');
    var myChart = new Chart(ctx, {
        type: 'horizontalBar',
        data: {
            labels: franchiseName,
            datasets: [{
                label: 'TOP FRANCHISES',
                data: grossApprove,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                    
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    })
  });}
  Franchise();

  
//CODE FOR TABLE: FILTERS FOR STATE 
function buildTable() {
    /* data route */
    var url = "/api/top_banks";
    d3.json(url).then(function(response) {
        state = d3.select('#state-selector-banks').node().value;
        var stateData = response.filter(d => d.BankState == state);

        var bankName = stateData.map(d => d.BankName);
        var bankCity = stateData.map(d => d.BankCity);
        var bankState = stateData.map(d => d.BankState);
        var avgApproval = stateData.map(d => d.AverageApproval);
      
        console.log(bankName);
        //var table = d3.select("#bank-table");
        //var tbody = table.select("tbody");
        var tbody = d3.select("#bank-tbody");
        console.log(tbody);
        var trow;
        tbody.html("")
      for (var i = 0; i < bankName.length; i++) {
        trow = tbody.append("tr");
        trow.append("td").text(bankName[i]);
        trow.append("td").text(bankCity[i]);
        trow.append("td").text(bankState[i]);
        trow.append("td").text(avgApproval[i]);
        }
    });
    }
    d3.select('#state-selector-banks').on('change', buildTable);
    // buildTable();
    

 
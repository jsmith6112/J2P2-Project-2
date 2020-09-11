function Businesstypes() {
    /* data route */
  var url = "/api/business_type_state";
  d3.json(url).then(function(response) {
  
    var bizType = response.map(business => business.BusinessType);
    var approve = response.map(approval => approval.GrossApproval);

    var trace = [{
      'y': bizType,
      'x': approve,
      'type': 'bar',
      text: approve.map(String),
      textposition: 'auto',
      orientation: 'h',
      marker:{
        color:'rgb(72, 92, 127)',
        opacity: 0.8
  }}];


    var layout = {
      title: "Loans By Business Type",
      xaxis: {
        title: "Gross Approval ($)"
      }
    };
    var config = {responsive: true, displayModeBar: false, displaylogo: false}

    Plotly.newPlot("plot", trace, layout,config);
  });
}

Businesstypes();

// window.onresize = function() {
//   Plotly.relayout('plot', {
//       'xaxis.autorange': true,
//       'yaxis.autorange': true
//   });
// };

// Function to make Business Type Dynamic
// d3.select('#state-selector').on('change', updateBusinessTypes);
// function updateBusinessTypes() {
  /* data route */
//   bizstate = d3.select('#state-selector').node().value;
//   var url = "/api/business_type_state";
//   d3.json(url).then(function(response) {
//       var stateData =response.filter(d => d.BorrState == state);
//       var bizType = stateData.map(business => business.BusinessType);
//       var approve = stateData.map(approval => approval.GrossApproval);

//       var trace = [{
//         'y': bizType,
//         'x': approve,
//         'type': 'bar',
//         // text: approve.map(String),
//         textposition: 'auto',
//         orientation: 'h'
//         }];
  
//       var layout = {
//         title: "Loans By Business Type",
//         xaxis: {
//           title: "Business Type"
//         }
//       };

//       var config = {responsive: true, displayModeBar: false, displaylogo:false}

//   Plotly.react("plot", trace,layout,config);
// });
// }


//CODE FOR FRANCHISE CHART//
function Franchise() {
    /* data route */
  var url = "/api/top_franchise";
  d3.json(url).then(function(response) {
  
    var franchiseName = response.map(franchise => franchise.FranchiseName);
    var grossApprove = response.map(approval => approval.GrossApproval);
    var year = response.map (year => year.ApprovalFiscalYear);
    
    var ctx = document.getElementById('myChart');
    var myChart = new Chart(ctx,{
        type: 'horizontalBar',
        data: {
            labels: franchiseName,
            datasets: [{
                // label: 'TOP FRANCHISES',
                data: grossApprove,
                backgroundColor: [
                    'rgba(222, 110, 75, 0.5)',
                    'rgba(199, 107, 83, 0.5)',
                    'rgba(176, 104, 90, 0.5)',
                    'rgba(153, 101, 97, 0.5)',
                    'rgba(143, 100, 104, 0.5)',
                    'rgba(130, 98, 105, 0.5)',
                    'rgba(107, 95, 112, 0.5)',
                    'rgba(84, 92, 120, 0.5)',
                    'rgba(133, 148, 164, 0.5)',
                    'rgba(61, 90, 128, 0.5)'

                    
                ],
                borderColor: [
                  'rgba(222, 110, 75, 1)',
                  'rgba(199, 107, 83, 1)',
                  'rgba(176, 104, 90, 1)',
                  'rgba(153, 101, 97, 1)',
                  'rgba(143, 100, 104, 1)',
                  'rgba(130, 98, 105, 1)',
                  'rgba(107, 95, 112, 1)',
                  'rgba(84, 92, 120, 1)',
                  'rgba(133, 148, 164, 1)',
                  'rgba(61, 90, 128, 1)'
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
    });
  });}
Franchise();


  //FUNCTION FOR SBA BY YEAR GRAPH ON INDEX.HTML
function sbaloans_by_year() {
  var url = "/api/sba_by_year";
  d3.json(url).then(function(response) {
    var year = response.map(d => d.ApprovalFiscalYear);
    var loans = response.map(d => d.GrossApproval);

    var data = [{
      type: 'bar',
      x : loans,
      y : year,
      orientation: 'h',
      marker:{
        color:'rgb(72, 92, 127)',
        opacity: 0.7
    }}];
    var layout = {
      autosize: false,
      width: 100,
      height: 100,
      xaxis:{
        title:"Loan Dollars ($Billions)"
        },
      yaxis:{
        title: "Fiscal Year"
      }
    };
  Plotly.newPlot('sbayear',data, layout);
});
}

sbaloans_by_year();


// UPDATE POPULATION ON FILTER 

// function updatePopulation() {
// 	/* data route */
// 	var url = "/api/population";
// 	d3.json(url).then(function(response) {
//     state = d3.select('#state-selector-2').node().value;
//     console.log(state)
//     var popData = response.filter(d => d.STATE == state);
//     console.log("The value of popData is " + popData);
//     var statePop = popData.map(d => d.Populations);
//     console.log("The value of stateData is " + statePop);
//      d3.select('#state-population').text(String(statePop));
// 	});
// }
// d3.select('#state-selector-2').on('change', updatePopulation);


function updatePopulation() {
	/* DATA ROUTE */
  var popUrl = "/api/population";
  var womenUrl = "/api/women_owned";
  var vetUrl = "/api/vet_owned";
  var minorityUrl = "/api/minority_owned";
  var avgLoanUrl = "/api/avg_loan_amount";
  var avgIntUrl = "/api/avg_int_rate";
  var banksurl = "/api/top_banks";
  var bizTypeUrl = "/api/business_type_state";

  /* UPDATES POPULATION TEXT NUMBER ON DASHBOARD */
	d3.json(popUrl).then(function(popresponse) {
    state = d3.select('#state-selector').node().value;
    var popData = popresponse.filter(d => d.STATE == state);
    var statePop = popData.map(d => d.Populations);
    d3.select('#state-population').text(String(statePop));
  });
  
  /* UPDATES NUMBER OF WOMEN OWNED BISINESSES TEXT NUMBER ON DASHBOARD */
  d3.json(womenUrl).then(function(womenresponse) {
    // state = d3.select('#state-selector-2').node().value;
    var womenData = womenresponse.filter(d => d.STATE == state);
    var womenBiz = womenData.map(d => d.NumberofWomenOwnedBiz);
    d3.select('#women-biz').text(String(womenBiz));
  });
  /* UPDATES NUMBER OF VET OWNED BISINESSES TEXT NUMBER ON DASHBOARD */
  d3.json(vetUrl).then(function(vetresponse) {
    // state = d3.select('#state-selector-2').node().value;
    var vetData = vetresponse.filter(d => d.STATE == state);
    var vetBiz = vetData.map(d => d.NumberOfVetOwnedBiz);
    d3.select('#vet-biz').text(String(vetBiz));
  });
  /* UPDATES NUMBER OF MINORITY OWNED BISINESSES TEXT NUMBER ON DASHBOARD */
  d3.json(minorityUrl).then(function(minorityresponse) {
    // state = d3.select('#state-selector-2').node().value;
    var minorityData = minorityresponse.filter(d => d.STATE == state);
    var minorityBiz = minorityData.map(d => d.NumOfMinorityOwnedBiz);
    d3.select('#minority-biz').text(String(minorityBiz));
  });
  
  /* UPDATES NUMBER OF AVG LOAN TEXT NUMBER ON DASHBOARD */
  d3.json(avgLoanUrl).then(function(avgLoanresponse) {
    // state = d3.select('#state-selector-2').node().value;
    var avgLoanData = avgLoanresponse.filter(d => d.BorrState == state);
    var avgLoanBiz = avgLoanData.map(d => d.AvgAmountGiven);
    d3.select('#avg-loan').text(String(avgLoanBiz));
  });
  
  /* UPDATES NUMBER OF AVG INTEREST RATE TEXT NUMBER ON DASHBOARD */
  d3.json(avgIntUrl).then(function(avgIntresponse) {
    // state = d3.select('#state-selector-2').node().value;
    var avgIntData = avgIntresponse.filter(d => d.BorrState == state);
    var avgIntBiz = avgIntData.map(d => d.AvgInterestRate);
    d3.select('#avg-int').text(String(avgIntBiz));
  });
    /*UPDATES TABLE WITH LIST OF BANKS */

  d3.json(banksurl).then(function(banksresponse) {
      // state = d3.select('#state-selector-banks').node().value;
      var BankstateData = banksresponse.filter(d => d.BankState == state);
      var bankName = BankstateData.map(d => d.BankName);
      var bankCity = BankstateData.map(d => d.BankCity);
      var bankState = BankstateData.map(d => d.BankState);
      var avgApproval = BankstateData.map(d => d.AverageApproval);
      //var table = d3.select("#bank-table");
      //var tbody = table.select("tbody");
      var tbody = d3.select("#bank-tbody");
      var trow;
      tbody.html("");
    for (var i = 0; i < bankName.length; i++) {
      trow = tbody.append("tr");
      trow.append("td").text(bankName[i]);
      trow.append("td").text(bankCity[i]);
      trow.append("td").text(bankState[i]);
      trow.append("td").text(avgApproval[i]);
      }
  });

    // UPDATES BIZ TYPE PLOTLY
    // bizstate = d3.select('#state-selector').node().value;
  // var bizTypeUrl = "/api/business_type_state";
    d3.json(bizTypeUrl).then(function(BizTypeResponse) {
        var bizTypeData =BizTypeResponse.filter(d => d.BorrState == state);
        var bizType = bizTypeData.map(business => business.BusinessType);
        var approve = bizTypeData.map(approval => approval.GrossApproval);

        var trace = [{
          'y': bizType,
          'x': approve,
          'type': 'bar',
          // text: approve.map(String),
          textposition: 'auto',
          orientation: 'h'
          }];
    
        var layout = {
          title: "Loans By Business Type",
          xaxis: {
            title: "Business Type"
          }
        };

        var config = {responsive: true, displayModeBar: false, displaylogo:false}

    Plotly.react("plot", trace,layout,config);
    });

}
d3.select('#state-selector').on('change', updatePopulation);






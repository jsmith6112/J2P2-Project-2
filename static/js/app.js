function Businesstypes() {
  /* data route */
  var url = "/api/business_type_state";
  d3.json(url).then(function (response) {

    var bizType = response.map(business => business.BusinessType);
    var approve = response.map(approval => approval.GrossApproval);

    var trace = [{
      'y': bizType,
      'x': approve,
      'type': 'bar',
      text: approve.map(String),
      textposition: 'auto',
      orientation: 'h',
      marker: {
        color: 'rgb(72, 92, 127)',
        opacity: 0.8
      }
    }];


    var layout = {
      title: "Loans By Business Type",
      xaxis: {
        title: "Gross Approval ($)"
      }
    };
    var config = { responsive: true, displayModeBar: false, displaylogo: false }

    Plotly.newPlot("plot", trace, layout, config);
  });
}
Businesstypes();

//FUNCTION FOR INITIAL POPULATION GRAPH OVER TIME ON DASHBOARD
function init() {

  var url = "/pop";

  d3.json(url).then(function (res) {

    var year = res.map(d => d.Year);
    var pop = ['4799069', '4815588', '4830081', '4841799', '4852347', '4863525', '4874486', '4887681', '4903185'];
    var st = res.map(d => d.STATE);

    console.log(st);

    var trace = [{
      'x': year,
      'y': pop,
      'type': 'line',
      'marker': {
        color: '#C65A43'
      }
    }];
    
    var layout = {
      title: "State Populations",
      xaxis: {
        title: "Year"
      },
      yaxis: {
        title: "Populations (millions)"
      }
    };

    var config = { responsive: true }

    Plotly.newPlot("plot_pop", trace, layout, config);
  });
}
init();

//FUNCTION FOR INITIAL GDP GRAPH OVER TIME ON DASHBOARD
function gdpinit() {
    var url = "/gdp";
    d3.json(url).then(function(res) {
      var year = res.map(d => d.Year);
      var st_gdp = ['181349.8','186299','191481','194211','200402.7','203829.8','210364.4','221735','230968'];
      var st = res.map(d => d.STATE);

      var trace = [{
        'x': year,
        'y': st_gdp,
        'type': 'line',
        'marker': {
          color: '#DA9A63'
        }
      }];

      var layout = {
        title: "State Gross Domestic Products (GDP)",
        xaxis: {
          title: "Year"
        },
        yaxis: {
          title: "GDP (millions)"
        }
      };

      var config = {responsive: true}

      Plotly.newPlot("plot_gdp", trace, layout, config);
    });
}
gdpinit();


//FUNCTION FOR INITIAL EXPENSES PER CAPITA GRAPH OVER TIME ON DASHBOARD
function pceinit() {

    var url = "/inc_exp";
    d3.json(url).then(function(res) {
  
      var year = res.map(d => d.Year);
      // var inc = res.map(d => d.inc_per_cap);
      var inc = ['34995', '35884', '36110', '37271', '38650', '39234', '40473', '42240'];
      // var exp = res.map(d => d.exp_per_cap);
      var exp = ['28176', '28818', '29273', '30124', '30843', '31497', '32527', '33904'];
      var st = res.map(d => d.STATE)
  
      console.log(exp);
  
      var trace1 = {
        'x': year,
        'y': inc,
        'type': 'line',
        'name': 'Income Per Capita',
        marker: {
          color: '#7793B8'
        }
      };
  
      var trace2 = {
        'x': year,
        'y': exp,
        'type': 'line',
        'name': 'Expenses Per Capita',
        'marker': {
          color: '#C65A43'
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
        showlegend: true,
        legend: {
          x: 1,
          xanchor: 'right',
          y: 1
        }
      };
  
      var config = {responsive: true}
  
      Plotly.newPlot("plot_inc_exp", data, layout, config);
    });
  }
  pceinit();


//FUNCTION FOR INITIAL JOB OPENING GRAPH OVER TIME ON DASHBOARD
function jobsinit() {
  var url = "/jobs";
  d3.json(url).then(function(res) {
    var year = res.map(d => d.Year);
    // var job_counts = res.map(d => d.total_employments);
    var job_counts = ['2497933', '2503678', '2523338', '2551872', '2586885', '2619154', '2653968', '2691517']
    var st = res.map(d => d.STATE);
    console.log(st);
    var trace = [{
      'x': year,
      'y': job_counts,
      'type': 'scatter',
      'line': {
        shape:'hv',
        width: 3
      },
      'marker': {
        color: '#586790'
      }
    }];
    var layout = {
      title: "Total Employments (Number of Job Openings)",
      xaxis: {
        title: "Year"
      },
      yaxis: {
        title: "Number of Job Openings"
      }
    };
    var config = {responsive: true}
    Plotly.newPlot("plot_jobs", trace, layout, config);
  });
}
jobsinit();

//FUNCTION FOR PERCENTAGE LOAN AMOUNT BY APPROVAL AMOUNT TABLE OVER TIME ON DASHBOARD
function buildTablePct() {
  var url = "/pct_guaranteed";
  d3.json(url).then(function(res) {
    state = d3.select('#state_selector-2').node().value;
    var filtered_data = res.filter(d => d.State == state);
    var ind         = filtered_data.map(d => d.industry);
    var loan_amount = filtered_data.map(d => d.loanAmount);
    var gua_amount  = filtered_data.map(d => d.guaranAmount);
    var pct         = filtered_data.map(d => d.guaranPercent);
    var pct_desc  = pct.sort(function(a, b) {return b - a});
    // var pct_top10  = pct_desc.slice(0, 10);
    // var pct_asc   = pct.sort(function(a,b) {return a - b});
    // var pct_btm5  = pct_asc.slice(0, 5);
    var tbody = d3.select("#table_pct_top_guarant");
    console.log(tbody);
    var trow;
    tbody.html("");
    for (var i = 0; i < ind.length; i++) {
      trow = tbody.append("tr");
      trow.append("td").text(ind[i]);
      // trow.append("td").text(loan_amount[i]);
      // trow.append("td").text(gua_amount[i]);
      trow.append("td").text(pct_desc[i]);
    }
  });
}
d3.select('#state_selector-2').on('change', buildTablePct);
buildTablePct();


  /*UPDATES TABLE WITH LIST OF BANKS */
function buildTablePct2() {
  var banksurl = "/api/top_banks";
  d3.json(banksurl).then(function (banksresponse) {
    state = d3.select('#state_selector_b').node().value;
    var BankstateData = banksresponse.filter(d => d.BankState == state);
    var bankName = BankstateData.map(d => d.BankName);
    var bankCity = BankstateData.map(d => d.BankCity);
    var bankState = BankstateData.map(d => d.BankState);
    var avgApproval = BankstateData.map(d => d.AverageApproval);
    var table = d3.select("#bank-table");
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
}
d3.select('#state_selector_b').on('change', buildTablePct2);
buildTablePct2();







  

//CODE FOR FRANCHISE CHART//
function Franchise() {
  /* data route */
  var url = "/api/top_franchise";
  d3.json(url).then(function (response) {

    var franchiseName = response.map(franchise => franchise.FranchiseName);
    var grossApprove = response.map(approval => approval.GrossApproval);
    var year = response.map(year => year.ApprovalFiscalYear);

    var ctx = document.getElementById('myChart');
    var myChart = new Chart(ctx, {
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
  });
}
Franchise();


//FUNCTION FOR SBA BY YEAR GRAPH ON INDEX.HTML
function sbaloans_by_year() {
  var url = "/api/sba_by_year";
  d3.json(url).then(function (response) {
    var year = response.map(d => d.ApprovalFiscalYear);
    var loans = response.map(d => d.GrossApproval);

    var data = [{
      type: 'bar',
      x: loans,
      y: year,
      orientation: 'h',
      marker: {
        color: 'rgb(72, 92, 127)',
        opacity: 0.7
      }
    }];
    var layout = {
      autosize: false,
      width: 100,
      height: 100,
      xaxis: {
        title: "Loan Dollars ($Billions)"
      },
      yaxis: {
        title: "Fiscal Year"
      }
    };
    Plotly.newPlot('sbayear', data, layout);
  });
}
sbaloans_by_year();


function updatePopulation() {
  /* DATA ROUTE */
  var populationUrl = "/pop";
  var popUrl = "/api/population";
  var womenUrl = "/api/women_owned";
  var vetUrl = "/api/vet_owned";
  var minorityUrl = "/api/minority_owned";
  var avgLoanUrl = "/api/avg_loan_amount";
  var avgIntUrl = "/api/avg_int_rate";
  var banksurl = "/api/top_banks";
  var bizTypeUrl = "/api/business_type_state";
  var gdpUrl = "/gdp";
  

  /* UPDATES POPULATION TEXT NUMBER ON DASHBOARD */
  d3.json(popUrl).then(function (popresponse) {
    state = d3.select('#state-selector').node().value;
    var popData = popresponse.filter(d => d.STATE == state);
    var statePop = popData.map(d => d.Populations);
    d3.select('#state-population').text(String(statePop));
  });

  /* UPDATES NUMBER OF WOMEN OWNED BISINESSES TEXT NUMBER ON DASHBOARD */
  d3.json(womenUrl).then(function (womenresponse) {
    // state = d3.select('#state-selector-2').node().value;
    var womenData = womenresponse.filter(d => d.STATE == state);
    var womenBiz = womenData.map(d => d.NumberofWomenOwnedBiz);
    d3.select('#women-biz').text(String(womenBiz));
  });
  /* UPDATES NUMBER OF VET OWNED BISINESSES TEXT NUMBER ON DASHBOARD */
  d3.json(vetUrl).then(function (vetresponse) {
    // state = d3.select('#state-selector-2').node().value;
    var vetData = vetresponse.filter(d => d.STATE == state);
    var vetBiz = vetData.map(d => d.NumberOfVetOwnedBiz);
    d3.select('#vet-biz').text(String(vetBiz));
  });
  /* UPDATES NUMBER OF MINORITY OWNED BISINESSES TEXT NUMBER ON DASHBOARD */
  d3.json(minorityUrl).then(function (minorityresponse) {
    // state = d3.select('#state-selector-2').node().value;
    var minorityData = minorityresponse.filter(d => d.STATE == state);
    var minorityBiz = minorityData.map(d => d.NumOfMinorityOwnedBiz);
    d3.select('#minority-biz').text(String(minorityBiz));
  });

  /* UPDATES NUMBER OF AVG LOAN TEXT NUMBER ON DASHBOARD */
  d3.json(avgLoanUrl).then(function (avgLoanresponse) {
    // state = d3.select('#state-selector-2').node().value;
    var avgLoanData = avgLoanresponse.filter(d => d.BorrState == state);
    var avgLoanBiz = avgLoanData.map(d => d.AvgAmountGiven);
    d3.select('#avg-loan').text(String(avgLoanBiz));
  });

  /* UPDATES NUMBER OF AVG INTEREST RATE TEXT NUMBER ON DASHBOARD */
  d3.json(avgIntUrl).then(function (avgIntresponse) {
    // state = d3.select('#state-selector-2').node().value;
    var avgIntData = avgIntresponse.filter(d => d.BorrState == state);
    var avgIntBiz = avgIntData.map(d => d.AvgInterestRate);
    d3.select('#avg-int').text(String(avgIntBiz));
  });
  // /*UPDATES TABLE WITH LIST OF BANKS */

  // d3.json(banksurl).then(function (banksresponse) {
  //   state = d3.select('state_selector_b').node().value;
  //   var BankstateData = banksresponse.filter(d => d.BankState == state);
  //   var bankName = BankstateData.map(d => d.BankName);
  //   var bankCity = BankstateData.map(d => d.BankCity);
  //   var bankState = BankstateData.map(d => d.BankState);
  //   var avgApproval = BankstateData.map(d => d.AverageApproval);
  //   //var table = d3.select("#bank-table");
  //   //var tbody = table.select("tbody");
  //   var tbody = d3.select("#bank-tbody");
  //   var trow;
  //   tbody.html("");
  //   for (var i = 0; i < bankName.length; i++) {
  //     trow = tbody.append("tr");
  //     trow.append("td").text(bankName[i]);
  //     trow.append("td").text(bankCity[i]);
  //     trow.append("td").text(bankState[i]);
  //     trow.append("td").text(avgApproval[i]);
  //   }
  // });

  // UPDATES BIZ TYPE PLOTLY
  d3.json(bizTypeUrl).then(function (BizTypeResponse) {
    var bizTypeData = BizTypeResponse.filter(d => d.BorrState == state);
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

    var config = { responsive: true, displayModeBar: false, displaylogo: false }

    Plotly.react("plot", trace, layout, config);
  });
// UPDATES POPULATION GRAPH ////////
  d3.json(populationUrl).then(function (res) {
    var filtered_data = res.filter(d => d.STATE == state);
    var year = filtered_data.map(d => d.Year);
    console.log(year)
    var pop = filtered_data.map(d => d.Populations);
    console.log(pop)
    var poptrace = [{
      'x': year,
      'y': pop,
      'type': 'line',
      marker: {
        color: '#C65A43'
      },
      text: String(year.map),
      textposition: 'auto'
    }];

    var poplayout = {
      title: "Populations",
      xaxis: {
        title: "Year"
      },
      yaxis: {
        title: "Populations",
        showticklabels: false
      }
    };
    var popconfig = {responsive: true}
    Plotly.react("plot_pop", poptrace, poplayout, popconfig);
  });

// UPDATES GDP GRAPH ////////

  d3.json(gdpUrl).then(function(gdpres) {
    var gpd_data = gdpres.filter(d => d.STATE == state);
    var year = gpd_data.map(d => d.Year);
    var st_gdp = gpd_data.map(d => d.GDP_millions);

    var trace = [{
      'x': year,
      'y': st_gdp,
      type: 'line',
      'marker': {
        color: '#DA9A63'
      },
      text: year.map(String),
      textposition: 'auto'

    }];

    var layout = {
      title: "Gross Domestic Products (GDP) Overtime",
      xaxis: {
        title: "Year"
      },
      yaxis: {
        title: "GDP (millions)",
        showticklabels: false
      }
    };

    var gdpconfig = {
      responsive: true
    }

    Plotly.react("plot_gdp", trace, layout, gdpconfig);
  });

// UPDATES PCE GRAPH ////////
  d3.json(incExpUrl).then(function(res) {
    var filtered_data = res.filter(d => d.STATE == state);
    var year = filtered_data.map(d => d.Year);
    var inc = filtered_data.map(d => d.inc_per_cap);
    var exp = filtered_data.map(d => d.exp_per_cap)

    var trace1 = {
      'x': year,
      'y': inc,
      'type': 'line',
      'name': 'Income Per Capita',
      'marker': {
        color: '#7793B8'
      }
    };
  
    var trace2 = {
      'x': year,
      'y': exp,
      'type': 'line',
      'name': 'Expenses Per Capita',
      'marker': {
        color: '#C65A43'
      }
    };
  
    var data = [trace1, trace2]
  
    var layout = {
      title: "Per Capita Income and Expenses",
      xaxis: {
        title: "Year"
      },
      yaxis: {
        title: "Income and Expenses",
        showticklabels: false
      },
      showlegend: true,
      legend: {
        x: 1,
        xanchor: 'right',
        y: 1
      }
    };

    var config = {
      responsive: true
    }
  
    Plotly.react("plot_inc_exp", data, layout, config);
  });

// UPDATES JOB OPENING GRAPH ////////
  d3.json(jobsUrl).then(function(res) {

    var filtered_data = res.filter(d => d.STATE == state);
    var year = filtered_data.map(d => d.Year);
    var job_counts = filtered_data.map(d => d.total_employments);

      var trace = [{
        'x': year,
        'y': job_counts,
        type: 'scatter',
        line: {
          shape: 'hv',
          width: 3
        },
        marker: {
          color: '#586790'
        },
        text: year.map(String),
        textposition: 'auto'
      }];

      var layout = {
        title: "Total Employments (Number of Job Openings)",
        xaxis: {
          title: "Year"
        },
        yaxis: {
          title: "Number of Job Openings",
          showticklabels: false
        }
      };

      var config = {
        responsive: true
      }

      Plotly.react("plot_jobs", trace, layout, config);
    });

}

d3.select('#state-selector').on('change', updatePopulation);






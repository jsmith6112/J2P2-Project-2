function supportedJobs() {
    /* data route */
  var url = "/api/jobs_suppported";
  d3.json(url).then(function(response) {
  
    console.log(response);
  
    var bank_name = response.map(bank => bank.BankName)
    var jobs_supported= response.map(jobs => jobs.JobsSupported)

  var trace = [{
    'x': bank_name,
    'y': pet_count,
    'type': 'bar'
  }];

  var layout = {
    title: "Pet Pals",
    xaxis: {
      title: "Pet Type"
    },
    yaxis: {
      title: "Number of Pals"
    }
  };

Plotly.newPlot("plot", trace, layout);
});
}

function sbaloans_by_year() {
  var url = "/api/sba_by_year";
  d3.json(url).then(function(response) {
    
    var year = response.map(d => d.ApprovalFiscalYear);
    var loans = response.map(d => d.GrossApproval);

    console.log(response);
    console.log(year);
    console.log(loans);

var data = [{
  type: 'bar',
  x : loans,
  y : year,
  orientation: 'h'
 
}];

var layout = {
  title: 'US Small Business Admin Loans Totals by Year',
  xaxis:{
   title:"Loan Dollars ($Billions)"
  },
  yaxis:{
   title: "Fiscal Year"
  }
};

Plotly.newPlot('sbayear',data, layout)
})
};
sbaloans_by_year()












  







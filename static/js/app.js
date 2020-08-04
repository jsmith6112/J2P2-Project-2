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
function buildTable() {

  var url = "/pct_guaranteed";

  d3.json(url).then(function(res) {

    selectedState = d3.select('#state_selector').node().value;

    var filtered_data = res.filter(d => d.State == selectedState);

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

d3.select('#state_selector').on('change', buildTable);
buildTable();

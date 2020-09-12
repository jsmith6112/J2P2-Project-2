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
        color: '#586790'
      }
    }];
    var layout = {
      autosize: false,
      xaxis: {
        title: "Loan Dollars ($Billions)"
      },
      yaxis: {
        title: "Fiscal Year"
      }
    };
    var config = {responsive: true, displayModeBar: false, displaylogo: false}
    Plotly.newPlot('sbayear', data, layout, config);
  });
}
sbaloans_by_year();



// An array of =====LOAN AMOUNT=====
var stLoanAmount = [
  {
    name: "California",
    location: [36.116203, -119.681564],
    loanAmount: '$ 30 billions'
  },
  {
    name: "Texas",
    location: [31.054487, -97.563461],
    loanAmount: '$ 19 billions'
  },
  {
    name: "New York",
    location: [42.165726, -74.948051],
    loanAmount: '$ 11 billions'
  },
  {
    name: "Georgia",
    location: [27.766279, -81.686783],
    loanAmount: '$ 9 billions'
  },
  {
    name: "New York",
    location: [33.040619, -83.643074],
    loanAmount: '$ 8.5 billions'
  }
];

// An array of =====GDP========
var topStateGDP = [
  {
    name: "California",
    location: [36.116203, -119.681564],
    gdpAmount: '$ 23,018'
  },
  {
    name: "Texas",
    location: [31.054487, -97.563461],
    gdpAmount: '$ 14,306B'
  },
  {
    name: "New York",
    location: [42.165726, -74.948051],
    gdpAmount: '$ 13,373B'
  },
  {
    name: "Florida",
    location: [27.766279, -81.686783],
    gdpAmount: '$ 8,108B'
  },
  {
    name: "Illinois",
    location: [40.349457, -88.986137],
    gdpAmount: '$ 7,102B'
  }
];

// An array of =====NUMBER OF JOBS OPENING========
var topJobOpening = [
  {
    name: "California",
    location: [36.116203, -119.681564],
    jobOpenNumber: '$ 178 millions'
  },
  {
    name: "Texas",
    location: [31.054487, -97.563461],
    jobOpenNumber: '$ 129 millions'
  },
  {
    name: "New York",
    location: [42.165726, -74.948051],
    jobOpenNumber: '$ 96 millions'
  },
  {
    name: "Florida",
    location: [27.766279, -81.686783],
    jobOpenNumber: '$ 89 millions'
  },
  {
    name: "Illinois",
    location: [33.040619, -83.643074],
    jobOpenNumber: '$ 61 millions'
  }
];


// An array which will be used to store created loanAmountMarker
var loanAmountMarker = [];
for (var i = 0; i < stLoanAmount.length; i++) {
  // loop through the stLoanAmount array, create a new marker, push it to the loanAmountMarker array
  loanAmountMarker.push(
    L.marker(stLoanAmount[i].location).bindPopup("<h6>" + stLoanAmount[i].name + "</h6>" + "<hr>" + "<p>" + stLoanAmount[i].loanAmount + "</p>")
  );
};

// An array which will be used to store created loanAmountMarker
var topGDPMarker = [];
for (var i = 0; i < topStateGDP.length; i++) {
  // loop through the topStateGDP array, create a new marker, push it to the topGDPMarker array
  topGDPMarker.push(
    L.marker(topStateGDP[i].location).bindPopup("<h6>" + topStateGDP[i].name + "</h6>" + "<hr>" + "<p>" + topStateGDP[i].gdpAmount + "</p>")
  );
};

// An array which will be used to store created topStJobOpenMarker
var topStJobOpenMarker = [];
for (var i = 0; i < topJobOpening.length; i++) {
  // loop through the topStateGDP array, create a new marker, push it to the topGDPMarker array
  topStJobOpenMarker.push(
    L.marker(topJobOpening[i].location).bindPopup("<h6>" + topJobOpening[i].name + "</h6>" + "<hr>" + "<p>" + topJobOpening[i].jobOpenNumber + "</p>")
  );
};


// Add all the loanAmountMarker to a new layer group.
// Now we can handle them as one group instead of referencing each individually
var topStLoanAmoutLayer = L.layerGroup(loanAmountMarker);
var topStGDPLayer = L.layerGroup(topGDPMarker);
var topStJobsOpenLayer = L.layerGroup(topStJobOpenMarker);


var lightMap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/light-v10",
  accessToken: "pk.eyJ1IjoicGFyaXlhcGFyaXlhIiwiYSI6ImNrY3Y4OTRrdDAxcncycGxja3lkazZpenYifQ.sVvPfdYqKfOns9I77oQPxQ"
});

var gdpMap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/light-v10",
  accessToken: "pk.eyJ1IjoicGFyaXlhcGFyaXlhIiwiYSI6ImNrY3Y4OTRrdDAxcncycGxja3lkazZpenYifQ.sVvPfdYqKfOns9I77oQPxQ"
});

var jobsMap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/light-v10",
  accessToken: "pk.eyJ1IjoicGFyaXlhcGFyaXlhIiwiYSI6ImNrY3Y4OTRrdDAxcncycGxja3lkazZpenYifQ.sVvPfdYqKfOns9I77oQPxQ"
});


// ***********************************************************************
// ********************** GDP MAP *****************************************
// Grab data with d3
d3.json('/gdp_map').then(function(data) {

  console.log('in gdpmap');
  //console.log(data);

  // Create a new choropleth layer
  geojsonGDP = L.choropleth(data, {

    // Define what  property in the features to use
    valueProperty: "total_GDP",

    // Set color scale
    scale: ["#EDB763", "#B45753"],

    // Number of breaks in step range
    steps: 8,

    // q for quartile, e for equidistant, k for k-means
    mode: "q",
    style: {
      // Border color
      color: "#F0EBD8",
      weight: 1.15,
      fillOpacity: 0.9
    },

    // Binding a pop-up to each layer

    onEachFeature: function(feature, layer) {
      layer.bindPopup("" + feature.properties.name + "<br><hr>" +
        "$ " + feature.properties.total_GDP);
    }


  });

  console.log('GEOJSON')
  console.log(geojsonGDP);
  choroLayer = L.layerGroup(geojsonGDP);



  console.log('choro')
  console.log(choroLayer);

  // ***********************************************************************
  // ******************* state_approvals API call (d3.json) ****************
  d3.json('/api/sba_by_state_approvals').then(function(data) {

  // Grab data with d3
  // d3.json('/api/sba_by_state_approvals', function(data) {

    console.log(data);

    // Create a new choropleth layer
    stateApprovalGeojson = L.choropleth(data, {

      // Define what  property in the features to use
      valueProperty: "gross_approval",

      // Set color scale
      scale: ["#DE6E4B", "#3D5A80"],

      // Number of breaks in step range
      steps: 8,

      // q for quartile, e for equidistant, k for k-means
      mode: "q",
      style: {
        // Border color
        color: "#F0EBD8",
        weight: 1.15,
        fillOpacity: 0.9
      },

      // Binding a pop-up to each layer

      onEachFeature: function(feature, layer) {
        layer.bindPopup("" + feature.properties.name + "<br><hr>" +
          "$ " + feature.properties.gross_approval);
      }


    });


  // ***********************************************************************
  // **************** NUMBER OF JOBS OPENING *************************

    d3.json('/jobs_map').then(function(data) {

      console.log(data);

      // Create a new choropleth layer
      geojsonJOBS = L.choropleth(data, {

        // Define what  property in the features to use
        valueProperty: "total_employments",

        // Set color scale
        scale: ["#EDB763", "#586790"],

        // Number of breaks in step range
        steps: 8,

        // q for quartile, e for equidistant, k for k-means
        mode: "q",
        style: {
          // Border color
          color: "#F0EBD8",
          weight: 1.15,
          fillOpacity: 0.9
        },

        // Binding a pop-up to each layer

        onEachFeature: function(feature, layer) {
          layer.bindPopup("" + feature.properties.name + "<br><hr>" +
            "$ " + feature.properties.total_employments);
        }


      });





    // ********************************************************************************
    // ***************** SETTING UP MAP LAYERS *********************************
    // ************** (needs to be inside the INNERMOST d3.json function) ******
    // ************ this is important!!! ^^^^^
    // ********************************************************************************

      // Only one base layer can be shown at a time
      var baseMaps = {
        'Background Map': lightMap,
        'Total State Approvals Loan Amount': stateApprovalGeojson,
        'State GDP': geojsonGDP,
        'State Total Employments': geojsonJOBS
        //'GDP': gdpMap,
        //'Total Jobs Opening': jobsMap
      };

      // Overlays that may be toggled on or off
      var overlayMaps = {

        'Top States Approval Loan Amount': topStLoanAmoutLayer,
        'Top States GDP': topStGDPLayer,
        'Top States Total Employments':topStJobsOpenLayer,

            };

      // Create map object and set default layers
      var projMap = L.map("projMapLayer", {
        center: [37.0902, -95.7777],
        zoom: 4,
        layers: [lightMap, topStLoanAmoutLayer, topStGDPLayer, topStJobsOpenLayer]
      });
      console.log('trying to add control');
      // Pass our map layers into our layer control
      // Add the layer control to the map
      layerControl = L.control.layers(baseMaps, overlayMaps);
      layerControl.addTo(projMap);
      console.log('added control');

      // ********************************************************************************
      // ***************** DONE SETTING UP MAP LAYERS *********************************
      // ********************************************************************************

    }); /*END OF NUBER OF JOB OPENING*/

  }); /* END OF STATE APPROVALS API CALL (d3.json) */

}); // END OF GDP API CALL (d3.json)

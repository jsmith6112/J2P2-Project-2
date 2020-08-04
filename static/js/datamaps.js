
d3.json('/api/sba_fy_state_approvals', data => {

    //apiData = data['schema']['fields']['data'][0];

    console.log(data);

    var election = new Datamap({
        scope: 'usa',
        element: document.getElementById('map_election'),
        geographyConfig: {
        highlightBorderColor: '#bada55',
        popupTemplate: function(geography, data) {
            return '<div class="hoverinfo">' + geography.properties.name + 'Total Approved:' +  data.GrossApproval + ' '
        },
        highlightBorderWidth: 3
        },
        fills: {
        'Republican': '#CC4731',
        'Democrat': '#306596',
        'Heavy Democrat': '#667FAF',
        'Light Democrat': '#A9C0DE',
        'Heavy Republican': '#CA5E5B',
        'Light Republican': '#EAA9A8',
        defaultFill: '#EDDC4E'
    },
    data: data
    });
    election.labels();

});



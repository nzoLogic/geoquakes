// define globals
var weekly_quakes_endpoint = "http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson";

$(document).on("ready", function() {

    // CODE IN HERE!
    var htmlSource = $('#htmlSource').html(),
        htmlTemplate = Handlebars.compile(htmlSource),
        map = new google.maps.Map(document.getElementById('map'), {
            center: {
                lat: 37.78,
                lng: -122.44
            },
            zoom: 1
        });

    $.ajax({
        method: 'GET',
        url: weekly_quakes_endpoint,
        dataType: 'JSON',
        success: onSuccess,
        error: errorLog,

    });

    function onSuccess(data) {
        console.log('success');
        data.features.forEach(function(feature) {
            // console.log(feature);
            deliverTitle(feature);
            plotCoordinates(feature);
        });

    }


    function errorLog(a, b, c) {
        console.log('error');
    }

    function deliverTitle(feature) {
        var timeSince = Math.round((Date.now() - feature.properties.time) / 3600000) + ' hours since',
            word = feature.properties.title,
            newWord = word.slice(word.indexOf('of') + 3, word.length);

        var deliver = htmlTemplate({
            title: newWord,
            time: timeSince
        });
        $('#info').append(deliver);

    }

    function plotCoordinates(feature) {
        var long = feature.geometry.coordinates[0],
            lat = feature.geometry.coordinates[1];
            console.log(long, lat);
              var marker =  new google.maps.Marker({
                position: {
                    lng: long,
                    lat: lat
                },
                map: map
            })
    }

});

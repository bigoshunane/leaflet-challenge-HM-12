console.log("Step-2");


// Creating the tile layers for  backgrounds; one for main map and other for  grayscale background.

let graymap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/light-v10",
    accessToken: API_KEY
});

let satellitemap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/satellite-v9",
    accessToken: API_KEY
});

let outdoors = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/outdoors-v11",
    accessToken: API_KEY
});

// Creating map object with options and adding the tile layers, array of layers created
let map = L.map("map", {
    center: [
        40.7, -94.5
    ],
    zoom: 3,
    layers: [graymap, satellitemap, outdoors]
});

// Adding our 'graymap' tile layer to the map.
graymap.addTo(map);

// Creating layers for our two different sets of data, earthquakes and tectonicplates.
let tectonicplates = new L.LayerGroup();
let earthquakes = new L.LayerGroup();

// Defining an object that contains all of our different map choices,Only one of these maps will be visible at a time.
let baseMaps = {
    Satellite: satellitemap,
    Grayscale: graymap,
    Outdoors: outdoors
};

// Defining an object that contains all of our overlays, any combination of
// these overlays may be visible at the same time.
let overlays = {
    "Tectonic Plates": tectonicplates,
    Earthquakes: earthquakes
};

// Adding a control to the map that will allow the user to change which layers are visible.
L
    .control
    .layers(baseMaps, overlays)
    .addTo(map);

// AJAX call to retrieve our earthquake geoJSON data for the last 7 days
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(function(data) {

    // This function returns the style data for each of the earthquakes, plotting on
    // the map & passing the magnitude of the earthquake into two separate functions
    // to calculate the color and radius.
    function styleInfo(feature) {
        return {
            opacity: 1,
            fillOpacity: 1,
            fillColor: getColor(feature.geometry.coordinates[2]),
            color: "#000000",
            radius: getRadius(feature.properties.mag),
            stroke: true,
            weight: 0.5
        };
    }

    // This function determines the color of the marker based on the magnitude of the earthquake.
    function getColor(depth) {
        switch (true) {
            case depth > 90:
                return "#ea2c2c";
            case depth > 70:
                return "#ea822c";
            case depth > 50:
                return "#ee9c00";
            case depth > 30:
                return "#eecc00";
            case depth > 10:
                return "#d4ee00";
            default:
                return "#98ee00";
        }
    }

    // This function determines the radius of the earthquake marker based on its magnitude.
    // Earthquakes with a magnitude of 0 were being plotted with the wrong radius.
    function getRadius(magnitude) {
        if (magnitude === 0) {
            return 1;
        }

        return magnitude * 4;
    }

    // Adding a GeoJSON layer to the map once the file is loaded.
    L.geoJson(data, {
        // Returning each feature into a circleMarker on the map.
        pointToLayer: function(feature, latlng) {
            return L.circleMarker(latlng);
        },
        // Setting the style for each circleMarker using our styleInfo function.
        style: styleInfo,
        // Creating a popup for each marker to display the magnitude and location of
        // the earthquake after the marker has been created and styled.
        onEachFeature: function(feature, layer) {
                layer.bindPopup(
                    "Magnitude: " +
                    feature.properties.mag +
                    "<br>Depth: " +
                    feature.geometry.coordinates[2] +
                    "<br>Location: " +
                    feature.properties.place
                );
            }
            // Adding data to the earthquake layer instead of directly to the map.
    }).addTo(earthquakes);

    // Adding earthquake layer to our map.
    earthquakes.addTo(map);

    // Creating a legend control object.
    let legend = L.control({
        position: "bottomright"
    });

    legend.onAdd = function() {
        let div = L.DomUtil.create("div", "info legend");

        let grades = [-10, 10, 30, 50, 70, 90];
        let colors = [
            "#98ee00",
            "#d4ee00",
            "#eecc00",
            "#ee9c00",
            "#ea822c",
            "#ea2c2c"
        ];

        // Loop through our intervals and generate a label with a colored square for each interval.
        for (let i = 0; i < grades.length; i++) {
            div.innerHTML += "<i style='background: " +
                colors[i] +
                "'></i> " +
                grades[i] +
                (grades[i + 1] ? "&ndash;" + grades[i + 1] + "<br>" : "+");
        }
        return div;
    };

    // We add our legend to the map.
    legend.addTo(map);

    // making AJAX call to get our Tectonic Plate geoJSON data from github as provided.
    d3.json("https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json").then(function(platedata) {
        // Adding jeoJSON data, along with style information, to the tectonicplates layer.

        L.geoJson(platedata, {
                color: "orange",
                weight: 2
            })
            .addTo(tectonicplates);

        // Finally adding the tectonicplates layer to the map.
        tectonicplates.addTo(map);
    });
});
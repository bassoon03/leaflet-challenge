let myMap = L.map('map', {
    center : [0,0],
    zoom : 40,
    layers : [baseMaps]
    });

let geo_map = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(myMap);

let baseMaps = {
    "Street Map" : geo_map
};



const url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_month.geojson";

d3.json(url).then(function (data) {
    createFeatures(data["features"]);

    let markers = L.markerClusterGroup();
    for (let i = 0; i < data["features"].length; i++) {
        let location = data["features"][i]["geometry"]["coordinates"];
        if (location) {
            markers.addLayer(L.circleMarker([location[0],location[1], radius = data["features"]["properties"]["mag"],
            fillOpacity = data["features"]["properties"].location[2]
            ]).bindPopup(data["features"][i].descriptor))
        };
    };
myMap.addLayer(markers);


});








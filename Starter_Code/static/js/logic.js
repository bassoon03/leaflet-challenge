let geo_map = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
});

let baseMaps = {
    "Topo Map" : geo_map
};

let myMap = L.map('map', {
    center : [0,0],
    zoom : 20,
    layers : geo_map
    });

//geo_map.addTo(myMap);

const url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_month.geojson";

d3.json(url).then(function (data) {
    // createFeatures(data["features"]);

    let features = data["features"];
    
      
      // create a vector circle centered on each point feature's latitude and longitude
    function createCircles (features) {
        let myLayerStyle = {
            color: features["geometry"]["coordinates"][2],
            radius: features["properties"]["mag"]};
        let latlng = [features["geometry"]["coordinates"][0], features["geometry"]["coordinates"][1]];
        return L.circle(latlng, myLayerStyle)
      }
      
      // create an options object that specifies which function will called on each feature
    var myLayerOptions = {
        pointToLayer: createCircles
      }
      
      
      // create the GeoJSON layer from the myLayerData object (not shown in this snippet)
    L.geoJSON(features, myLayerOptions).bindPopup(function (geo_map) {
        return layer.feature.properties["mag"];
        return layer.feature.properties["place"];
        return layer.feature["geometry"]["coordinates"][2];

    }).addTo(map)





    
    // L.geoJSON(features, {
    //     style : function (feature) {
    //         return {color: feature.properties.color};
    //     }
    // }).bindPopup(function (geo_map) {
    //     return layer.feature.properties["mag"];
    //     return layer.feature.properties["place"];
    //     return layer.feature["geometry"]["coordinates"][2];

    // }).addTo(myMap);







    // let markers = L.circleMarker();
    // for (let i = 0; i < data["features"].length; i++) {
    //     let location = data["features"][i]["geometry"]["coordinates"];
    //     if (location) {
    //         markers.addLayer(L.circleMarker([location[0],location[1], radius = data["features"]["properties"]["mag"],
    //         fillOpacity = data["features"]["properties"].location[2]
    //         ]).bindPopup(data["features"][i].descriptor))
    //     };
    // };
    
    // myMap.addLayer(markers);







    let legend = L.control({position: "bottomright"});
    legend.onAdd = function() {
        let div = L.DomUtil.create("div", "info legend");
        let limits = markers.options.limits;
        let colors = markers.options.colors;
        let labels = [];

        let legendInfo = "<h1>Earthquakes with Magnitude 4.5 or Higher<h1>" +
            "<div class=\"labels\">" +
                "<div class=\"min\">" + limits[0] + "</div>" +
                "<div class=\"max\">" + limits[limits.length - 1] + "</div>" +
            "</div>";
    div.innerHTML = legendInfo;

    limits.forEach(function(limit, index) {
        labels.push("<li style=\"background-color: " + colors[index] + "\"></li>");
    });

    div.innerHTML += "<ul>" + labels.join("") + "</ul>";
    return div;
    };

    legend.addTo(myMap);

});








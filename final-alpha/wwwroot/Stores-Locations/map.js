/* Global Constants
============================================= */
const MAPBOX_API_KEY = "pk.eyJ1IjoiY2doYXllczk5IiwiYSI6ImNqbjB4cXF3bDAzZHQzcW84NjZwaWtzYWEifQ.FNyqY-OeU-ofKd8GMBgwww";

const LAYER_OUTDOORS = L.tileLayer(`https://api.mapbox.com/styles/v1/mapbox/outdoors-v10/tiles/256/{z}/{x}/{y}?access_token=${MAPBOX_API_KEY}`, {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, " +
                 "<a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © "+
                 "<a href=\"https://www.mapbox.com/\">Mapbox</a>",
    id: "mapbox.streets",
    maxZoom: 18,
});

const LAYER_SATELLITE = L.tileLayer(`https://api.mapbox.com/styles/v1/mapbox/satellite-v9/tiles/256/{z}/{x}/{y}?access_token=${MAPBOX_API_KEY}`, {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, " +
                 "<a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © "+
                 "<a href=\"https://www.mapbox.com/\">Mapbox</a>",
    id: "mapbox.streets",
    maxZoom: 18,
});

const LAYER_LIGHT = L.tileLayer(`https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token=${MAPBOX_API_KEY}`, {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, " +
                 "<a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © "+
                 "<a href=\"https://www.mapbox.com/\">Mapbox</a>",
    id: "mapbox.streets",
    maxZoom: 18,
});

const LAYER_STREET = L.tileLayer(`https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=${MAPBOX_API_KEY}`, {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, " +
                 "<a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © "+
                 "<a href=\"https://www.mapbox.com/\">Mapbox</a>",
    id: "mapbox.streets",
    maxZoom: 18,
});





var url1 = "http://bootcamp.brogard.io:5051/geo/stats/2017/year/TARGET/store";
var url2 = "http://bootcamp.brogard.io:5051/geo/stats/2017/year";
var url3 = "http://bootcamp.brogard.io:5051/geo/stats/TARGET/store";

/* Global Var
============================================= */
var map = L.map("map").setView([39.095963, -97.734375], 5);



 
//****************** init *****************************//
d3.json(url1, function(data) {
    console.log(data);
    
    var heatLayer = L.heatLayer(data, {radius: 20});    
    
    LAYER_LIGHT.addTo(map);
    heatLayer.addTo(map);
 
});
 

//****************** main ******************//



//****************** Event Listeners ******************//



/* Functions
============================================= */
function renderBaseMaps() {
 	var baseMaps = {
        Light     : LAYER_LIGHT,
        Outdoors  : LAYER_OUTDOORS,
		Satellite : LAYER_SATELLITE
	};
    return baseMaps;
}




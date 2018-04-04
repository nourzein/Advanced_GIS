console.log('hi');
// This isn't necessary but it keeps the editor from thinking L and carto are typos
/* global L, carto */

var map = L.map('map').setView([40.7, -74.] , 3);
map.setZoom(9) 

// Add base layer
L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}.png', {
  maxZoom: 18
}).addTo(map);

// Initialize Carto
var client = new carto.Client({
  apiKey: 'apikey',
  username: 'nourzein'
});

// Initialze source data
var source = new carto.source.SQL('SELECT * FROM listings_copy');

// Create style for the data
var style = new carto.style.CartoCSS(`
  #layer {
  marker-width: 7;
  marker-fill: #e94dee;
  marker-fill-opacity: 0.9;
  marker-allow-overlap: false;
  marker-line-width: 1;
  marker-line-color: #FFFFFF;
  marker-line-opacity: 1;
}
`);
// Add style to the data
var layer = new carto.layer.Layer(source, style, {
  featureClickColumns: ['price', 'host_name']
});

var popup = L.popup();
layer.on('featureClicked', function (event) {
  // Create the HTML that will go in the popup. event.data has all the data for 
  // the clicked feature.
  //
  // I will add the content line-by-line here to make it a little easier to read.
  var content = '<h1>' + event.data['host_name'] + '</h1>'
  content += '<div>$' + event.data['price'] + ' per night</div>';
  popup.setContent(content);
  
  // Place the popup and open it
  popup.setLatLng(event.latLng);
  popup.openOn(map);
});



// Initialze source data
var source2 = new carto.source.Dataset('nypd_motor');

// Create style for the data
var style2 = new carto.style.CartoCSS(`
   #layer {
  marker-width: 7;
  marker-fill: #4d4dee;
  marker-fill-opacity: 0.9;
  marker-allow-overlap: false;
  marker-line-width: 1;
  marker-line-color: #FFFFFF;
  marker-line-opacity: 1;
}
`);

// Add style to the data
var layer2 = new carto.layer.Layer(source2, style2, {
  featureClickColumns: ['zip_code', 'vehicle_type_code_2']
});

var popup2 = L.popup();
layer2.on('featureClicked', function (event) {
  // Create the HTML that will go in the popup. event.data has all the data for 
  // the clicked feature.
  //
  // I will add the content line-by-line here to make it a little easier to read.
  var content = '<div>' + event.data['zip_code'] +  ' Zip Code</div>'
  content += '<div>' + event.data['vehicle_type_code_2'] + '</div>';
  popup.setContent(content);
  
  // Place the popup and open it
  popup.setLatLng(event.latLng);
  popup.openOn(map);
});


// Add the data to the map as a layer
client.addLayers([layer, layer2]);
client.getLeafletLayer().addTo(map);


// Initialze source data
var source3 = new carto.source.SQL('SELECT * FROM listings_copy');

// Create style for the data
var style3 = new carto.style.CartoCSS(`
  #layer {
  marker-width: 7;
  marker-fill: #e94dee;
  marker-fill-opacity: 0.9;
  marker-allow-overlap: false;
  marker-line-width: 1;
  marker-line-color: #FFFFFF;
  marker-line-opacity: 1;
}
`);
// Add style to the data
var layer3 = new carto.layer.Layer(source3, style3);

// Add the data to the map as a layer
client.addLayer(layer3);
client.getLeafletLayer().addTo(map);

// Step 1: Find the button by its class. If you are using a different class, change this.
var BronxButton = document.querySelector('.Bronx_button');

// Step 2: Add an event listener to the button. We will run some code whenever the button is clicked.
// Step 2: Add an event listener to the button. We will run some code whenever the button is clicked.
BronxButton.addEventListener('click', function (e) {
  source.setQuery("SELECT * FROM listings_copy WHERE neighbourhood_group = 'Bronx'");
  
  // Sometimes it helps to log messages, here we log to let us know the button was clicked. You can see this if you open developer tools and look at the console.
  console.log('Bronx was clicked');
});


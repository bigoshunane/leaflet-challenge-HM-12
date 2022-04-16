# leaflet-challenge-HM-12

# Visualizing Data with Leaflet

The objective of this project is to use data from United States Geological Survey, USGS for short and display multiple and interactive maps with the location and magnitude of earthquakes during the last 7 days around the world.

The Javascript-Leaflet library, HTML, CSS, Bootstrap, and Javascript were used in the project. The Mapbox-API was also used to load the base maps.




# Technologies

    . JavaScript (Leaflet, D3)
    . HTML
    . CSS

# Steps
The project has two steps with different levels of complexity.

1. Step-1
Building a single base layer map with one set of data.

Base layer: mapbox.greyscale
Data Layer Source: United States Geological Survey (USGS)
Data: All Earthquakes for the last 7 days

![11](https://user-images.githubusercontent.com/84547558/163663118-e6964fb6-fbab-40f6-9836-4eb886ffa729.png)


2. Step-2
Map to illustrate the relationship between tectonic plates and seismic activity.

Multiple optional and interactive base layers were included.
An additional dataset and plot were included and they can be activated and deactivated by the user. Data markers reflects the magnitude of the earthquake by their size and and depth of the earth quake by color. Earthquakes with higher magnitudes should appear larger and earthquakes with greater depth should appear darker in color. The map includes popups that provide additional information about the earthquake when a marker is clicked. Legends created that will provide context for the map data.

Base layer:

. mapbox.greyscale
. mapbox.satellite
. mapbox.outdoors

Data: All Earthquakes - Last 7 days
Layer 2: Tectonic Plates
Source: Hugo Ahlenius, GIS-and-Cartography Consultant https://github.com/fraxen/tectonicplates Libraries Required (already included in the index.html file) D3 JavaScript, Leaflet.

![22](https://user-images.githubusercontent.com/84547558/163663262-dea83922-27cf-42d4-b326-32821daa7a05.png)![33](https://user-images.githubusercontent.com/84547558/163663264-e46f8fb7-c657-483b-8a89-c575581c66d1.png)![4](https://user-images.githubusercontent.com/84547558/163663266-c073d453-61fa-46e9-a7ef-d1b716473039.png)



Source: Hugo Ahlenius, GIS-and-Cartography Consultant https://github.com/fraxen/tectonicplates Libraries Required (already included in the index.html file) D3 JavaScript, Leaflet.

Instructions:
. Download or clone all the files contained in this repo.
. Create a Mapbox Token
. Include your Mapbox Token in the /Leaflet-Step-1/static/js/config.js and /Leaflet-Step-2/static/js/config.js files.
. Run a python -m http.server or any other method for this purpose.
. Load the Leaflet-Step-1/index.html and Leaflet-Step-2/index.html files.

© 2021  Trilogy Education Services, a 2U, Inc. brand. All Rights Reserved.

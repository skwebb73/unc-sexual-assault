var lat =[];
var lon = [];
var markers = [];
var mapDate = [];
var description = [];
var oms = new OverlappingMarkerSpiderfier(map, {
  markersWontMove: true,
  markersWontHide: true,
  basicFormatEvents: true
});

$(document).ready(function(){
  console.log("ready");
  //loadData();
  startLoadXml();
  });

//loading the JSON file if I do JSON
function loadData(){
  console.log("loadData");
  $.getJSON("crimeLog.json", function (crimeLog){
    //console.log(crimeLog);
    parseData(crimeLog);
  })
}

function parseData(crimeLog){
  console.log("parseData");
  //var html ="";
  $.each(crimeLog, function(index){
      //console.log(byCounty[index].black);
    //html += "<h2>"
    lat.push(parseFloat(crimeLog[index].lat));
    lon.push(parseFloat(crimeLog[index].lon));
    mapDate.push(crimeLog[index].date);
    description.push(crimeLog[index].Description);
  });

  // if(lat.length != 0){
  //   for (i=0; i < lat.length; i++){
  //     var existingLat = lat[i];
  //     if(existingLat == lat[i]){
  //       var newLat = pos.lat() + -.00004 * Math.cos((+a*i) / 180 * Math.PI);
  //       console.log(newLat);
  //     }
  //   }
  // }



 initMap();
}

console.log(lat);

//loading the XML file
function startLoadXml() {

$.ajax({
type: "GET",
url: "crimeLog.xml",
dataType: "xml",
success: parseXml
});
} //close loadXML

function parseXml(xml)
{
var htmlBottom = '';



$(xml).find("row").each(function(index){

//Builds bottom of page content
htmlBottom += '<div class=""><ul ><li>';
htmlBottom += '<h3>' + $(this).find("date").text() + '</h3></li>';
htmlBottom += '<ul><li>Location: ' + $(this).find("Address").text() + '</li>';
htmlBottom += '<li>Description: ' + $(this).find("Description").text() + '</li>';
htmlBottom += '</ul></ul></div>';






});


$("#person").append(htmlBottom);




}

creating the map
  function initMap(){
    var options = {
      zoom: 15,
      center: {lat: 35.9086, lng: -79.0492 },
      styles: [
        { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
        { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
        { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
        {
          featureType: "administrative.locality",
          elementType: "labels.text.fill",
          stylers: [{ color: "#d59563" }],
        },
        {
          featureType: "poi",
          elementType: "labels.text.fill",
          stylers: [{ color: "#d59563" }],
        },
        {
          featureType: "poi.park",
          elementType: "geometry",
          stylers: [{ color: "#263c3f" }],
        },
        {
          featureType: "poi.park",
          elementType: "labels.text.fill",
          stylers: [{ color: "#6b9a76" }],
        },
        {
          featureType: "road",
          elementType: "geometry",
          stylers: [{ color: "#38414e" }],
        },
        {
          featureType: "road",
          elementType: "geometry.stroke",
          stylers: [{ color: "#212a37" }],
        },
        {
          featureType: "road",
          elementType: "labels.text.fill",
          stylers: [{ color: "#9ca5b3" }],
        },
        {
          featureType: "road.highway",
          elementType: "geometry",
          stylers: [{ color: "#746855" }],
        },
        {
          featureType: "road.highway",
          elementType: "geometry.stroke",
          stylers: [{ color: "#1f2835" }],
        },
        {
          featureType: "road.highway",
          elementType: "labels.text.fill",
          stylers: [{ color: "#f3d19c" }],
        },
        {
          featureType: "transit",
          elementType: "geometry",
          stylers: [{ color: "#2f3948" }],
        },
        {
          featureType: "transit.station",
          elementType: "labels.text.fill",
          stylers: [{ color: "#d59563" }],
        },
        {
          featureType: "water",
          elementType: "geometry",
          stylers: [{ color: "#17263c" }],
        },
        {
          featureType: "water",
          elementType: "labels.text.fill",
          stylers: [{ color: "#515c6d" }],
        },
        {
          featureType: "water",
          elementType: "labels.text.stroke",
          stylers: [{ color: "#17263c" }],
        },
      ],
    }
    var map = new google.maps.Map(document.getElementById('map'), options);



    //Array of markers

    // var markers = [
    // {
    //   coords:{lat:35.9023883,lng:-79.0432903},
    //   iconImage:'images/case.png',
    //   content: '<h1>Lynn Mas</h1>'
    // },
    // {
    //   coords:{lat:$(this).find("lat").text(),lng:$(this).find("lon").text()},
    //   content: '<h1>Amesbury Mas</h1>'
    // },
    // {
    //   coords:{lat:42.7762,lng:-71.0773}
    // }
    // ];

    for(var i =0; i <lon.length; i++){
      var markers =[
        {
          coords:{lat: lat[i], lng: lon[i]},
          iconImage:'images/case.png',
          content: '<h5>' + mapDate[i] + '</h5>' + '<h6>' + description[i] + '</6>'
        }
      ];


      //console.log(markers);
      buildMarkers();
    };

    function buildMarkers(){

    //Loop through markrers
    //console.log(markers);
    for(var i = 0; i < markers.length; i++){
      addMarker(markers[i]);
      //console.log(markers);
    };
    }


    function addMarker(props){
      var marker = new google.maps.Marker({
        position:props.coords,
        map:map,
        icon:props.iconImage
      });

      //check for custom icon
      if(props.iconImage){
        marker.setIcon(props.iconImage);
        //oms.addMarker(marker);
      }

      if(props.content){
        var infoWindow = new google.maps.InfoWindow({
            content: props.content
        });

        marker.addListener('click', function(){
          infoWindow.open(map, marker);
        })
      }
    }
  }



  //creating the map spider version
  //
  // function initMap(){
  //   var options = {
  //     zoom: 15,
  //     center: {lat: 35.9086, lng: -79.0492 },
  //
  //   }
  //   var map = new google.maps.Map(document.getElementById('map'), options);
  //
  //
  //
  //   //Array of markers
  //
  //   // var markers = [
  //   // {
  //   //   coords:{lat:35.9023883,lng:-79.0432903},
  //   //   iconImage:'images/case.png',
  //   //   content: '<h1>Lynn Mas</h1>'
  //   // },
  //   // {
  //   //   coords:{lat:$(this).find("lat").text(),lng:$(this).find("lon").text()},
  //   //   content: '<h1>Amesbury Mas</h1>'
  //   // },
  //   // {
  //   //   coords:{lat:42.7762,lng:-71.0773}
  //   // }
  //   // ];
  //
  //   for(var i =0; i <lon.length; i++){
  //     var markers =[
  //       {
  //         coords:{lat: lat[i], lng: lon[i]},
  //         iconImage:'images/case.png',
  //         content: '<h5>' + mapDate[i] + '</h5>' + '<h6>' + description[i] + '</6>'
  //       }
  //     ];
  //
  //
  //     //console.log(markers);
  //     buildMarkers();
  //   };
  //
  //   function buildMarkers(){
  //
  //   //Loop through markrers
  //   //console.log(markers);
  //   for(var i = 0; i < markers.length; i++){
  //     addMarker(markers[i]);
  //     //console.log(markers);
  //   };
  //   }
  //
  //
  //   function addMarker(props){
  //     var marker = new google.maps.Marker({
  //       position:props.coords,
  //       map:map,
  //       icon:props.iconImage
  //     });
  //
  //     //check for custom icon
  //     if(props.iconImage){
  //       marker.setIcon(props.iconImage);
  //       //oms.addMarker(marker);
  //     }
  //
  //     if(props.content){
  //       var infoWindow = new google.maps.InfoWindow({
  //           content: props.content
  //       });
  //
  //       marker.addListener('click', function(){
  //         infoWindow.open(map, marker);
  //       })
  //     }
  //   }
  // }

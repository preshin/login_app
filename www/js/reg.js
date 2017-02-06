
var db, email, name, age, psw,sex,imageData,lat,lon,address,data;
var Latitude ;
var Longitude;


document.addEventListener("deviceready",onDeviceReady,false);
function onDeviceReady(){
	
	db = window.sqlitePlugin.openDatabase({name: "userinfo.db", location: 'default'});
document.getElementById("submit").addEventListener("click", registration);
getMapLocation();
}

function cameraGetPicture() {
   
navigator.camera.getPicture(onSuccess, onFail, { quality: 25,
    destinationType: Camera.DestinationType.DATA_URL,
    sourceType: Camera.PictureSourceType.PHOTOLIBRARY    
});

function onSuccess(imgData) {
    var image = document.getElementById('myImage');
    image.src = "data:image/jpeg;base64," + imgData;    
    imageData=imgData;
    getMapLocation();
    add();
}

function onFail(message) {
    alert('Failed because: ' + message);
}
}



function registration(){
	//alert("entered create");
	db.transaction(function(transaction) {
	
    transaction.executeSql('CREATE TABLE IF NOT EXISTS registration (email text primary key, name text, age integer, sex text, psw text,imageData text,lat DOUBLE,lon DOUBLE,address text)', [],
        function(tx, result) {
            //alert("Table created successfully");
           console.log("table created");
        }, 
        function(error) {
              alert("Error occurred while creating the table.");
        });
    });

    //alert("entered insert");

	email=document.getElementById("email").value;	
	name=document.getElementById("name").value;
	age=document.getElementById("age").value;
	psw=document.getElementById("psw").value;
	if (document.getElementById('male').checked) {
 		 sex= document.getElementById('male').value;
		}
	else if(document.getElementById('female').checked) {
 		 sex= document.getElementById('female').value;
		}
	
	//alert("uname = "+email+" name = "+name+" age= "+age+"passwd "+psw);
db.transaction(function(transaction) {
        var executeQuery = "INSERT INTO registration (email,name,age,sex,psw,imageData,lat,lon,address) VALUES (?,?,?,?,?,?,?,?,?)";             
        transaction.executeSql(executeQuery, [email,name,age,sex,psw,imageData,lat,lon,address], function(tx, result) {
                 alert('Inserted');
                  console.log("Inserted");
                   window.location.href="index.html";
            },
            function(error){
                 alert('Error occurred'); 
                 console.log("error is  "+error.value);
            });
    });
	
/*
	db.transaction(function(transaction) {
  transaction.executeSql('SELECT * FROM registration', [], function (tx, results) {
       var len = results.rows.length, i;       
       for (i = 0; i < len; i++){
          //$("#TableData").append("<tr><td>"+results.rows.item(i).id+"</td><td>"+results.rows.item(i).title+"</td><td>"+results.rows.item(i).desc+"</td><td><a href='edit.html?id="+results.rows.item(i).id+"&title="+results.rows.item(i).title+"&desc="+results.rows.item(i).desc+"'>Edit</a> &nbsp;&nbsp; <a class='delete' href='#' id='"+results.rows.item(i).id+"'>Delete</a></td></tr>");
          alert("email "+results.rows.item(i).email);
          console.log("email == "+results.rows.item(i).email);
       }
    }, null);
  });*/

/*File database=getApplicationContext().getDatabasePath("userinfo.db");

if (!database.exists()) {
    // Database does not exist so copy it from assets here
    alert("Database", "Not Found");
} else {
    alert("Database", "Found");
}*/

}

/*
function create(){
alert("entered create");
	db.transaction(function(transaction) {
	
    transaction.executeSql('CREATE TABLE IF NOT EXISTS registration (email text primary key, name text, age integer, psw text)', [],
        function(tx, result) {
            alert("Table created successfully");
           
        }, 
        function(error) {
              alert("Error occurred while creating the table.");
        });
    });
}

function insert(){
alert("entered insert");
var email=document.getElementById("email").value;	
	var name=document.getElementById("name").value;
	var age=document.getElementById("age").value;
	var psw=document.getElementById("psw").value;
	
	alert("uname = "+email+" name = "+name+" age= "+age+"sex= "+sex+"passwd "+psw);
db.transaction(function(transaction) {
        var executeQuery = "INSERT INTO registration (email,name,age,psw) VALUES (?,?,?,?)";             
        transaction.executeSql(executeQuery, [email,name,age,psw], function(tx, result) {
                 alert('Inserted');
                 
            },
            function(error){
                 alert('Error occurred'); 
                 console.log("error is  "+error.value);
            });
    });

}

function show(){
	alert("entered show");
db.transaction(function(transaction) {
  transaction.executeSql('SELECT * FROM registration', [], function (tx, results) {
       var len = results.rows.length, i;       
       for (i = 1; i <= len; i++){
          //$("#TableData").append("<tr><td>"+results.rows.item(i).id+"</td><td>"+results.rows.item(i).title+"</td><td>"+results.rows.item(i).desc+"</td><td><a href='edit.html?id="+results.rows.item(i).id+"&title="+results.rows.item(i).title+"&desc="+results.rows.item(i).desc+"'>Edit</a> &nbsp;&nbsp; <a class='delete' href='#' id='"+results.rows.item(i).id+"'>Delete</a></td></tr>");
          alert("email "+results.rows.item(i).email);
       }
    }, null);
  });

}

//document.getElementById("submit").addEventListener("click", registration);




document.getElementById("create").addEventListener("click", create);
document.getElementById("insert").addEventListener("click", insert);
document.getElementById("show").addEventListener("click", show);*/





function getMapLocation() {

    navigator.geolocation.getCurrentPosition
    (onMapSuccess, onMapError, { enableHighAccuracy: true });
}

// Success callback for get geo coordinates

var onMapSuccess = function (position) {

    Latitude = position.coords.latitude;
    Longitude = position.coords.longitude;    
    getMap(Latitude, Longitude);    
}

/*function add(){

	
  	var jsn;
  	var xhttp;	
		var xhttp = new XMLHttpRequest();		
  		xhttp.onreadystatechange = function() {
    	if (this.readyState == 4 && this.status == 200) {   
    		document.getElementById("address").value="got address";   		
      		data = JSON.parse(xhttp.responseText);
      		//address=data.formatted_address;	
      		console.log("data== "+data.value);
      		document.getElementById("address").value=address;		
    		}
  		};  		  
  	var url="http://maps.googleapis.com/maps/api/geocode/json?latlng="+lat+","+lon;
  	xhttp.open("GET", url, true);
  	xhttp.send();
}*/
/*
function add(){


	var xhReq = new XMLHttpRequest();
	var url="http://maps.googleapis.com/maps/api/geocode/json?latlng="+lat+","+lon;

xhReq.open("GET", url, false);
xhReq.send(null);
var jsonObject = JSON.parse(xhReq.responseText);
console.log("json  === "+jsonObject);

}
*/


function add(){

	 var latlng = new google.maps.LatLng(lat, lon);
            var geocoder = geocoder = new google.maps.Geocoder();
            geocoder.geocode({ 'latLng': latlng }, function (results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    if (results[0]) {
                        //alert("Location: " + results[1].formatted_address);
                        document.getElementById("address").value=results[0].formatted_address;
                        address=results[0].formatted_address;
                    }
                }
            });


}

// Get map by using coordinates

function getMap(latitude, longitude) {
	lat=latitude;
	lon=longitude;

    var mapOptions = {
        center: new google.maps.LatLng(0, 0),
        zoom: 1,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    map = new google.maps.Map
    (document.getElementById("map"), mapOptions);


    var latLong = new google.maps.LatLng(latitude, longitude);

    var marker = new google.maps.Marker({
        position: latLong
    });

    marker.setMap(map);
    map.setZoom(15);
    map.setCenter(marker.getPosition());   
}

// Success callback for watching your changing position

var onMapWatchSuccess = function (position) {

    var updatedLatitude = position.coords.latitude;
    var updatedLongitude = position.coords.longitude;

    if (updatedLatitude != Latitude && updatedLongitude != Longitude) {

        Latitude = updatedLatitude;
        Longitude = updatedLongitude;

        getMap(updatedLatitude, updatedLongitude);
    }
}

// Error callback

function onMapError(error) {
    console.log('code: ' + error.code + '\n' +
        'message: ' + error.message + '\n');
}

// Watch your changing position

function watchMapPosition() {

    return navigator.geolocation.watchPosition
    (onMapWatchSuccess, onMapError, { enableHighAccuracy: true });
}








document.getElementById("cameraGetPicture").addEventListener("click", cameraGetPicture);

document.getElementById("location").addEventListener("click", getMapLocation);
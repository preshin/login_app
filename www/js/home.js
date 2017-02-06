var db,lon,lat;

document.addEventListener("deviceready",onDeviceReady,false);
function onDeviceReady(){
	db = window.sqlitePlugin.openDatabase({name: "userinfo.db", location: 'default'});
	document.getElementById("dis").addEventListener("click", dis);
	
}

function dis(){
//console.log(" name "+name+" email "+email);
console.log("entered");
var imageData=localStorage.getItem("imageData");
 var image = document.getElementById('myimage');
    image.src ="data:image/jpeg;base64,"+imageData;    
document.getElementById("name").value=localStorage.getItem("name");
document.getElementById("email").value=localStorage.getItem("email");
document.getElementById("age").value=localStorage.getItem("age");
document.getElementById("sex").value=localStorage.getItem("sex");
document.getElementById("psw").value=localStorage.getItem("psw");
document.getElementById("address").value=localStorage.getItem("address");
lon=localStorage.getItem("lon");
lat=localStorage.getItem("lat");
console.log("address "+localStorage.getItem("address"));
getMap(lat,lon);
/*db.transaction(function(transaction) {
	
    transaction.executeSql('CREATE TABLE IF NOT EXISTS registration (email text primary key, name text, age integer, psw text)', [],
        function(tx, result) {
            alert("Table created successfully");
           
        }, 
        function(error) {
              alert("Error occurred while creating the table.");
        });
    });

	db.transaction(function(transaction) {
  transaction.executeSql('SELECT * FROM registration', [], function (tx, results) {

       var len = results.rows.length, i;       
       for (i = 0; i < len; i++){          
          //alert("email "+results.rows.item(i).email);
          if (email==results.rows.item(i).email&&psw==results.rows.item(i).psw) {
  	document.getElementById("email").value=results.rows.item(i).email
  	//document.getElementById("name").innerHTML=name;
alert("email "+results.rows.item(i).email);
  }
       }
    }, null);
  });*/
	
}

//document.getElementById("dis").addEventListener("click", dis);

function del(){

	var e = document.getElementById("deldiv");
   if(e.style.display == 'block')
      e.style.display = 'none';
   else
      e.style.display = 'block';

}


function deluser(){

	var p=document.getElementById("cpsw").value;
	if(p==localStorage.getItem("psw")){

		var id=localStorage.getItem("email");
  db.transaction(function(transaction) {
    var executeQuery = "DELETE FROM registration where email=?";
    transaction.executeSql(executeQuery, [id],
      //On Success
      function(tx, result) {
      		alert('Delete successfully');
      		window.location.href="index.html";
  		},
      //On Error
      function(error){alert('Something went Wrong');
      		console.log("Delete error "+error);
  		});
  });

	}
}


function getMap(latitude, longitude) {

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



document.getElementById("del").addEventListener("click", del);
document.getElementById("cbtn").addEventListener("click", deluser);
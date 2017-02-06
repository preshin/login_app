var f=0;

document.addEventListener("deviceready",onDeviceReady,false);
function onDeviceReady(){
	
	
document.getElementById("login").addEventListener("click", validate);

}

function validate(){

var db = window.sqlitePlugin.openDatabase({name: "userinfo.db", location: 'default'});
		var e=document.getElementById("email").value;
		var p=document.getElementById("psw").value;
    /*if(document.getElementById("email").value=="abc"&&document.getElementById("psw").value=="abc"){
        console.log("entered");
        window.location.href="home.html";
    }
    else{
        alert("email and password is incorrect");
    }*/


   /* db.transaction(function(transaction) {
	
    transaction.executeSql('CREATE TABLE IF NOT EXISTS registration (email text primary key, name text, age integer, psw text)', [],
        function(tx, result) {
            alert("Table created successfully");
           
        }, 
        function(error) {
              alert("Error occurred while creating the table.");
        });
    });*/

	db.transaction(function(transaction) {
  transaction.executeSql('SELECT * FROM registration', [], function (tx, results) {

       var len = results.rows.length, i;       
       for (i = 0; i < len; i++){          
          //alert("email "+results.rows.item(i).email);
          if(e.toLowerCase()==results.rows.item(i).email.toLowerCase()){
          	
          		console.log("enter email present");
          		if (e.toLowerCase()==results.rows.item(i).email.toLowerCase()&&p==results.rows.item(i).psw) {
	          		localStorage.setItem("name", results.rows.item(i).name);
          			localStorage.setItem("email", results.rows.item(i).email);
          			localStorage.setItem("age", results.rows.item(i).age);
          			localStorage.setItem("sex", results.rows.item(i).sex);
          			localStorage.setItem("psw", results.rows.item(i).psw);
          			localStorage.setItem("imageData", results.rows.item(i).imageData);
                localStorage.setItem("lon", results.rows.item(i).lon);
                localStorage.setItem("lat", results.rows.item(i).lat);
                localStorage.setItem("address", results.rows.item(i).address);
          			console.log("password email correct");
  					window.location.href="home.html";
					f=1;
  				}
			}
			else{
				console.log("email not present");
				f=2;
			}			
       	}
       	if(f==0){
			//alert("email password incorrect");
			document.getElementById("msg").innerHTML="";
			document.getElementById("msg").innerHTML="Email or Password Incorrect";
		}
		else if(f==2){
			//alert("No User Found Please Register!!");
			document.getElementById("msg").innerHTML="";
			document.getElementById("msg").innerHTML="No User Found Please Register!!";
			f=0;
		}
    }, null);
  });




}

function test(){

  window.location.href="test.html";

}

document.getElementById("test").addEventListener("click", test);
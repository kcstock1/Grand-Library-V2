// JavaScript source code

	  	 document.getElementById("submitadd").addEventListener("click", function(){
		  var genreselected = document.getElementById("submitadd").value 

          var genre = document.getElementById("addgenreName").value 
          var req = new XMLHttpRequest();
          req.open("GET", "http://flip3.engr.oregonstate.edu:22222/genreadd?newgenre="+genre, true);
		  console.log(req);
		  console.log("TEST HERE")
          req.send(null);

          event.preventDefault();
	 
	    });


		  document.getElementById("submitdelete").addEventListener("click", function(){

          var genre = document.getElementById("deletegenreName").value 
          var req = new XMLHttpRequest();
          req.open("GET", "http://flip3.engr.oregonstate.edu:22222/genredelete?genre="+genre, true);
		  console.log(req);
		  console.log("TEST HERE")
          req.send(null);

          event.preventDefault();
	 
	    });


		
		  document.getElementById("updategenresubmit").addEventListener("click", function(){

          var genreold = document.getElementById("oldgenre").value 
          var genrenew = document.getElementById("newgenre").value 

          var req = new XMLHttpRequest();
          req.open("GET", "http://flip3.engr.oregonstate.edu:22222/genreupdate?genreold="+genreold+"&genrenew="+genrenew, true);
		  console.log(req);
		  console.log("TEST HERE")
          req.send(null);

          event.preventDefault();
	 
	    });
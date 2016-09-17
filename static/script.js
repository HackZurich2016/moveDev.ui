var gamestate;
var URLgetGameState = "http://192.168.43.118:8000/game";
//var URLgetGameState = "http://6fc04216.ngrok.io";

function loadGameState(){

	$.ajax({
	    type: "GET",
	    url: URLgetGameState,
		dataType: 'json',
	    success: function( data ) {
			console.log("Gamestate Successful loaded");
			gamestate = data;
			redrawGameField();
		},
	    error: function (xhr, ajaxOptions, thrownError) {
	      console.log(xhr.status);
	      console.log(thrownError);
	    }
	})

}

function redrawGameField(){
	$("#gameField").empty();
	var x_max = 10;
    var y_max = 10;
    for (var x = 0; x_max > x; x++) {
    	for (var y = 0; y_max > y; y++) {
    		fieldValue = gamestate[x][y];
        	$("#gameField").append('<div class="field" x="' + x + '" y="' + y +'">' + fieldValue + '</div>');
    	};
	};

}

$( document ).ready(function() {
	loadGameState();
	
	 $(".field")
	 	.mouseenter(function() {
	    	$( this ).css('background-color', 'red');
	  	})
	  	.mousedown(function() {
	  		senderId = $( this ).id;

	    	$( this ).css('background-color', '');
	  	})
	  	.mouseup(function() {
	  		recieverId = $( this ).id;
	    	$( this ).css('background-color', '');
	  	})
	  	.click(function(){
	  		fieldClicked(this);
	  	});
	});

function transfer(){
	$recieverId
}



function fieldClicked(sender){
	if(gamestate.credits > 0){
		var x = $(sender).attr("x");
  		var y = $(sender).attr("y");
  		var coordinates = {"x":x,"y":y};
  		gamestate.myFields.push(coordinates);
  		$(sender).unbind("mouseleave");
  		gamestate.credits = gamestate.credits -1;
  		$("#credits").html(gamestate.credits);
	}
	
}


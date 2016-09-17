var gamestate;
var URLgetGameState = "http://192.168.43.118:8000/game/";

//var URLgetGameState = "http://6fc04216.ngrok.io";

var senderCoordinates;
var recieverCoordinates;

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

function callMove(){

	var jsondata = {
		"sender": senderCoordinates,
		"reciever": recieverCoordinates
	}

	$.ajax({
		type: "POST",
		url: URLgetGameState,
		dataType: 'json',
		data:jsondata,
		success: function( data ) {
			loadGameState();
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

			color ="";
			fieldValue = gamestate[x][y];

			var fieldtype;


			if(fieldValue < 0){
				fieldtype = "enemy";
				fieldValue= "";
			}else if(fieldValue < 1){
				fieldtype = "none";
				fieldValue= "";
			}else{
				fieldtype = "player";
			}

			$("#gameField").append('<div class="field ' + fieldtype + '" x="' + x + '" y="' + y +'">' + fieldValue + '</div>');

		};
	};


	$(".field.player")
		.mousedown(function() {
			senderCoordinates = getFieldCoordinates(this);
	 });

	$(".field ")
	.mouseup(function() {
		recieverCoordinates = getFieldCoordinates(this);
		callMove();
	})
}

function getFieldCoordinates(sender){
	var x = $(sender).attr("x");
	var y = $(sender).attr("y");

	var coordinates = {"x":x,"y":y};
	return coordinates;
}

$( document ).ready(function() {
	loadGameState();
});
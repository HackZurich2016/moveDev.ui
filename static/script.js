var gamestate;
var URLApi = "http://localhost:8000"
var URLgetGameState = URLApi + "/game/";

//var URLgetGameState = "http://6fc04216.ngrok.io";

var senderCoordinates;
var recieverCoordinates;
var gameId = "";
var requestUserId = 0;
var afterInit = false;

function loadGameState(){

	$.ajax({
		type: "GET",
		url: URLgetGameState + "?id=" + gameId,
		dataType: 'json',
		beforeSend: function(xhr) {
		 xhr.setRequestHeader(
		    'Authorization', "Bearer " + localStorage.getItem('access_token')
		 )
		},
		success: function( data ) {
			console.log("Gamestate Successful loaded");
			console.log(typeof data.gameState)
			gamestate = JSON.parse(data.gameState);
			gameId = data.gameId;
			requestUserId = data.owner;
			redrawGameField();
			afterInit = true;
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
		url: URLApi + '/game/play/' + "?id=" + gameId,
		beforeSend: function(xhr) {
		 xhr.setRequestHeader(
		    'Authorization', "Bearer " + localStorage.getItem('access_token')
		 )
		},
		dataType: 'json',
		data: jsondata,
		success: function( data ) {
			console.log("Gamestate Successful loaded");
			gamestate = JSON.parse(data.gameState);
			gameId = data.gameId;
			requestUserId = data.owner;
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
	var fieldtype, tile, player_id=0;
    console.log(gamestate)
	for (var x = 0; x_max > x; x++) {
		for (var y = 0; y_max > y; y++) {

			color ="";
			tile = gamestate[x][y];
			fieldValue = tile.value;
			player_id = tile.player_id;

			if(requestUserId!=player_id && player_id!=0){
				fieldtype = "enemy";
				fieldValue= fieldValue*"-1";
			}else if(fieldValue < 1){
				fieldtype = "none";
				fieldValue= "";
			}else{
				fieldtype = "player";
			}

			console.log(fieldtype, fieldValue)

			$("#gameField").append('<div class="field ' + fieldtype + '" x="' + x + '" y="' + y +'">' + fieldValue + '</div>');

		};
	};



	$(".field.player")
		.mousedown(function() {
			senderCoordinates = getFieldCoordinates(this);


			$(".field").on({
			    mouseenter: function () {
			        $(this).css("border-color", "red")
			    },
			    mouseleave: function () {
			        $(this).css("border-color", "black")
			    }
			});
	});

	

	$(".field ")
	.mouseup(function() {
		recieverCoordinates = getFieldCoordinates(this);

		$('.field').off('mouseenter').off('mouseleave');
		
		callMove();
	})
}

function updateGameBoard() {
    if(afterInit){
        $.ajax({
            url: URLApi + '/game/update/' + "?id=" + gameId,
            method: 'GET',
            success: function(data){
                console.log('UPDATE')
                gamestate = JSON.parse(data.gameState);
                redrawGameField();
                if(data.gamefinished) {
                    alert('Game finished congrats!')
                    window.location.reload();
                }
            }
        })
    }
}

function getFieldCoordinates(sender) {
	var x = $(sender).attr("x");
	var y = $(sender).attr("y");

	var coordinates = {"x": x, "y": y};
	return coordinates;
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


function sendInviteMsg(phoneNumber, msg)
{
	var sendURL = "https://api.tropo.com/1.0/sessions?action=create&token=6d674e4953675663776b4a6e416877657170616464564c6948666a4b5050576347667a79614d4b7161494668 &phonenumber=" + phoneNumber + "&msg=" + msg;
	var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", sendURL, false ); // false for synchronous request
    xmlHttp.send( null );
    return true;
}

$( document ).ready(function() {
	loadGameState();
	setInterval(updateGameBoard, 1000)
});
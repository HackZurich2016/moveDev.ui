var gamestate = {
	credits: 12,
	enemyFields:[
	],
	myFields: [
	]

}


$( document ).ready(function() {
 initGameField();
 $(".field")
 	.mouseenter(function() {
    	$( this ).css('background-color', 'red');
  	})
  	.mouseleave(function() {
    	$( this ).css('background-color', '');
  	})
  	.click(function(){
  		fieldClicked(this);
  	});
});



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

function initGameField(){

    var x_max = 10;
    var y_max = 10;
    for (var x = 0; x_max > x; x++) {
    	for (var y = 0; y_max > y; y++) {
        	$("#gameField").append('<div class="field" x="' + x + '" y="' + y +'"></div>');
    	};
	};
}


$( document ).ready(function() {

 initGameField();
});

function initGameField(){

    var x_max = 10;
    var y_max = 10;
    for (var x = 0; x_max > x; x++) {


    for (var y = 0; y_max > y; y++) {
        $("#gameField").append('<div class="field" position="' + x + ";" + y +'"></div>');
    };
};
}
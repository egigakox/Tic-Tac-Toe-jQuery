var currentPlayer = 'x';


//win conditions
let win = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    [0, 4, 8],
    [2, 4, 6]
]

//store player choices
var playerChoice = {
    'x' : [],
    'o' : []
};

let selected = [];

$('.board').on('click', ".square:not('.square-x, .square-o')", function(event) {
    if(!$(".board").hasClass("disabled")) {

    //add class depending on player token
    var $square = $(event.currentTarget);
    $square.addClass('square-'+currentPlayer);

    //push player choice to their array index
    var index = $('.board .square').index($square);
    var playersquares = playerChoice[currentPlayer];
    playersquares.push(index);
    selected.push(index);

    
    $.each(win, function(i, combination) {
        var hasallsquares = true;

        //lose
        $.each(combination , function(i, square) {
            if($.inArray(square, playersquares) === -1) {
                hasallsquares = false;
            }
        });
        //win
        if (hasallsquares) {
            alert(`${currentPlayer} wins!`)
            $(".board").addClass("disabled");
            selected.length = 0;
        }
        //handling draw
        if (!hasallsquares) {
            if(selected.length == 9) {
                alert("It's a draw!");
                selected.length = 0;
            }
        }
    })
    //swap player
    if (currentPlayer === 'x') {
        currentPlayer = 'o';
    } else 
    currentPlayer = 'x'
    
    $('#player').text(`Current player is: ${currentPlayer}`)
}
  });
  
  //clear button
  $('#clear').on('click', function(event) {
      $(".square").removeClass("square-x");
      $(".square").removeClass("square-o");
      playerChoice['x'].length = 0;
      playerChoice['o'].length = 0;
      $(".board").removeClass("disabled");
      $("#player").text("Current player is: none");
      selected.length = 0;
  })
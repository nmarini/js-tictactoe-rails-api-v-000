const WINNING_COMBOS = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6],
                        [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];

var turn = 0;
var currentGame = 0;

$(document).ready(function() {
  attachListeners();
});

function player() {
  if (turn % 2) {
    return "O"
  } else {
    return "X"
  }
}

function updateState(square) {
  var token = player()
  $(square).text(token)
}

function setMessage(string) {
  $("div#message").text(string)
}

function checkWinner() {
  var board = {};
  var winner = false;

  $("td").text(function(index, square) { board[index] => square });

  WINNING_COMBOS.some(function(combo) {
    if (board[combo[0]] !== "" && board[combo[0]] === board[combo[1]] && board[combo[1]] === board[combo[2]]) {
      setMessage(`Player ${board[combo[0]]} Won!`);
      return winner = true;
    }
  });


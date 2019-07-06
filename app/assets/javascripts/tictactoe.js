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

  $('td').text((index, square) => board[index] = square);

  WINNING_COMBOS.some(function(combo) {
    if (board[combo[0]] !== "" && board[combo[0]] === board[combo[1]] && board[combo[1]] === board[combo[2]]) {
      setMessage(`Player ${board[combo[0]]} Won!`);
      return winner = true;
    }
  });
  return winner;
}

function doTurn(square) {
  updateState(square);
  turn++;

  if (checkWinner()) {
  // resetGame() -- resets board and turn
    saveGame();
    resetGame();
  } else if (turn === 9) {
    setMessage("Tie game.");
    saveGame();
    resetGame();
  }

}

function resetGame() {
  turn = 0;
  $('td').empty();
  currentGame = 0;
}

function saveGame() {
  var state = [];
  var gameData;

  $('td').text((index, square) => {
    state.push(square)
  });

  gameData = { state: state };

  if (currentGame) {
    $.ajax({
      url: `/games/${currentGame}`,
      type: 'PATCH',
      data: gameData
    })
  } else {
    $.post(`/games`, gameData, function(game) {
      currentGame = game.data.id;
      $('#games').append(`<button id="gameid-${game.data.id}">${game.data.id}</button><br>`)
      $(`gameid-` + game.data.id).on('click', () => reloadGame(game.data.id));
    });
  }
}
// CREATE reloadGame() THAT RELOADS THE GAME OF THE GAME_ID THAT IS PASSED THROUGH

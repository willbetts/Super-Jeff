j = 10;
let modal = document.createElement('div');
modal.id = "start-modal";
document.body.append(modal);
function start() {
  document.getElementById('start-modal').innerHTML = "<div id='game-will-start'>Collect as many coins before time runs out<br>Use the arrow keys to move around and jump <br/> Game will start in..." + `${j}</div>`;
  j--;
  if (j < 0) {
    document.getElementById('start-modal').remove();
    onTimer();

  }
  else {
    setTimeout(start, 1000);
  }
}

start();

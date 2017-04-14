i = 60;
function onTimer() {
  document.getElementById('my-counter').innerHTML = i;
  i--;
  if (i < 0) {
        let modal = document.createElement('div');
        modal.id = "modal";
        modal.innerHTML = "<a class='link' href=> Game over. Click to play again</a>"
        document.getElementById('fg-canvas').replaceWith(modal);
  }
  else {
    setTimeout(onTimer, 1000);
  }
}

let Game = {
  init: function () {
    let bgCanvas = document.getElementById("bg-canvas");
    let fgCanvas = document.getElementById("fg-canvas");

    const canvas = {
      bgCanvas: bgCanvas,
      fgCanvas: fgCanvas,
      bgCtx: bgCanvas.getContext("2d"),
      fgCtx: fgCanvas.getContext("2d")
    };

    const backgroundMusic = new Audio("audio/underground_theme.mp3");
    backgroundMusic.loop = true;

    const spriteSheet = new Image();
    spriteSheet.src = "img/sprite_sheet.png";

    spriteSheet.addEventListener("load", function () {
      const spriteSheet = this;

      let data = {
        animationFrame: 0,
        spriteSheet: spriteSheet,
        canvas: canvas
      };

      backgroundMusic.play();

      Input.init(data);
      Entities.init(data);
      Render.init(data);
      Game.run(data);

    });
  },

  run: function (data) {
    let loop = function() {
      Game.input(data);
      Game.update(data);
      Game.render(data);

      data.animationFrame++;

      window.requestAnimationFrame(loop);
    };

    loop();
  },

  input: function (data) {
    Input.update(data);
  },

  update: function(data) {
    Animation.update(data);
    Movement.update(data);
    Physics.update(data);
  },

  render: function (data) {
    Render.update(data);
  }
};

Game.init();

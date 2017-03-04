let Input = {
  init: function (data) {
    let self = this;

    $(window).on("keydown", function (event) {
      self.helpers.down[event.keyCode] = true;
    });

    $(window).on("keyup", function () {
      delete self.helpers.down[event.keyCode];
      delete self.helpers.pressed[event.keyCode];
    });
  },

  update: function (data) {
    let jeff = data.entities.jeff;

    if (Input.helpers.isDown(37)) {
      if (jeff.velY === 0) {
          jeff.currentState = jeff.states.walking;
      } else {
        jeff.x -= jeff.velX;
      }

      jeff.direction = "left";
    }

    if (Input.helpers.isDown(39)) {
      if (jeff.velY === 0) {
          jeff.currentState = jeff.states.walking;
      } else {
        jeff.x += jeff.velX;
      }
      jeff.direction = "right";
    }


    if (Input.helpers.isPressed(38)) {
        jeff.currentState = jeff.states.jumping;
    }
  },

  helpers: {
      isDown: function (code) {
        return Input.helpers.down[code];
      },

      isPressed: function (code) {
        if (Input.helpers.pressed[code]) {
          return false;
        } else if (Input.helpers.down[code]) {
           return Input.helpers.pressed[code] = true;
        }

        return false;
      },

      down: {},
      pressed: {}
  }
};

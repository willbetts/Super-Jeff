let Physics = {
  update: function (data) {
    Physics.helpers.gravity(data.entities.jeff);
    Physics.collisionDetection(data);
  },

  collisionDetection: function (data) {
    let jeff = data.entities.jeff;

    let entityCollisionCheck = function (entity) {
      if (jeff.x < entity.x + entity.w &&
          jeff.x + jeff.w > entity.x &&
          jeff.y < entity.y + entity.h &&
          jeff.y + jeff.h > entity.y) {
          Physics.handleCollision(data, entity);
      }
    };

    data.entities.wallsArray.forEach(function (wall) {
      entityCollisionCheck(wall);
    });

    data.entities.coinsArray.forEach(function (coin) {
      entityCollisionCheck(coin);
    });

    entityCollisionCheck(data.entities.exitPipe);

  },

  handleCollision: function (data, entity) {
    let jeff = data.entities.jeff;

    if (entity.type === "wall") {
      if (jeff.x < entity.x && jeff.y >= entity.y) {
          jeff.x = entity.x - jeff.w;
      }

      if (jeff.x > entity.x && jeff.y >= entity.y){
          jeff.x = entity.x + entity.w;
      }

      if (jeff.y < entity.y && (jeff.x + jeff.w) > entity.x + 10 &&
          jeff.x < (entity.x + entity.w) - 10 && jeff.velY >= 0) {
          jeff.currentState = jeff.states.standing;
          jeff.y = entity.y - jeff.h;
          jeff.velY = 0;
      }
    }

    if (entity.type === "coin") {
        let coinsArray = data.entities.coinsArray;
        const coinSound = entity.sound.cloneNode();
        let index = coinsArray.indexOf(entity);

        data.entities.score.value += 1;

        coinSound.play();

        coinsArray.splice(index, 1);
    }

    if (entity.type === "exitPipe") {

        if (jeff.x < entity.x && jeff.y >= entity.y) {
          if (jeff.velY === 0) {
            jeff.x += 200;
          } else {
              jeff.x = entity.x - jeff.w;
          }
        }

        if (jeff.x > entity.x && jeff.y > entity.y) {
          jeff.x = entity.x - entity.w + jeff.w;
        }
    }

    if (jeff.y < entity.y && (jeff.x + jeff.w) > entity.x + 10 &&
        jeff.x < (entity.x + entity.w) - 10 && jeff.velY >= 0) {
        jeff.currentState = jeff.states.standing;
        jeff.y = entity.y - jeff.h;
        jeff.velY = 0;
    }
  },

  helpers: {
    gravity: function (entity) {
      entity.velY += 1.2;
      entity.y += entity.velY;
    }
  }
};

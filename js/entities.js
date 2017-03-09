const Entities = {
  init: function(data) {
      let background = {
        sprite: new Entities.helpers.Sprite(data.spriteSheet, 0, 35, 256, 200),
        x: 0,
        y: 0,
        w: 768,
        h: 600
      };

      let jeff = new Entities.helpers.jeff(data.spriteSheet, 60, 0, 64, 64);

      let exitPipe = new Entities.helpers.ExitPipe(624, 432, 144, 168);

      let score = new Entities.helpers.Score(290, 70);

      let wallLocations = [[0,0,48,600], [0,528,768,72], [192,384,336,216], [726, 0, 42, 600]];

      let coinLocations = [[249, 150], [297, 150], [345, 150], [393, 150], [441, 150],
                           [201, 246], [249, 246], [297, 246], [345, 246], [393, 246], [441, 246], [489, 246],
                           [201, 342], [249, 342], [297, 342], [345, 342], [393, 342], [441, 342], [489, 342]];

      data.entities = {};
      data.entities.background = background;
      data.entities.score = score;
      data.entities.jeff = jeff;
      data.entities.exitPipe = exitPipe;
      data.entities.wallsArray = [];
      data.entities.coinsArray = [];


      var randomCoinLocation = () => {
        let minX = 50;
        let maxX = 700;
        let x = Math.random() * (maxX - minX) + minX;
        let minY = 150;
        let maxY = 350;
        let y = Math.random () * (maxY - minY) + minY;
        return data.entities.coinsArray.push(new Entities.helpers.Coin(data.spriteSheet, x, y, 30, 42));
      };

      generateRandomCoin = function() {
        setInterval(randomCoinLocation, 200);
      };

      wallLocations.forEach(function (location) {
        data.entities.wallsArray.push( new Entities.helpers.Wall(location[0], location[1], location[2], location[3]));
      });

      data.entities.generateRandomCoin = setTimeout(generateRandomCoin, 10000);
  },

  helpers: {
    Sprite: function (img, srcX, srcY, srcW, srcH) {
      this.img = img;
      this.srcX = srcX;
      this.srcY = srcY;
      this.srcW = srcW;
      this.srcH = srcH;
    },

    jeff: function (img, x, y, w, h) {
      const self = this;

      this.jumpSound = new Audio("audio/jeff_jump.mp3");
      this.sprite = new Entities.helpers.Sprite(img, 0, 0, 16, 16);
      this.spriteAnimations = {
        walkRight: {
          frames: [new Entities.helpers.Sprite(img, 16, 0, 16, 16),
                   new Entities.helpers.Sprite(img, 32, 0, 16, 16),
                   new Entities.helpers.Sprite(img, 48, 0, 16, 16)],
          currentFrame: 0,
        },
        walkLeft: {
          frames: [new Entities.helpers.Sprite(img, 34, 18, 16, 16),
                   new Entities.helpers.Sprite(img, 18, 18, 16, 16),
                   new Entities.helpers.Sprite(img, 2, 18, 16, 16)],
          currentFrame: 0
        },
        standRight: new Entities.helpers.Sprite(img, 0, 0, 16, 16),
        standLeft: new Entities.helpers.Sprite(img, 50, 18, 16, 16),
        jumpLeft: new Entities.helpers.Sprite(img, 67, 18, 16, 16),
        jumpRight: new Entities.helpers.Sprite(img, 67, 0, 16, 16)
      };
      this.states = {
        jumping: {
          movement: function (data) {
            if (self.velY === 0) {
              const jumpSound = self.jumpSound.cloneNode();
              jumpSound.play();
              self.velY -= 23;
            }
          },

          animation: function (data) {
            if (self.direction === "right"){
                self.sprite = self.spriteAnimations.jumpRight;
            } else {
              self.sprite = self.spriteAnimations.jumpLeft;
            }
          }
        },
        walking: {
          movement: function (data) {
            if (self.direction === "right") {
                self.x += self.velX;
            } else {
              self.x -= self.velX;
            }
          },

          animation: function (data) {
            if (self.direction === "right") {
              if (data.animationFrame % 5 === 0) {
                  self.sprite = self.spriteAnimations.walkRight.frames[self.spriteAnimations.walkRight.currentFrame];
                  self.spriteAnimations.walkRight.currentFrame++;

                  if (self.spriteAnimations.walkRight.currentFrame > 2) {
                      self.spriteAnimations.walkRight.currentFrame = 0;
                    }
              }
            } else {
              if (data.animationFrame % 5 === 0) {
                  self.sprite = self.spriteAnimations.walkLeft.frames[self.spriteAnimations.walkLeft.currentFrame];
                  self.spriteAnimations.walkLeft.currentFrame++;

                  if (self.spriteAnimations.walkLeft.currentFrame > 2) {
                      self.spriteAnimations.walkLeft.currentFrame = 0;
                    }
              }
            }
          }
        },
        standing: {
          movement: function (data) {
            return;
          },

          animation: function (data) {
            if (self.direction === "right"){
                self.sprite = self.spriteAnimations.standRight;
            } else {
              self.sprite = self.spriteAnimations.standLeft;
            }
          }
        }
      };
      this.currentState = self.states.standing;
      this.direction ="right";
      this.velY = 0;
      this.velX = 3.8;
      this.coins = 0;
      this.x = x;
      this.y = y;
      this.w = w;
      this.h = h;
    },

    Coin: function (img, x, y, w, h) {

      let self = this;
      this.type = "coin";
      this.sound = new Audio("audio/jeff_coin.mp3");
      this.sprite = new Entities.helpers.Sprite(img, 99, 0, 10, 14);
      this.spriteAnimations = {
        spin: {
          frames: [ new Entities.helpers.Sprite(img, 99, 0, 10, 14),
                   new Entities.helpers.Sprite(img, 115, 0, 10, 14),
                   new Entities.helpers.Sprite(img, 131, 0, 10, 14),
                   new Entities.helpers.Sprite(img, 147, 0, 10, 14)],
          currentFrame: 0
        }
      };
      this.states = {
        spinning: {
          animation: function (data) {
            if (data.animationFrame % 13 === 0) {
              self.sprite = self.spriteAnimations.spin.frames[self.spriteAnimations.spin.currentFrame];
              self.spriteAnimations.spin.currentFrame++;

              if (self.spriteAnimations.spin.currentFrame > 3) {
                self.spriteAnimations.spin.currentFrame = 0;
              }
            }
          }
        }
      };
      this.currentState = self.states.spinning;
      this.x = x;
      this.y = y;
      this.w = w;
      this.h = h;
    },

    Wall: function (x, y, w, h) {
      this.type="wall";
      this.x = x;
      this.y = y;
      this.w = w;
      this.h = h;
    },

    ExitPipe: function (x, y, w, h) {
      this.type="exitPipe";
      this.x = x;
      this.y = y;
      this.w = w;
      this.h = h;
    },

    Score: function (x,y) {
      this.value = 0;
      this.x = x;
      this.y = y;
      this.size = "25px";
      this.font = "PixelEmulator";
      this.color = "white";
    }
  }
};

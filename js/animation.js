let Animation = {
  update: function (data) {
    Animation.jeff(data);
    Animation.coins(data);
  },

  jeff: function (data) {
    data.entities.jeff.currentState.animation(data);
  },

  coins: function (data) {
    data.entities.coinsArray.forEach(function (coin) {
      coin.currentState.animation(data);
    });
  }
};

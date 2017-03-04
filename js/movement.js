let Movement = {
  update: function (data) {
    Movement.jeff(data);
  },

  jeff: function (data) {
    data.entities.jeff.currentState.movement(data);
  }
};

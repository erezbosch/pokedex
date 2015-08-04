Pokedex.Views.PokemonForm = Backbone.View.extend({
  template: JST['pokemonForm'],

  render: function () {
    this.$el.html(this.template({ pokemon: this.model }));
    return this;
  },
});

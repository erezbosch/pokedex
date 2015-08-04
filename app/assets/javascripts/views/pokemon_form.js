Pokedex.Views.PokemonForm = Backbone.View.extend({
  template: JST['pokemonForm'],

  events: {
    "submit form": "savePokemon"
  },

  render: function () {
    this.$el.html(this.template({ pokemon: this.model }));
    return this;
  },

  savePokemon: function (e) {
    e.preventDefault();
    var pokeData = $(e.currentTarget).serializeJSON().pokemon;
    this.model.save(pokeData, { success: function () {
      this.collection.add(this.model);
      Backbone.history.navigate('pokemon/' + this.model.id);
      this.model = new Pokedex.Models.Pokemon();
      this.render();
    }.bind(this)});
  },
});

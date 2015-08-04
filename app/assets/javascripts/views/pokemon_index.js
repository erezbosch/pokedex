Pokedex.Views.PokemonIndex = Backbone.View.extend({
  initialize: function () {
    this.collection = new Pokedex.Collections.Pokemon();
    this.listenTo(this.collection, "sync", this.render);
    this.listenTo(this.collection, "add", this.addPokemonToList);
  },

  events: {
    "click li": "selectPokemonFromList"
  },

  selectPokemonFromList: function (e) {
    var targetPoke = this.collection.get($(e.currentTarget).data('id'));
    var detail = new Pokedex.Views.PokemonDetail({ model: targetPoke });
    targetPoke.fetch();
    $("#pokedex .pokemon-detail").html(detail.$el);
  },

  render: function () {
    this.$el.empty();
    this.collection.each(function(poke) {
      this.addPokemonToList(poke);
    }.bind(this));
  },

  addPokemonToList: function (poke) {
    this.$el.append(JST["pokemonListItem"]({ pokemon: poke }));
  },

  refreshPokemon: function () {
    this.collection.fetch();
  }
});

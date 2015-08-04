Pokedex.Routers.Router = Backbone.Router.extend({
  routes: {
    "": "pokemonIndex",
    "pokemon/:id": "pokemonDetail",
  },

  pokemonIndex: function (callback) {
    this._pokemonIndex = new Pokedex.Views.PokemonIndex();
    this._pokemonIndex.refreshPokemon(callback);
    $('#pokedex .pokemon-list').html(this._pokemonIndex.$el);
  },

  pokemonDetail: function (id) {
    if (!this._pokemonIndex) {
      this.pokemonIndex(function () { this.pokemonDetail(id); }.bind(this));
      return;
    }
    var targetPoke = this._pokemonIndex.collection.get(id);
    var detail = new Pokedex.Views.PokemonDetail({ model: targetPoke });
    targetPoke.fetch();
    $("#pokedex .pokemon-detail").html(detail.$el);
  },
});

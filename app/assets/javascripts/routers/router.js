Pokedex.Routers.Router = Backbone.Router.extend({
  routes: {
    "": "pokemonIndex",
    "pokemon/:pokeId/toys/:toyId": "toyDetail",
    "pokemon/:id": "pokemonDetail",
  },

  pokemonIndex: function (callback) {
    this._pokemonIndex = new Pokedex.Views.PokemonIndex();
    this._pokemonIndex.refreshPokemon(callback);
    $('#pokedex .pokemon-list').html(this._pokemonIndex.$el);
    this.pokemonForm();
  },

  pokemonDetail: function (id, callback) {
    if (!this._pokemonIndex) {
      this.pokemonIndex(function () {
        this.pokemonDetail(id, callback);
      }.bind(this));
      return;
    }
    var poke = this._pokemonIndex.collection.get(id);
    this._pokemonDetail = new Pokedex.Views.PokemonDetail({ model: poke });
    poke.fetch({success: callback});
    $("#pokedex .pokemon-detail").html(this._pokemonDetail.$el);
  },

  toyDetail: function (pokeId, toyId) {
    if (!this._pokemonDetail) {
      this.pokemonDetail(pokeId, function () {
        this.toyDetail("", toyId);
      }.bind(this));
      return;
    }
    var toy = this._pokemonDetail.model.toys().get(toyId);
    var toyDetail = new Pokedex.Views.ToyDetail({
      model: toy,
      collection: this._pokemonIndex.collection
    });
    toyDetail.render();
    $("#pokedex .toy-detail").html(toyDetail.$el);
  },

  pokemonForm: function () {
    var formView = new Pokedex.Views.PokemonForm({
      model: new Pokedex.Models.Pokemon(),
      collection: this._pokemonIndex.collection,
    });
    formView.render();
    $('#pokedex .pokemon-form').html(formView.$el);
  },
});

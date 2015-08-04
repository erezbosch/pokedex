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
    var id = $(e.currentTarget).data('id');
    Backbone.history.navigate('pokemon/' + id, { trigger: true });
  },

  render: function () {
    console.log(this.$el)
    this.$el.empty();
    this.collection.each(function(poke) {
      this.addPokemonToList(poke);
    }.bind(this));
  },

  addPokemonToList: function (poke) {
    this.$el.append(JST["pokemonListItem"]({ pokemon: poke }));
  },

  refreshPokemon: function (callback) {
    this.collection.fetch({ success: callback });
  },
});

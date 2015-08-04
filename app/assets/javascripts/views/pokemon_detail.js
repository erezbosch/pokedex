Pokedex.Views.PokemonDetail = Backbone.View.extend({
  template: JST['pokemonDetail'],

  events: {
    "click li": "selectToyFromList"
  },

  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
  },

  render: function () {
    this.$el.html(this.template({ pokemon: this.model }));

    this.model.toys().each(function (toy) {
      this.$('ul.toys').append(JST['toyListItem']({ toy: toy }));
    }.bind(this));
  },

  selectToyFromList: function (e) {
    var toyId = $(e.currentTarget).data('toy-id');
    var pokeId = $(e.currentTarget).data('pokemon-id');
    Backbone.history.navigate(
      '/pokemon/' + pokeId + '/toys/' + toyId,
      { trigger: true }
    );
  },
});

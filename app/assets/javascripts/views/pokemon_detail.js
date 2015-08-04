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
    var toy = this.model.toys().get($(e.currentTarget).data('toy-id'));
    var detail = new Pokedex.Views.ToyDetail({ model: toy });
    detail.render();
    $("#pokedex .toy-detail").html(detail.$el);
  },
});

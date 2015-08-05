Pokedex.Views.ToyDetail = Backbone.View.extend({
  template: JST['toyDetail'],

  events: {
    "change select.reassign": "reassignToy"
  },

  initialize: function (options) {
    this.pokemonDetail = options.pokemonDetail;
  },

  render: function () {
    this.$el.html(this.template({ toy: this.model, pokes: this.collection }));
  },

  reassignToy: function (e) {
    var $select = $(e.currentTarget);

    var oldOwner = this.collection.get($select.data("pokemon-id"));

    this.model.set("pokemon_id", $select.val());
    this.model.save({}, { success: function () {
      oldOwner.toys().remove(this.model);
      this.pokemonDetail.render();
      this.$el.empty();
      Backbone.history.navigate(
        '/pokemon/' + $select.val() + '/toys/' + this.model.id
      );
    }.bind(this) });
  },
});

Pokedex.Models.Pokemon = Backbone.Model.extend({
  urlRoot: 'pokemon',

  parse: function (payload) {
    if (payload.toys) {
      this.toys().set(payload.toys);
      delete payload.toys;
    }

    return payload;
  },

  toys: function () {
    if (this._toys === undefined) {
      this._toys = new Pokedex.Collections.Toys();
      this._toys.url = this.url() + '/toys';
    }

    return this._toys;
  }
});

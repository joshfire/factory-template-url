var App = Backbone.Model.extend({
});

var Apps = Backbone.Collection.extend({
  model: App,
  localStorage: new Backbone.LocalStorage('Apps')
});

var apps = new Apps();


var AppListView = Backbone.View.extend({
  events: {
    'click .close': 'onClickClose'
  },

  initialize: function() {
    this.collection.on('all', _.bind(this.render, this));
  },

  render: function() {
    this.$el.html('');

    this.collection.each(_.bind(function(model) {
      this.$el.append('<li><button class="close" data-app-id="' + model.id +
        '">&times;</button><a href="' + model.get('url') +
        '">' + model.get('name') + '</a></li>');
    }, this));
  },

  onClickClose: function(event) {
    var appId = $(event.target).data('app-id');

    apps.get(appId).destroy();
  }
});

var NewAppView = Backbone.View.extend({
  events: {
    'submit': 'onSubmit'
  },

  onSubmit: function(event) {
    event.preventDefault();

    var url = $('#new-app-url').val();

    apps.create({
      name: $('#new-app-name').val(),
      url: url
    });

    $('#new-app-name').val('');
    $('#new-app-url').val('http://');


    $('#alert').html('<div class="alert fade in"><button class="close"' +
      'data-dismiss="alert">&times;</button><p>Application added.</p><p>' +
      '<a href="' + url + '" class="btn">View it now</a></p></div>');
  }
});

$(function() {
  (new AppListView({
    el: '#app-list',
    collection: apps
  })).render();

  new NewAppView({
    el: '#new-app'
  });

  apps.fetch();
});

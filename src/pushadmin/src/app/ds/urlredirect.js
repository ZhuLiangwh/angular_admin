define(['./DataSource'], function(DataSource) {
  var basePath = 'urlredirect';

  var UrlredirectDS = DataSource.ext({
    list: function(params) {
      return this._load(basePath + '/list', {
        params: params
      });
    },
    add: function(params) {
      return this._update(basePath + '/add', {
        data: params
      });
    },
    edit: function(params) {
      return this._load(basePath + '/edit', {
        params: params
      });
    },
    update: function(params) {
      return this._update(basePath + '/update', {
        data: params
      });
    },
    upload: function(params) {
      return this._update(basePath + '/online', {
        data: params
      });
    },
    delete: function(params) {
      return this._update(basePath + '/offline', {
        data: params
      });
    }
  });
  return {
    __register__: function(mod) {
      mod.service('ds.urlredirect',UrlredirectDS);
      return mod;
    }
  };
})

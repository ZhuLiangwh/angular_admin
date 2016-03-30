define(['./DataSource'], function(DataSource) {
  var basePath = '/rule/v1/source';

  var AossourceDS = DataSource.ext({
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
    delete: function(params) {
      return this._update(basePath + '/delete', {
        data: params
      });
    }
  });
  return {
    __register__: function(mod) {
      mod.service('ds.aossource', AossourceDS);
      return mod;
    }
  };
})

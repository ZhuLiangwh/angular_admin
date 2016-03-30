define(['./DataSource'], function(DataSource) {
  var basePath = '/square/v1/category';

  var CategoryDS = DataSource.ext({
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
      return this._update(basePath + '/upload', {
        data: params
      });
    },
    delete: function(params) {
      return this._update(basePath + '/delete', {
        data: params
      });
    },
    getDisplayData: function() {
      return this._load(basePath + '/getDisplayData', {
        isModelData: false
      });
    }
  });
  return {
    __register__: function(mod) {
      mod.service('ds.category', CategoryDS);
      return mod;
    }
  };
})

define(['./DataSource'], function(DataSource) {
  var basePath = 'dolphinwidgeturl';

  var DolphinwidgeturlDS = DataSource.ext({
    list: function(params) {
      return this._load(basePath + '/list', {
        params: params
      });
    },
    add: function(params) {
      return this._update(basePath + '/add', {
        data:params,
        transformRequest: angular.identity,
        headers: {
          'Content-Type': undefined
        }
      });
    },
    edit: function(params) {
      return this._load(basePath + '/edit', {
        params: params
      });
    },
    update: function(params) {
      return this._update(basePath + '/update', {
        data:params,
        transformRequest: angular.identity,
        headers: {
          'Content-Type': undefined
        }
      });
    },
    delete: function(params) {
      return this._update(basePath + '/offline', {
        data: params
      });
    },
    delLocal: function(params) {
      return this._update(basePath + '/delete', {
        data: params
      });
    },
    upload: function(params) {
      return this._update(basePath + '/online', {
        data: params
      });
    },
    addCheckunique: function(params) {
      return this._update(basePath + '/check_unique', {
        data: params
      });
    }
  });
  return {
    __register__: function(mod) {
      mod.service('ds.dolphinwidgeturl', DolphinwidgeturlDS);
      return mod;
    }
  };
})

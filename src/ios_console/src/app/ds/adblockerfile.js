define(['./DataSource'], function(DataSource) {
  var basePath = 'adblockerfile';

  var AdblockerfileDS = DataSource.ext({
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
      return this._load(basePath + '/edit/' + params.id);
    },
    update: function(params) {
      return this._update(basePath + '/update' ,{
        data: params,
        transformRequest: angular.identity,
        headers: {
          'Content-Type': undefined
        }
      });
    },
    delete: function(params) {
      return this._update(basePath + '/delete', {
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
      mod.service('ds.adblockerfile', AdblockerfileDS);
      return mod;
    }
  };
})

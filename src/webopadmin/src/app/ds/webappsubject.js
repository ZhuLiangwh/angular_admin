define(['./DataSource'], function(DataSource) {
  var basePath = 'webappsubject';

  var WebappSubjectDS = DataSource.ext({
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
      return this._update(basePath + '/offline', {
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
      mod.service('ds.webappsubject', WebappSubjectDS);
      return mod;
    }
  };
})

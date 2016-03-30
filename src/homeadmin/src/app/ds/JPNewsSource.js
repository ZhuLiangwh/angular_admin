define(['./DataSource'], function(DataSource) {
  var basePath = 'JPNewsSource';

  var JPNewsSourceDS = DataSource.ext({
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
      return this._load(basePath + '/edit/' + params.id);
    },
    update: function(data) {
      return this._update(basePath + '/update/'+ data.id,{data: data});
    },
    delete: function(params) {
      return this._update(basePath + '/delete', {
        data: params
      });
    }
  });
  return {
    __register__: function(mod) {
      mod.service('ds.JPNewsSource', JPNewsSourceDS);
      return mod;
    }
  };
})

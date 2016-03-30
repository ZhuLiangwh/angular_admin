define(['./DataSource'], function(DataSource) {
  var basePath = '/rule/v1/package';

  var AospackageDS = DataSource.ext({
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
    },
    getDisplayData: function() {
      return this._load(basePath + '/getDisplayData', {
        isModelData: false
      });
    }
  });

  function convertFormData(params){
    var fd = new FormData(),
        value;
    for(var key in params){
      value = params[key];
      if(_.isArray(value)){
        value = JSON.stringify(value);
      }
      fd.append(key, value);
    }
    return fd;
  }
  return {
    __register__: function(mod) {
      mod.service('ds.aospackage', AospackageDS);
      return mod;
    }
  };
})

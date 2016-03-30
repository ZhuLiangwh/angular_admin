define(['./DataSource'], function(DataSource) {
  var basePath = '/resource/v1/icon';

  var IconDS = DataSource.ext({
    list: function(params) {
      return this._load(basePath + '/list', {
        params: params
      });
    },
    add: function(params) {
      return this._update(basePath + '/add', {
        data: convertFormData(params),
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
        data: convertFormData(params),
        transformRequest: angular.identity,
        headers: {
          'Content-Type': undefined
        }
      });
    },
    delete: function(data) {
      return this._update(basePath + '/delete', {
        data: data
      });
    },
    upload: function(data) {
      return this._update(basePath + '/upload', {
        data: data
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
      mod.service('ds.icon', IconDS);
      return mod;
    }
  };
})

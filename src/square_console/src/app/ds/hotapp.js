define(['./DataSource'], function(DataSource) {
  var basePath = '/square/v1/hotfaq';


  var HotappDS = DataSource.ext({
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
    upload: function(params) {
      return this._update(basePath + '/upload', {
        data: params
      });
    },
    export:function(params){
        return this._load(basePath + '/export', {
            params: params
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
      mod.service('ds.hotapp', HotappDS);
      return mod;
    }
  };
})

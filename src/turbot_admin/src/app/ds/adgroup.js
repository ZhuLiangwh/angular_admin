define(['./DataSource'], function(DataSource) {
  var basePath = 'adgroup';

  var AdgroupDS = DataSource.ext({
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
      return this._update(basePath + '/update', {data: data});
      // return this._update(basePath + '/update/'+ data.id,{data: data});
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
    }
  });
  return {
    __register__: function(mod) {
      mod.service('ds.adgroup', AdgroupDS);
      return mod;
    }
  };
})

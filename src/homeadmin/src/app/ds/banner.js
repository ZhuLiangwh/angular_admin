define(['./DataSource'], function(DataSource) {
  var basePath = 'banner';

  var BannerDS = DataSource.ext({
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
    },
    upload: function(params) {
      return this._update(basePath + '/upload', {
        data: params
      });
    },
    submit: function(params) {
      return this._update('/auth/homepage/banner/submit', {
        data: params
      });
    },
    passCheck: function(data){
      console.log(data)
      return this._update('/auth/homepage/banner/check/' + data.id,{
        data: data
      });
    }
  });
  return {
    __register__: function(mod) {
      mod.service('ds.banner', BannerDS);
      return mod;
    }
  };
})

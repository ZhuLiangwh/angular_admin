define(['./DataSource'], function(DataSource) {
  var basePath = 'notice';

  var NoticeDS = DataSource.ext({
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
    addCheckunique: function(params) {
      return this._update(basePath + '/check_unique', {
        data: params
      });
    }
  });
  return {
    __register__: function(mod) {
      mod.service('ds.notice', NoticeDS);
      return mod;
    }
  };
})

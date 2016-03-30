define(['./DataSource'], function(DataSource) {
  var basePath = 'aospredata';

  var AxportpresetDS = DataSource.ext({
    getData: function(params) {
      return this._load(basePath + '/byrule', {
        params: params
      });
    }
  });
  return {
    __register__: function(mod) {
      mod.service('ds.exportpreset', AxportpresetDS);
      return mod;
    }
  };
})

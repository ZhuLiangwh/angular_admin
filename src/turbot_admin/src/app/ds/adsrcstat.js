define(['./DataSource'], function(DataSource) {
    var basePath = 'adsrcstat';

    var AdsrcstatDS = DataSource.ext({
        getData: function(params) {
            return this._load(basePath, {
                params: params
            });
        }
    });
    return {
        __register__: function(mod) {
            mod.service('ds.adsrcstat', AdsrcstatDS);
            return mod;
        }
    };
});

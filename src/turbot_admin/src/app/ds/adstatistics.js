define(['./DataSource'], function(DataSource) {
    var basePath = 'adpush/adsrcstat';

    var AdstatisticsDS = DataSource.ext({
        getData: function(params) {
            return this._load(basePath, {
                params: params
            });
        }
    });
    return {
        __register__: function(mod) {
            mod.service('ds.adstatistics', AdstatisticsDS);
            return mod;
        }
    };
});

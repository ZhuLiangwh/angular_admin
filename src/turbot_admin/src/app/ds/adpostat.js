define(['./DataSource'], function(DataSource) {
    var basePath = 'adpostat';

    var AdpostatDS = DataSource.ext({
        getData: function(params) {
            return this._load(basePath, {
                params: params
            });
        }
    });
    return {
        __register__: function(mod) {
            mod.service('ds.adpostat', AdpostatDS);
            return mod;
        }
    };
});

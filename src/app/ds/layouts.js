define(['./DataSource'], function (DataSource) {
    var basePath = '';

    var UserSettingDS = DataSource.ext({
        changepassword: function (params) {
            return this._update(basePath + '/changepwd', {
                data: params
            });
        }
    });
    return {
        __register__: function (mod) {
            mod.service('ds.usersetting', UserSettingDS);
            return mod;
        }
    };
})

define(['./authenticator', './session', './permissions', './login','./init','./auth.config', './cache', 'common/utils/registerToModule'], function (authenticator, session, permissions, LoginCtrl, InitCtrl, authConfig, cache, rtm) {
    var authModName = 'app.auth',
        mod = angular.module(authModName, []);
    rtm(authenticator, session, permissions, LoginCtrl, InitCtrl, cache)(mod);
    authConfig(mod);
    return authModName;
})

define([
    './usermanagement.config',
    './userlist',
    './useredit',
    './createuser',
    './userpermission',
    './actionlog',
    './rolemanagement',
    './rolepermission',
    './roleuserlist',
    './role',
    './userlog',
    'common/utils/registerToModule',
], function(usermanagementConfig, userlist, useredit, createuser, userpermission, actionlog,rolemanagement,rolepermission,roleuserlist, role, userlog, rtm){
    var modName = 'app.usermanagement',
        mod = angular.module(modName, []);
    rtm(userlist, useredit, createuser, userpermission, actionlog, rolemanagement, rolepermission, roleuserlist,role, userlog)(mod);
    usermanagementConfig(mod);
    return modName;
})
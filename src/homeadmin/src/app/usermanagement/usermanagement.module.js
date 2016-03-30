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
    'common/utils/registerToModule',
], function(usermanagementConfig, userlist, useredit, createuser, userpermission, actionlog,rolemanagement,rolepermission,roleuserlist, role, rtm){
    var modName = 'app.usermanagement',
        mod = angular.module(modName, []);
    rtm(userlist, useredit, createuser, userpermission, actionlog, rolemanagement, rolepermission, roleuserlist,role)(mod);
    usermanagementConfig(mod);
    return modName;
})
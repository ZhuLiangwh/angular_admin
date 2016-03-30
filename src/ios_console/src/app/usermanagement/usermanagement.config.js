define([], function() {
    return function config(mod) {
        mod.config(['$stateProvider', '$urlRouterProvider',
            function($stateProvider, $urlRouterProvider) {
                // for any unmatched url, redirect to 'translation-tool.translation'
                //$urlRouterProvider.otherwise("/auth/userlist");

                $stateProvider
                    .state('auth', {
                        abstract: true,
                        url: '/auth',
                        template: '<ui-view/>',
                        data: {
                            action: ['list']
                        }
                    })
                    .state('auth.user', {
                        url: '/user',
                        templateUrl: 'app/usermanagement/userlist.html',
                        data: {
                            model: 'user'
                        },
                        controller: 'UserlistCtrl'
                    })
                    .state('auth.useredit', {
                        url: '/useredit/:userid',
                        templateUrl: 'app/usermanagement/useredit.html',
                        data: {
                            model: 'user'
                        },
                        controller: 'UsereditCtrl'
                    })
                    .state('auth.createuser', {
                        url: '/createuser',
                        templateUrl: 'app/usermanagement/createuser.html',
                        data: {
                            model: 'user'
                        },
                        controller: 'CreateuserCtrl'
                    })
                    .state('auth.userpermission', {
                        url: '/userpermission/:userid',
                        templateUrl: 'app/usermanagement/userpermission.html',
                        data: {
                            model: 'user'
                        },
                        controller: 'UserpermissionCtrl'
                    })
                    .state('auth.actionlog', {
                        url: '/actionlog',
                        templateUrl: 'app/usermanagement/actionlog.html',
                        data: {
                            model: 'user'
                        },
                        controller: 'ActionLogCtrl'
                    })
                    .state('auth.roleuserlist', {
                        url: '/roleuserlist/:roleid',
                        templateUrl: 'app/usermanagement/roleuserlist.html',
                        data: {
                            model: 'user'
                        },
                        controller: 'RolesUserListCtrl'
                    })
                    .state('auth.rolepermission', {
                        url: '/rolepermission/:roleid',
                        templateUrl: 'app/usermanagement/rolepermission.html',
                        data: {
                            model: 'user'
                        },
                        controller: 'RolePermissionCtrl'
                    })
                    .state('auth.rolemanagement', {
                        url: '/rolemanagement',
                        templateUrl: 'app/usermanagement/rolemanagement.html',
                        data: {
                            model: 'user'
                        },
                        controller: 'RoleManagementCtrl'
                    })
                    .state('auth.groups', {
                        url: '/role',
                        templateUrl: 'app/usermanagement/role.html',
                        data: {
                            model: 'user'
                        },
                        controller: 'RoleCtrl'
                    });
            }
        ]);
        return mod;
    };
});
define(['common/utils/tree'],function (TreeUtil) {
    var diName = 'TopbarCtrl';
    return {
        __register__: function (mod) {
            mod.controller(diName, ['$scope', 'authenticator', 'session','permissions','apiService','$http','dpSession','$timeout','dpDialog','$q', TopbarCtrl]);
            return mod;
        }
    };

    function TopbarCtrl($scope, authenticator, session, permissions, apiService, $http, dpSession, $timeout,dpDialog, $q) {
        $scope.navs = [];

        $scope.getUsername = function () {
            return session.username
        };

        $scope.logout = function () {
            authenticator.logout();
            //还原
            $scope.active = $scope.navs[0];
        };

        var current  = dpSession.get('projectIndex') || 0;

        $http.get(apiService.getApiUrl('/navigate/list?uid='+session.userid )).then(function(data){

            $scope.navs = data.data.data.navigate;
            $scope.navs.forEach(function(nav){
                nav['leftNavUrl'] = '/'+nav.value + '/menu/list?uid='+ session.userid
            });

            //设置当前project,默认为第一个
            $scope.active = dpSession.get('project') || $scope.navs[0];

            $scope.changeProject($scope.active,current);

        },function(error){
            console.log('Left navs fetch faild.');
        });

        $scope.changeProject = function(nav,index){
            var change = function(){
                //之后再执行跳转，因为ccTree需要
                $timeout(function(){
                    //调用InitCtrl里的setProjectUrl方式设置iframe的src地址
                    $scope.$parent.$$childTail.setProjectUrl(nav);

                    //设置缓存地址
                    $scope.navs[current]['cacheUrl'] = dpSession.get('project') && dpSession.get('project')['cacheUrl'];
                    current = index;

                    //设置当前project
                    $scope.active = nav;

                    //缓存用来解决刷新后还原的问题
                    dpSession.set('project', nav);
                    dpSession.set('projectIndex', current);
                },0);
            };

            if(!nav['data']){
                //获取左导数据
                getLeftNavaData(nav).then(function(data){
                    handlerNavDataAndPermission(data).then(function(){
                        change();
                    },null);
                },function(){});
            }else{
                handlerNavDataAndPermission(nav['data']).then(function(){
                    change();
                },null);
            }
        };



        function getLeftNavaData(nav){
            var defer = $q.defer();
            $http({
                url:apiService.getApiUrl(nav.leftNavUrl),
                //url:nav.leftNavUrl,
                responseType: 'json',
                cache:false
            }).success(function(res){
                if(res.status !== 0){
                    defer.reject(res.msg);
                }else{
                    nav['data'] = res.data;
                    defer.resolve(res.data);
                }
            }).error(function (data, status, headers) {
                return defer.reject('Login Failed: Server Error');
            });
            return defer.promise;
        }

        function handlerNavDataAndPermission(data){
            var defer = $q.defer();
            var permissionList = data.permissions || [],
                featureList = data.features || [],
                navData = TreeUtil.processNodes(data && data.menu || [], 'items', function (node) {
                    if (node.url) {
                        node.state = node.url.replace('/', '.');
                    }
                });

            session.set({
                navData: navData,
                permissions: permissionList,
                features: featureList
            });

            permissions.setPermissions(session.permissions);
            permissions.setFeatures(session.features);
            defer.resolve(data);
            return defer.promise;
        }

        $scope.goChangePassword = function(){
            dpDialog.loadFragment({
                title:'Change Password',
                content:'./app/layouts/changepassword.html',
                controller:'UserSettingCtrl'
            });
        }
    }
});

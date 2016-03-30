define(['text!layouts/confirm-dialog.html'], function (confirmDialogTpl) {
    var diName = 'AospackageListCtrl';
    return {
        __register__: function (mod) {
            mod.controller(diName, ['$scope', '$window', '$state', '$filter', '$location', '$modal', 'ngTableParams', 'ds.aospackage', 'logger', 'apiService', 'PER_PAGE','dpDialog', AospackageListCtrl]);
            return mod;
        }
    };

    function AospackageListCtrl($scope, $window, $state, $filter, $location, $modal, ngTableParams, DS, logger, apiService, PER_PAGE,dpDialog) {
        var apiParams = {};
        var vm = $scope.vm = {
            'listChecked': [],
            'listTotal': 0
        };

        var errorTips = {
            '1001': "请勿重复删除线上数据。",
            '1002': "请先将线上数据下架。",
            '1003': "请先将数据上传至预发布环境。",
            '1004': "资源已被其他资源引用，不能删除。"
        };

        $scope.delete = function () {
            if (vm.listChecked.length === 0) return;
            $modal.open({
                template: confirmDialogTpl,
                scope: $scope,
                controller: ['$scope', '$modalInstance', function ($scope, $modalInstance) {
                    $scope.title = 'Confirm';
                    $scope.content = 'Are you sure to Delete';
                    $scope.cancel = function () {
                        $modalInstance.dismiss('cancel');
                    };
                    $scope.confirm = function () {
                        var len = $scope.items.length - 1,
                            item;
                        DS.delete({items: vm.listChecked}).then(function () {
                            logger.success('delete success!');
                            for (; len >= 0; len--) {
                                item = $scope.items[len];
                                if (vm.listChecked.indexOf(item.id + '') > -1) $scope.items.splice(len, 1);
                            }
                            vm.listTotal -= vm.listChecked.length;
                            vm.listChecked = []; //设置listChecked.length = 0没用，不能引用watch的执行
                        }, function (error) {
                            logger.error(errorTips[error.data.status + ''] || 'delete faild!');
                        });
                        $modalInstance.dismiss('cancel');
                    };
                }]
            });
        };

        $scope.addaospackage = function () {
            $state.go('aosrule.add-aospackage');
        };

        $scope.ViewDetail = function (item) {
            $state.go('aosrule.edit-aospackage', {
                id: item.id
            });
        };

        $scope.goSearch = function () {
            apiParams.searchKeyword = $scope.search.string;
            $scope.packageTableParams.page(1);
            $scope.packageTableParams.reload();
        };

         $scope.choice = function (item) {
            if ($location.search().popup) {
                var ifr_window = top['dp_dialog'].length >= 2  ? top.frames[top['dp_dialog'].slice(-2)[0].from].contentWindow : top.frames['project'];
                ifr_window.postMessage({item:angular.copy(item),single:$location.search().single},'*');
                dpDialog.close();
            }
        };

        $scope.packageTableParams = new ngTableParams({
            page: 1,
            count: PER_PAGE
        }, {
            isCurrent: function (page, params) {
                return page.number === params.page() && page.type !== 'prev' && page.type !== 'next';
            },
            getData: function ($defer, params) {
                apiParams.limit = PER_PAGE; //add api parameter
                apiParams.index = params.page();

                $scope.isLoading = true;
                DS.list(apiParams).then(function () {
                    var resData = DS.data,
                        items = resData.items;
                    filterData = resData.filters;

                    $scope.items = items;
                    vm.listTotal = resData.total;
                    params.total(resData.total);
                    $defer.resolve($scope.items);
                    $scope.isLoading = false;
                }, function () {
                    $scope.isLoading = false;
                });
            }
        });

    }
})

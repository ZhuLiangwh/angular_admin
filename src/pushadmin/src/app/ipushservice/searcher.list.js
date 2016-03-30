define(['common/utils/date', 'common/utils/dataConverter', 'text!layouts/confirm-dialog.html'], function (dateUtil, dataConverter, confirmDialogTpl) {
    var diName = 'iSearcherListCtrl';
    return {
        __register__: function (mod) {
            mod.controller(diName, ['$scope', '$window', '$state', '$filter', '$location', '$modal', 'ngTableParams', 'ds.isearcher', 'logger', 'apiService', 'PER_PAGE','dpDialog', iSearcherListCtrl]);
            return mod;
        }
    };

    function iSearcherListCtrl($scope, $window, $state, $filter, $location, $modal, ngTableParams, DS, logger, apiService, PER_PAGE,dpDialog) {
        var apiParams = $scope.apiParams = {};
        var vm = $scope.vm = {
            'listChecked': [],
            'listTotal': 0,
            'idSort':'desc',
            'firstCreatedSort':'desc',
            'lastModifiedSort':'desc'
        };

        $scope.isPopup = function () {
            return !!$location.search().popup;
        };

        $scope.addiSearcher = function () {
            $state.go('ipushservice.add-isearcher');
        };

        $scope.ViewDetail = function (item) {
            $state.go('ipushservice.edit-isearcher', {
                id: item.id
            });
        };

        $scope.choice = function (item) {
            if ($location.search().popup) {
                var ifr_window = top['dp_dialog'].length >= 2  ? top.frames[top['dp_dialog'].slice(-2)[0].from].contentWindow : top.frames['project'];
                ifr_window.postMessage({item:angular.copy(item),single:$location.search().single},'*');
                dpDialog.close();
            }
        };

        var del = function (content, params, delSuccess, delFail) {
            $modal.open({
                template: confirmDialogTpl,
                scope: $scope,
                controller: ['$scope', '$modalInstance', function ($scope, $modalInstance) {
                    $scope.title = 'Confirm';
                    $scope.content = content;
                    $scope.cancel = function () {
                        $modalInstance.dismiss('cancel');
                    };
                    $scope.confirm = function () {
                        DS.delete(params).then(function () {
                            delSuccess();
                        }, function (error) {
                            delFail(error);
                        });
                        $modalInstance.dismiss('cancel');
                    };
                }]
            });
        };
        var delSuccess = function () {
            var len = $scope.items.length - 1, item;
            for (; len >= 0; len--) {
                item = $scope.items[len];
                if (vm.listChecked.indexOf(item.id + '') > -1) $scope.items.splice(len, 1);
            }
            vm.listTotal -= vm.listChecked.length;
            vm.listChecked = []; //设置listChecked.length = 0没用，不能引用watch的执行
            logger.success('delete success!');
        };
        $scope.delete = function () {
            if (vm.listChecked.length === 0) return;
            del('您确定要删除吗', {items: vm.listChecked}, delSuccess, function (error) {
                if (error.data.status === 1005) {
                    del('您删除的数据被搜索引擎分类引用，确定要删除吗?', {items: vm.listChecked, comfirm: true}, delSuccess, function (error) {
                        logger.error(error.data.msg || 'delete faild!');
                    })
                } else {
                    logger.error(error.data.msg || 'delete faild!');
                }
            });
        };

        $scope.filter = function (node) {
            var selectedValue = node.selectedValue;
            _.extend(apiParams, selectedValue);
            $scope.isearcherTableParams.page(1);
            $scope.isearcherTableParams.reload();
        };


        $scope.clearSearch = function () {
            $scope.search.string = '';
        };
        $scope.goSearch = function () {
            apiParams.searchKeyword = $scope.search.string;
            $scope.isearcherTableParams.page(1);
            $scope.isearcherTableParams.reload();
        };


        $scope.isearcherTableParams = new ngTableParams({
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

                    if (!$scope.selectOptions) {
                        //only assign at first time, because it would cause dpMultiDropdown model change and reset default value
                        $scope.selectOptions = filterData;
                    }

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

        //排序处理
        $scope.$watch('apiParams.sort',function(){
            $scope.isearcherTableParams.reload();
        },true);
    }
});

define(['common/utils/date', 'common/utils/dataConverter', 'text!layouts/confirm-dialog.html'], function (dateUtil, dataConverter, confirmDialogTpl) {
    var diName = 'AosstrategyListCtrl';
    return {
        __register__: function (mod) {
            mod.controller(diName, ['$scope', '$window', '$state', '$filter', '$location', '$modal', 'ngTableParams', 'ds.aosstrategy', 'logger', 'apiService', 'PER_PAGE','dpDialog', AosstrategyListCtrl]);
            return mod;
        }
    };

    function AosstrategyListCtrl($scope, $window, $state, $filter, $location, $modal, ngTableParams, DS, logger, apiService, PER_PAGE,dpDialog) {
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

        $scope.addAosstrategy = function () {
            $state.go('aospreset.add-aosstrategy');
        };

        function save(items, callback) {
            DS.update(items)
                .then(function () {
                    callback && callback();
                }, function (error) {
                    //save failed
                });
        }

        $scope.ViewDetail = function (item) {
            $state.go('aospreset.edit-aosstrategy', {
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

        var errorTips = {
            '1001': "请勿重复删除线上数据。",
            '1002': "请先将线上数据下架。",
            '1003': "请先将数据上传至预发布环境。",
            '1004': "该资源已被其他资源引用，不能删除。"
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

                        }, function (data) {
                            logger.error(errorTips[data.data.status + ''] || 'delete faild!');
                        });
                        $modalInstance.dismiss('cancel');
                    };
                }]
            });
        };

        $scope.filter = function (node) {
            var selectedValue = node.selectedValue;
            _.extend(apiParams, selectedValue);
            $scope.aosstrategyTableParams.page(1);
            $scope.aosstrategyTableParams.reload();
        };

        $scope.goSearch = function () {
            apiParams.searchKeyword = $scope.search.string;
            $scope.aosstrategyTableParams.page(1);
            $scope.aosstrategyTableParams.reload();
        };

        var _dateFormat = function (date) {
            return dateUtil.format(date, 'YY-MM-dd');
        };
        var onChangeDate = function (newDate, oldDate) {
            if (newDate.getDate() == oldDate.getDate()) {
                return;
            }
            apiParams.start = _dateFormat($scope.datePicker.start.dt);
            apiParams.end = _dateFormat($scope.datePicker.end.dt);
            $scope.aosstrategyTableParams.page(1);
            $scope.aosstrategyTableParams.reload();
        };
        $scope.datePicker = {
            start: {
                dt: dateUtil.getRelativeDate(-1, new Date())
            },
            end: {
                max: _dateFormat(new Date()),
                dt: dateUtil.getRelativeDate(0, new Date())
            }
        };

        $scope.$watch('datePicker.start.dt', onChangeDate);
        $scope.$watch('datePicker.end.dt', onChangeDate);

        $scope.open = function ($event, datePickerInput) {
            $event.preventDefault();
            $event.stopPropagation();
            datePickerInput.opened = true;
        };

        $scope.$watch('datePicker.start.dt', onChangeDate);
        $scope.$watch('datePicker.end.dt', onChangeDate);

        $scope.aosstrategyTableParams = new ngTableParams({
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
                    // $scope.listTotal = resData.total;
                    vm.listTotal = resData.total;
                    params.total(resData.total);
                    $defer.resolve($scope.items);
                    // resetCheckBoxes();
                    $scope.isLoading = false;
                }, function () {
                    $scope.isLoading = false;
                });
            }
        });

        //排序处理
        $scope.$watch('apiParams.sort',function(){
            $scope.aosstrategyTableParams.reload();
        },true);
    }
})

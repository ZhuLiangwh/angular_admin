define(['common/utils/date', 'common/utils/dataConverter','text!layouts/confirm-dialog.html','text!layouts/alert-dialog.html','common/utils/url'], function (dateUtil, dataConverter,confirmDialogTpl,alertDialogTpl,url) {
    var diName = 'AdblockerfileListCtrl';
    return {
        __register__: function (mod) {
            mod.controller(diName, ['$scope', '$window', '$state', '$filter', '$location', '$modal', 'ngTableParams', 'ds.adblockerfile', 'logger', 'apiService','dpErrorHandler', 'PER_PAGE','dpDialog', AdblockerfileListCtrl]);
            return mod;
        }
    };

    function AdblockerfileListCtrl($scope, $window, $state, $filter, $location, $modal, ngTableParams, DS, logger, apiService, dpErrorHandler,PER_PAGE,dpDialog) {
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

        $scope.addadblockerfile = function () {
            $state.go('adblocker.add-adblockerfile');
        };

        $scope.ViewDetail = function (item) {
            $state.go('adblocker.edit-adblockerfile',{
                id:item.id
            });
        };

        $scope.choice = function (item) {
            if ($location.search().popup) {
                var ifr_window = top['dp_dialog'].length >= 2  ? top.frames[top['dp_dialog'].slice(-2)[0].from].contentWindow : top.frames['project'];
                ifr_window.postMessage({item:angular.copy(item),single:$location.search().single},'*');
                dpDialog.close();
            }
        };
        
        var tips = {
            'delete':"Are you sure to delete from {{where}}?",
            'upload':"Are you sure to upload to {{where}}?",
            'success':"{{method}} success.",
            'error':"{{method}} faild."
        };
        var errorHandler = new dpErrorHandler({
            '1004':{
                'tip':{},
                'handler':function(errorData){
                    var tip_id =  '数据ID({{id}})被',
                        tip_ref = '模块({{modelName}})下的ID({{id}})',
                        msg = '';
                    var ref_info,temp = [];
                    var faileds = errorData.data['failed'];
                    faileds.forEach(function(faild){
                        ref_info = faild.refered_info;
                        msg += tip_id.replace(/\{\{\w+\}\}/,faild.id);
                        ref_info.forEach(function(ref){
                            temp.push(tip_ref.replace(/{{(\w+?)}}/g,function(a,b){ return ref[b]+''}));
                        });
                        msg += temp.join('、');
                    });

                    return '删除失败! '+msg+' 的数据所引用.'
                }
            },
            '1005':{
                'tip':{
                    'cn':'该资源已被其它资源引用,是否确认删除？'
                },
                'confirmHandler':function(){
                    DS.delete({'server': 'admin', 'items': vm.listChecked,'confirm':true});
                }
            },
            '1011':{
                'tip':{},
                'handler':function(errorData){
                    var tip_id =  '数据ID({{id}}), ',
                        msg = '';
                    var faileds = errorData.data['failed'];
                    faileds.forEach(function(faild){
                        msg += tip_id.replace(/\{\{\w+\}\}/,faild);
                    });
                    return '操作失败! '+msg+' rule/icon未填';
                }
            }
        });

        function action(method, server, success,fail) {
            if (vm.listChecked.length === 0) return;
            var tip = tips[method].replace(/\{\{\w+?\}\}/g, function () {
                return server
            });
            $modal.open({
                template: confirmDialogTpl,
                scope: $scope,
                controller: ['$scope', '$modalInstance', function ($scope, $modalInstance) {
                    $scope.title = 'Confirm';
                    $scope.content = tip;
                    $scope.cancel = function () {
                        $modalInstance.dismiss('cancel');
                    };
                    $scope.confirm = function () {
                        DS[method]({'server': server, 'items': vm.listChecked}).then(function (data) {
                            logger.success(tips['success'].replace(/\{\{\w+?\}\}/g, function () {
                                return method
                            }));
                            _.isFunction(success) && success(data);

                        }, function (data) {
                            console.log(data)
                            _.isFunction(fail) && fail(data);
                        });
                        $modalInstance.dismiss('cancel');
                    };
                }]
            });
        }

        function actionError() {
            $modal.open({
                template: alertDialogTpl,
                scope: $scope,
                controller: ['$scope', '$modalInstance', function ($scope, $modalInstance) {
                    $scope.title = 'Confirm';
                    $scope.content = "您的正式环境数据未下架！删除本地数据请按如下步骤进行：删除正式环境——删除测试环境——删除本地数据。";
                    $scope.cancel = function () {
                        $modalInstance.dismiss('cancel');
                    };
                    $scope.confirm = function () {
                        $modalInstance.dismiss('cancel');
                    };
                }]
            });
        }

        function changeStatus(data) {
            var data = data.data.data,
                items = data['success'];
            var o = _.indexBy(items, 'id');
            $scope.items.forEach(function(item){
                if(item.id in o){
                    _.extend(item,o[item.id])
                }
            });
        }

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
        $scope.filter = function (node) {
            var selectedValue = node.selectedValue;
            _.extend(apiParams, selectedValue);
            $scope.adblockerfileTableParams.page(1);
            $scope.adblockerfileTableParams.reload();
        };

        $scope.goSearch = function () {
            apiParams.searchKeyword = $scope.search.string;
            $scope.adblockerfileTableParams.page(1);
            $scope.adblockerfileTableParams.reload();
        };

        var _dateFormat = function (date) {
            return dateUtil.format(date, 'YY-MM-dd');
        };
        var onChangeDate = function (newDate, oldDate) {
            if (newDate - oldDate === 0) {
                return;
            }
            apiParams.start = _dateFormat($scope.datePicker.start.dt);
            apiParams.end = _dateFormat($scope.datePicker.end.dt);
            $scope.adblockerfileTableParams.page(1);
            $scope.adblockerfileTableParams.reload();
        };
        $scope.datePicker = {
            start: {
                dt: dateUtil.getRelativeDate(0, new Date())
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

        $scope.adblockerfileTableParams = new ngTableParams({
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
            $scope.adblockerfileTableParams.reload();
        },true);    
    }
});

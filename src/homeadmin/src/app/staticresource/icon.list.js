define(['common/utils/date', 'common/utils/dataConverter', 'text!layouts/alert-dialog.html', 'text!layouts/alert-dialog.html'], function (dateUtil, dataConverter, confirmDialogTpl, alertDialogTpl) {
    var diName = 'IconListCtrl';
    return {
        __register__: function (mod) {
            mod.controller(diName, ['$scope', '$window', '$state', '$filter', '$location', '$modal', 'ngTableParams', 'ds.icon', 'logger', 'apiService', 'dpErrorHandler', 'PER_PAGE','dpDialog', IconListCtrl]);
            return mod;
        }
    };

    function IconListCtrl($scope, $window, $state, $filter, $location, $modal, ngTableParams, DS, logger, apiService, dpErrorHandler, PER_PAGE,dpDialog) {
        var apiParams = {};
        var vm = $scope.vm = {
            'listChecked': [],
            'listTotal': 0
        };
        // $scope.listChecked = [];
        // $scope.listTotal = 0;

        $scope.isPopup = function () {
            return !!$location.search().popup;
        };

        $scope.addIcon = function () {
            $state.go('staticresource.add-icon');
        };

        $scope.ViewDetail = function (item) {
            $state.go('staticresource.edit-icon', {id: item.id});
        };


        $scope.choice = function (item) {
            if ($location.search().popup) {
                var ifr_window = top['dp_dialog'].length >= 2  ? top.frames[top['dp_dialog'].slice(-2)[0].from].contentWindow : top.frames['project'];
                ifr_window.postMessage({item:angular.copy(item),single:$location.search().single},'*');
                dpDialog.close();
            }
        };

        var tips = {
            'delete': "Are you sure to delete from {{server}}?",
            'upload': "Are you sure to upload to {{server}}?",
            'success': "{{method}} success.",
            'error': "{{method}} faild."
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
                            /*logger.error(errorTips[data.data.status + ''] || tips['error'].replace(/\{\{\w+?\}\}/g, function () {
                             return method
                             }));*/
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
        function deleteItems(data){
            var data = data.data.data,
                ids = _.keys(_.indexBy(data['success'],'id')),
                len = $scope.items.length - 1,
                item;
            for (; len >= 0; len--) {
                item = $scope.items[len];
                if (ids.indexOf(item.id + '') > -1) $scope.items.splice(len, 1);
            }
            vm.listTotal -= ids.length;
            vm.listChecked = _.difference(vm.listChecked,ids.map(function(item){ return item+''}));
        }

        //从控制台删除
        $scope.deleteFromConsole = function () {
            if (vm.listChecked.length === 0) return;
            var choiceItems = _.pick.apply(null,[_.indexBy($scope.items,'id'),vm.listChecked]);
            choiceItems = _.filter(choiceItems,function(v,k){
                return (v.is_upload_ec2 || v.is_upload_local);
            });
            if(choiceItems.length){
                actionError();
                return;
            }
            action('delete', 'admin', function (data) {
                deleteItems(data);
            },function(data){
                deleteItems(data);
                errorHandler.show(data);
            });
        };

        //上传到本地
        $scope.uploadToLocale = function () {
            action('upload', 'local', function (data) {
                changeStatus(data);
            },function(data){
                changeStatus(data);
                errorHandler.show(data);
            });
        };

        //从本地删除
        $scope.deleteFromLocale = function () {
            action('delete', 'local', function (data) {
                changeStatus(data);
            },function (data) {
                changeStatus(data);
                errorHandler.show(data);
            });
        };

        //上传到国内
        $scope.uploadToInland = function () {
            action('upload', 'china', function (data) {
                changeStatus(data);
            },function (data) {
                changeStatus(data);
                errorHandler.show(data);
            });
        };

        //从国内删除
        $scope.deleteFromInland = function () {
            action('delete', 'china', function (data) {
                changeStatus(data);
            },function (data) {
                changeStatus(data);
                errorHandler.show(data);
            });
        };

        //上传到海外
        $scope.uploadToOverseas = function () {
            action('upload', 'ec2', function (data) {
                changeStatus(data);
            },function (data) {
                changeStatus(data);
                errorHandler.show(data);
            });
        };

        //从海外删除
        $scope.deleteFromOverseas = function () {
            action('delete', 'ec2', function (data) {
                changeStatus(data);
            },function (data) {
                changeStatus(data);
                errorHandler.show(data);
            });
        };

        $scope.filter = function (node, isInit) {
            _.extend(apiParams, node.selectedValue);
            if (!isInit) {
                $scope.iconTableParams.page(1);
                $scope.iconTableParams.reload();
            }
        };

        $scope.goSearch = function () {
            apiParams.searchKeyword = $scope.search.string;
            $scope.iconTableParams.page(1);
            $scope.iconTableParams.reload();
        };

        var _dateFormat = function (date) {
            return dateUtil.format(date, 'YY-MM-dd');
        };
        var onChangeDate = function (newDate, oldDate) {
            if (newDate.getTime() == oldDate.getTime()) {
                return;
            }
            apiParams.start = _dateFormat($scope.datePicker.start.dt);
            apiParams.end = _dateFormat($scope.datePicker.end.dt);
            $scope.iconTableParams.page(1);
            $scope.iconTableParams.reload();
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

        $scope.iconTableParams = new ngTableParams({
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
                    $scope.items = items;
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
    }
});

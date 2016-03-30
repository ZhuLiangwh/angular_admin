define(['common/utils/date', 'common/utils/dataConverter','text!layouts/confirm-dialog.html','text!layouts/alert-dialog.html','common/utils/url'], function (dateUtil, dataConverter,confirmDialogTpl,alertDialogTpl,url) {
    var diName = 'PromotionspeeddialListCtrl';
    return {
        __register__: function (mod) {
            mod.controller(diName, ['$scope', '$window', '$state', '$filter', '$location', '$modal', 'ngTableParams', 'ds.promotionspeeddial', 'logger', 'apiService','dpErrorHandler', 'PER_PAGE', PromotionspeeddialListCtrl]);
            return mod;
        }
    };

    function PromotionspeeddialListCtrl($scope, $window, $state, $filter, $location, $modal, ngTableParams, DS, logger, apiService, dpErrorHandler,PER_PAGE) {
        var apiParams = $scope.apiParams = {};
        var vm = $scope.vm = {
            'listChecked': [],
            'listTotal': 0,
            'idSort':'desc',
            'firstCreatedSort':'desc',
            'lastModifiedSort':'desc'
        };

        $scope.getCheckSortUrl = function() {
            return apiService.getApiUrl('/promotionspeeddial/check_unique');
        }

        $scope.isPopup = function () {
            return !!$location.search().popup;
        };

        $scope.addPromotionspeeddial = function () {
            $state.go('promotionservice.add-promotionspeeddial');
        };

        $scope.ViewDetail = function (item) {
            $state.go('promotionservice.edit-promotionspeeddial',{id:item.id});
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
            '1010':{
                'tip':{
                    'cn':'id:{{id}} start time greater than end time'
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
                ids = data['success'],
                len = $scope.items.length - 1,
                item;
            for (; len >= 0; len--) {
                item = $scope.items[len];
                if (ids.indexOf(item.id) > -1) $scope.items.splice(len, 1);
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

        $scope.filter = function (node) {
            var selectedValue = node.selectedValue;
            _.extend(apiParams, selectedValue);
            $scope.promotionspeeddialTableParams.page(1);
            $scope.promotionspeeddialTableParams.reload();
        };

        $scope.goSearch = function () {
            apiParams.searchKeyword = $scope.search.string;
            $scope.promotionspeeddialTableParams.page(1);
            $scope.promotionspeeddialTableParams.reload();
        };

        $scope.promotionspeeddialTableParams = new ngTableParams({
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
            $scope.promotionspeeddialTableParams.reload();
        },true);
    }
});

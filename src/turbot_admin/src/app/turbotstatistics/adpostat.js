define([
    'common/utils/date',
    'common/utils/dataConverter',
    'common/utils/chartAdapter'
], function(dateUtil, dataConverter, chartAdapter) {
    var diName = 'AdpostatListCtrl';
    return {
        __register__: function(mod) {
            mod.controller(diName, ['$scope', 'logger', 'ds.adpostat','apiService', AdpostatListCtrl]);
            return mod;
        }
    };

    function AdpostatListCtrl($scope, logger, DS, apiService) {
        var apiParams = {};


        var vm = $scope.vm = {};
        // 分类
        vm.category = [
            {
              label: 'adpospv',
              name: '广告位pv'
            },
            {
              label: 'adposuv',
              name: '广告位uv'
            },
            {
              label: 'adposlist',
              name: '广告位展示量'
            },
            {
              label: 'adposctr',
              name: '广告位展点比'
            }
        ];

        vm.selection = function() {
            return _.where(vm.category, {checked: true});
        }

        $scope.subcate = function(){
            apiParams.category = vm.selection();
            vm.dropdown = false;
            reload();
        }


        // 导出csv
        $scope.exportUrl = function(){
            return apiService.getApiUrl('/adpostable');
        }

   
        $scope['isCollapse0'] = false;
        $scope['config0'] = {
            "chart":{
                width:$('.widget-content').width()-15
            },
            "type": "line",
             "title": {
                text: '广告位统计'
            },
            "yAxis": [{}],
            "series": [
                {
                    
                }
            ]
        };

        // 下拉筛选
        $scope.filter = function(node, isInit) {
            _.extend(apiParams, node.selectedValue);
            !isInit && reload();
        };

        // 时间筛选
        var _dateFormat = function(date) {
            return dateUtil.format(date, 'YY-MM-dd');
        };
        var onChangeDate = function(newDate, oldDate) {
            if(newDate - oldDate === 0) {
                return;
            }
            apiParams.start = _dateFormat($scope.datePicker.start.dt);
            apiParams.end = _dateFormat($scope.datePicker.end.dt);
            reload();
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

        $scope.open = function($event, datePickerInput) {
            $event.preventDefault();
            $event.stopPropagation();
            datePickerInput.opened = true;
        };

        // 搜索
        $scope.$watch('searchKeyword',function(newVal,oldVal){
            if(!newVal){
                delete apiParams.statid;
            }
            $scope.goSearch = function(){
                if(newVal){
                    apiParams.statid = $scope.searchKeyword;
                    $scope.searchKeyword && reload();
                }else{
                    alert('请输入广告位ID')
                }
            }
        });

        var pageInit = true,
            changeApiParams = function(params) {
                var re = [],
                    key = '',
                    op = '',
                    name = '';
                for(key in params) {
                    if(key && params.hasOwnProperty(key)) {
                        op = key === 'start' ? '>=' : key === 'end' ? '<=' : 'eq';
                        name = (key === 'start' || key === 'end') ? 'date' : key;
                        re.push({
                            'name': name,
                            'op': op,
                            'val': params[key]
                        });
                    }
                }
                return re;
            };

        function reload() {
            DS.getData({
                    'q': {
                        'filters': changeApiParams(apiParams)
                    }
                })
                .then(function(data) {
                    var data = data.data.data,
                        items = data.items,
                        filters = data.filters;

                    _.each(items, function(item, index) {
                        $scope['chartConfig' + index] = chartAdapter($scope['config' + index], item);
                    });


                    if(!pageInit) return;
                    if(_.isObject(filters['cascade'])) {
                        var convertedData = dataConverter.filter(filters['cascade']);
                        $scope.cascadeSelectName = convertedData.selectName;
                        $scope.cascadeSelectOptions = convertedData.selectOptions;
                    }
                    if(_.isObject(filters['multi'])) {
                        $scope.multiSelectOptions = filters['multi'];
                    }
                    pageInit = false;


                }, function(error) {
                    logger.error(error.data.msg || 'Get data faild.');
                })
        }

        reload();
    }
});

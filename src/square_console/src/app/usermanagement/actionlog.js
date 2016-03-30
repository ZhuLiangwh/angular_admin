/**
 * Created by jhzhang on 2014/10/9.
 */
define(['common/utils/date', 'common/utils/dataConverter'],function(dateUtil,dataConverter){
    var diName = 'ActionLogCtrl';
    return {
        __register__:function(mod){
            mod.controller(diName,['$scope', '$filter','ngTableParams', 'ds.actionlog', 'PER_PAGE', 'apiService', ActionLogCtrl]);
            return mod;
        }
    };

    function ActionLogCtrl($scope, $filter,  ngTableParams, actionLogDS,  PER_PAGE,apiService){
        var apiParams = $scope.apiParams = {};
        var selected = {},resetFilters = true;
        var vm = $scope.vm = {
            'listChecked': [],
            'listTotal': 0
        };

        function reloadPage(){
            $scope.historyTableParams.page(1);
            $scope.historyTableParams.reload();
        }

        $scope.goSearch = function () {
            apiParams.searchKeyword = $scope.search.string;
            reloadPage();
        };

        $scope.filter = function (node) {
            var selectedValue = node.selectedValue;
            _.extend(apiParams, selectedValue);
            reloadPage();
        };



        var _dateFormat = function(date) {
            return dateUtil.format(date, 'YY-MM-dd');
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

        var onChangeDate = function (newDate, oldDate) {
            if (newDate - oldDate === 0) {
                return;
            }
            apiParams.start = _dateFormat($scope.datePicker.start.dt);
            apiParams.end = _dateFormat($scope.datePicker.end.dt);
            $scope.historyTableParams.page(1);
            $scope.historyTableParams.reload();
        };

        $scope.$watch('datePicker.start.dt', onChangeDate);
        $scope.$watch('datePicker.end.dt', onChangeDate);

        $scope.open = function($event, datePickerInput) {
            $event.preventDefault();
            $event.stopPropagation();
            datePickerInput.opened = true;
        };
        $scope.historyTableParams = new ngTableParams({
            page: 1,
            count: PER_PAGE
        }, {
            isCurrent: function(page, params) {
                return page.number === params.page() && page.type !== 'prev' && page.type !== 'next';
            },
            getData: function($defer, params) {
                apiParams.limit = PER_PAGE; //add api parameter
                apiParams.index = params.page();
                apiParams.start = _dateFormat($scope.datePicker.start.dt);
                apiParams.end = _dateFormat($scope.datePicker.end.dt);
                $scope.isLoading = true;
                actionLogDS.getData(apiParams).then(function () {
                    var resData = actionLogDS.data,
                        items = resData.items;

                    $scope.items = items;
                    vm.listTotal = resData.total;
                    params.total(resData.total);
                    $defer.resolve($scope.items);
                    $scope.isLoading = false;

                    if(!resetFilters) return;
                    $scope.filterGroups = resData.filters.model;
                    $scope.user_name = resData.filters.user_name;
                    $scope.filter.model = $scope.filterGroups[0];
                    $scope.filter.user_name = $scope.user_name[0];
                }, function () {
                    $scope.isLoading = false;
                });
            }
        });

        $scope.changeFilterGroup = function(){
            resetFilters = false;
            apiParams.model = $scope.filter.model.value;
            reloadPage();
        };

        $scope.changeFilterRole = function(){
            resetFilters = false;
            apiParams.user_name = $scope.filter.user_name.value;
            reloadPage();
        };
    }
});
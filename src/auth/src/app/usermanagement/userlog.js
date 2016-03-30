/**
 * Created by jhzhang on 2014/10/9.
 */
define(['common/utils/date', 'common/utils/dataConverter'],function(dateUtil,dataConverter){
    var diName = 'UserLogCtrl';
    return {
        __register__:function(mod){
            mod.controller(diName,['$scope', '$filter','ngTableParams', 'ds.userlog', 'PER_PAGE', 'apiService', UserLogCtrl]);
            return mod;
        }
    };

    function UserLogCtrl($scope, $filter,  ngTableParams, UserLogDS,  PER_PAGE,apiService){
        var apiParams = $scope.apiParams = {};
        var selected = {},resetFilters = true;
        var vm = $scope.vm = {
            'listChecked': [],
            'listTotal': 0
        };

        function reloadPage(){
            $scope.userlogTableParams.page(1);
            $scope.userlogTableParams.reload();
        }

        $scope.goSearch = function () {
            apiParams.searchKeyword = $scope.search.string;
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
            $scope.userlogTableParams.page(1);
            $scope.userlogTableParams.reload();
        };

        $scope.$watch('datePicker.start.dt', onChangeDate);
        $scope.$watch('datePicker.end.dt', onChangeDate);

        $scope.open = function($event, datePickerInput) {
            $event.preventDefault();
            $event.stopPropagation();
            datePickerInput.opened = true;
        };
        $scope.userlogTableParams = new ngTableParams({
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
                UserLogDS.getData(apiParams).then(function () {
                    var resData = UserLogDS.data,
                        items = resData.results;

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
            $scope.userlogTableParams.reload();
        },true);

    }
});
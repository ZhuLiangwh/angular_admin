define(['common/utils/date', 'common/utils/dataConverter','common/utils/url'], function (dateUtil, dataConverter,url) {
    var diName = 'AosexportpresetCtrl';
    return {
        __register__: function (mod) {
            mod.controller(diName, ['$scope', '$window', '$state', '$filter', '$location', '$modal', 'ngTableParams', 'ds.exportpreset', 'logger', 'apiService', 'PER_PAGE', AosexportpresetCtrl]);
            return mod;
        }
    };

    function AosexportpresetCtrl($scope, $window, $state, $filter, $location, $modal, ngTableParams, DS, logger, apiService, PER_PAGE) {
        var apiParams = {},loadParms = {};
        $scope.locale = '';

        DS.getData(apiParams).then(function(data){
            var data = data.data.data;

            $scope.selectLabel = ['平台','项目名称','渠道'];
            convertedData = dataConverter.filter(data.filters);
            $scope.selectName = convertedData.selectName;
            $scope.selectOptions = convertedData.selectOptions;
            $scope.countries = data.countries;
            $scope.country =  $scope.countries[0];
            $scope.locales = $scope.country.children.items;
        },function(){});

        $scope.updateSelection = function(node){
            /*var parent = _.values(node.selectedValue).join(',');
            $scope.locales = convertedData.selectOptions.locale.filter(function(item){
                return item.parent === parent;
            });*/
            loadParms = _.extend(loadParms,node.selectedValue);
            //$scope.locales[0].checked = true;
        };
        $scope.$watch('country',function(newCountry){
            $scope.locales = newCountry && newCountry.children.items;
        });
        $scope.$watch('locales',function(newLocales){
            var locale = [];
            _.each(newLocales,function(item){
                item.checked && (locale.push(item.value));
            });
            $scope.locale = locale.join('|');
        },true);

        $scope.downloadUrl = function () {
            loadParms = _.extend(loadParms, {country: $scope.country && $scope.country.value, locale: $scope.locale,version_code:$scope.version_code});
            return $scope.locale&& $scope.version_code ? apiService.getApiUrl('/aospredata/dataexport?' + url.ObjToQueryStr(loadParms)) : '';
        };

        $scope.checkUrl = function(){
            if(!($scope.locale && $scope.version_code)){
                DS.logger.error('请选择Locales 和 Version Code')
            }
        }
    }
});

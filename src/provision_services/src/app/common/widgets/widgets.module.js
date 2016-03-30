define([
    './contenteditable',
    './ccTree',
    './dpMultiDropdown',
    './cascadeDropdown',
    './ccLoadingLayer',
    './dInputSync',
    './dHighChart',
    './dropdownBtn',
    './splitDropdown',
    './hasFeature',
    './hasPermission',
    './allSelectDire',
    './allSelectDire2',
    './fileDire',
    './fileModel',
    'common/utils/registerToModule'], function (contenteditable, ccTree, dpMultiDropdown, cascadeDropdown, ccLoadingLayer, dInputSync, dHighChart, dropdownBtn, splitDropdown, hasFeature, hasPermission, allSelectDire,allSelectDire2, fileDire, fileModel, rtm) {
    var authModName = 'app.widgets',
        mod = angular.module(authModName, []);
    rtm(
        contenteditable,
        ccTree,
        dpMultiDropdown,
        cascadeDropdown,
        ccLoadingLayer,
        dInputSync,
        dHighChart,
        dropdownBtn,
        splitDropdown,
        hasFeature,
        hasPermission,
        allSelectDire,
        allSelectDire2,
        fileDire,
        fileModel
    )(mod);
    return authModName;
});
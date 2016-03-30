define([
    './contenteditable',
    './ccTree',
    './dpMultiDropdown',
    './cascadeDropdown',
    './ccLoadingLayer',
    './dInputSync',
    './dpHighChart',
    './dropdownBtn',
    './splitDropdown',
    './hasFeature',
    './hasPermission',
    './allSelectDire',
    './allSelectDire2',
    './fileDire',
    './fileModel','./cache','./session',
    'common/utils/registerToModule'], function (contenteditable, ccTree, dpMultiDropdown, cascadeDropdown, ccLoadingLayer, dInputSync, dpHighChart, dropdownBtn, splitDropdown, hasFeature, hasPermission, allSelectDire, allSelectDire2, fileDire, fileModel,cache,session, rtm) {
    var authModName = 'app.widgets',
        mod = angular.module(authModName, []);
    rtm(
        contenteditable,
        ccTree,
        dpMultiDropdown,
        cascadeDropdown,
        ccLoadingLayer,
        dInputSync,
        dpHighChart,
        dropdownBtn,
        splitDropdown,
        hasFeature,
        hasPermission,
        allSelectDire,
        allSelectDire2,
        fileDire,
        fileModel,cache,session
    )(mod);
    return authModName;
});
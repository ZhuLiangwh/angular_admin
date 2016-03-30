/**
 * loads sub modules and wraps them up into the main module
 * this should be used for top-level module definitions only
 */
define([
  'app.config.module',
  'services/services.module',
  'common/widgets/widgets.module',
  'common/filters/filters.module',

  'ds/ds.module',
  'layouts/layouts.module',
  'aosrule/aosrule.module',
  'thememarket/thememarket.module',
  'staticresource/staticresource.module',
  'usermanagement/usermanagement.module',
  'adblocker/adblocker.module'
], function(appConfig, services, widgets, filters, ds, layouts, aosrule, thememarket, staticresource,
  usermanagement,adblocker) /*invoke*/ {
  'use strict';

  var appMod = angular.module('app', [
    'ui.bootstrap',
    'ngTable',
    'ui.router',
    'ngSanitize',
    'ngDolphin',

    appConfig,
    services,
    widgets,
    filters,
    ds,
    layouts,
    aosrule,
    thememarket,
    staticresource,
    usermanagement,
    adblocker
  ]); /*ngDeps*/
  return 'app';
});

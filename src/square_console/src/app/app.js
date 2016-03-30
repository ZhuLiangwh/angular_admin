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
  'staticresource/staticresource.module',
  'square/square.module',
  'usermanagement/usermanagement.module'
], function(appConfig, services, widgets, filters, ds, layouts, aosrule, staticresource, square,usermanagement) /*invoke*/ {
  'use strict';

  var appMod = angular.module('app', [
    'ui.bootstrap',
    'ngTable',
    'ui.router',
    'ngSanitize',
    'ng.ueditor',
    'ngDolphin',
    appConfig,
    services,
    widgets,
    filters,
    ds,
    layouts,
    aosrule,
    staticresource,
    square,
    usermanagement
  ]); /*ngDeps*/
  return 'app';
});

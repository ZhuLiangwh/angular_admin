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
  'homepage/homepage.module',
  'functionconfig/functionconfig.module',
  'staticresource/staticresource.module',
  'usermanagement/usermanagement.module'
], function(appConfig, services, widgets, filters, ds, layouts, aosrule, homepage, functionconfig, staticresource,usermanagement) /*invoke*/ {
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
    homepage,
    functionconfig,
    staticresource,
    usermanagement
  ]); /*ngDeps*/
  return 'app';
});

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
  'usermanagement/usermanagement.module'
], function(appConfig, services, widgets, filters, ds, layouts,usermanagement) /*invoke*/ {
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
    usermanagement
  ]); /*ngDeps*/
  return 'app';
});

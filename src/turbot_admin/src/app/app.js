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
  'turbotservice/turbotservice.module',
  'turbotstatistics/turbotstatistics.module',
  'staticresource/staticresource.module',
  'usermanagement/usermanagement.module',
  'turbotportrait/turbotportrait.module'
], function(appConfig, services, widgets, filters, ds, layouts, aosrule, turbotservice, turbotstatistics, staticresource, usermanagement,turbotportrait) /*invoke*/ {
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
    turbotservice,
    turbotstatistics,
    staticresource,
    usermanagement,
    turbotportrait
  ]); /*ngDeps*/
  return 'app';
});

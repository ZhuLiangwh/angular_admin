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
  'themestore/themestore.module',
  'webapps/webapps.module',
  'staticresource/staticresource.module',
  'usermanagement/usermanagement.module',
  'newthemestore/newthemestore.module',
  'themerecommended/themerecommended.module',
  'webads/webads.module'
], function(appConfig, services, widgets, filters, ds, layouts, aosrule, themestore, webapps, staticresource,usermanagement,newthemestore,themerecommended,webads) /*invoke*/ {
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
    themestore,
    webapps,
    staticresource,
    usermanagement,
    newthemestore,
    themerecommended,
    webads
  ]); /*ngDeps*/
  return 'app';
});

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
  'pushservice/pushservice.module',
  'ipushservice/ipushservice.module',
  'pcpushservice/pcpushservice.module',
  'promotionservice/promotionservice.module',
  'revenueservice/revenueservice.module',
  'staticresource/staticresource.module',
  'usermanagement/usermanagement.module'
], function(appConfig, services, widgets, filters, ds, layouts, aosrule, pushservice, ipushservice, pcpushservice,promotionservice,revenueservice, staticresource,usermanagement) /*invoke*/ {
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
    pushservice,
    ipushservice,
    pcpushservice,
    promotionservice,
    revenueservice,
    staticresource,
    usermanagement
  ]); /*ngDeps*/
  return 'app';
});

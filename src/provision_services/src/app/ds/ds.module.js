define([
  './apiService',
  'common/utils/registerToModule',
  './aosoperator',
  './aospackage',
  './aosruledata',
  './aossource',
  './aoslocale',
  './aosbookmark',
  './aosbookmarkfolder',
  './aosspeeddial',
  './aosspeeddialdesktop',
  './aosspeeddialscreen',
  './aosspeeddialfolder',
  './icon',
  './apk',
  './aospredata',
  './aosgesture',
  './aosstrategy',
  './aossearcherfolder',
  './aossearcher',
  './aossharecontent',
  './aostemplateshare',
  './aosrecommendshare',
  './exportpreset',
  './usermanagement',
  './pbookmark',
  './pbookmarkfolder',
  './pbookmarkpreset',
  './pspeeddial',
  './pspeeddialpreset',
  './psearcher',
  './psearcherpreset'
], function(apiService, rtm, aosoperator, aospackage, aosruledata, aossource, aoslocale, aosbookmark, aosbookmarkfolder, aosspeeddial, aosspeeddialdestop, aosspeeddialscreen, aosspeeddialfolder, icon, apk, aospredata, aosgesture, aosstrategy,aossearcherfolder, aossearcher, aossharecontent, aostemplateshare, aosrecommendshare,exportpreset,usermanagement, pbookmark, pbookmarkfolder, pbookmarkpreset,pspeeddial,pspeeddialpreset,psearcher,psearcherpreset) /*invoke*/ {
  var modName = 'app.ds',
    mod = angular.module(modName, []);
  rtm(apiService, aosoperator, aospackage, aosruledata, aossource, aoslocale, aosbookmark, aosbookmarkfolder, aosspeeddial, aosspeeddialdestop, aosspeeddialscreen, aosspeeddialfolder, icon,apk, aospredata, aosgesture, aosstrategy,aossearcherfolder, aossearcher, aossharecontent, aostemplateshare, aosrecommendshare,exportpreset,usermanagement, pbookmark, pbookmarkfolder, pbookmarkpreset,pspeeddial,pspeeddialpreset,psearcher,psearcherpreset)(mod);

  return modName;
});

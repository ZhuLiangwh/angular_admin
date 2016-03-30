define([
  './pcpreset.config',
  'common/utils/registerToModule',
  './pbookmark.list',
  './pbookmark.edit',
  './pbookmarkfolder.list',
  './pbookmarkfolder.edit',
  './pbookmarkpreset.list',
  './pbookmarkpreset.edit',
  './pspeeddial.list',
  './pspeeddial.edit',
  './pspeeddialpreset.list',
  './pspeeddialpreset.edit',
  './psearcher.list',
  './psearcher.edit',
  './psearcherpreset.list',
  './psearcherpreset.edit'
], function(pcpresetConfig, rtm, PCbookmarkListCtrl, PCbookmarkEditCtrl, PCbookmarkfolderListCtrl, PCbookmarkfolderEditCtrl, PbookmarkpresetListCtrl, PbookmarkpresetEditCtrl, PspeeddialListCtrl, PspeeddialEditCtrl,PspeeddialpresetListCtrl, PspeeddialpresetEditCtrl,PsearcherListCtrl, PsearcherEditCtrl,PsearcherpresetListCtrl, PsearcherpresetEditCtrl) /*invoke*/ {
  var modName = 'app.pcpreset',
    mod = angular.module(modName, []);
  rtm(PCbookmarkListCtrl, PCbookmarkEditCtrl, PCbookmarkfolderListCtrl, PCbookmarkfolderEditCtrl, PbookmarkpresetListCtrl, PbookmarkpresetEditCtrl, PspeeddialListCtrl, PspeeddialEditCtrl,PspeeddialListCtrl, PspeeddialEditCtrl,PspeeddialpresetListCtrl, PspeeddialpresetEditCtrl,PsearcherListCtrl, PsearcherEditCtrl,PsearcherpresetListCtrl, PsearcherpresetEditCtrl)(mod);


  pcpresetConfig(mod);
  return modName;
});

'use strict';

var MENUITEM_NAME = 'サンプルライブラリ';

/**
 * ライブラリのインスタンスを生成する
 *
 * @type {Kuina.ForwardedLibrary.InstanceCreator}
 * @param {!Kuina.ForwardedLibrary.InstanceCreatorOption} options
 * @return {SampleLibraryInstance}
 */
function createInstance(options) {
  return new SampleLibraryInstance(options);
}

var SampleLibraryInstance = (function() {
  var PROPERY_NAME = 'SAMPLE_PROP';

  /**
   * @constructor
   * @implements {Kuina.ForwardedLibrary.ForwardedLibraryInstance}
   * @param {!Kuina.ForwardedLibrary.InstanceCreatorOption} context
   */
  function SampleLibraryInstance(context) {
    this.context = context;
  }

  /**
   * @type {Kuina.ForwardedLibrary.Proxy}
   * @param {!string} operation ライブラリに要求された処理
   * @param {any[]} args 処理のための引数
   */
  SampleLibraryInstance.prototype.invoke = function(operation, args) {
    this[operation].apply(this, args);
  };

  SampleLibraryInstance.prototype.showSidebar = function() {
    var tmpl = HtmlService.createTemplateFromFile('sidebar.html');
    tmpl.proxyFnName = this.context.proxyFn.name;
    tmpl.callerValue = this.context.callerProperties.getProperty(PROPERY_NAME);
    tmpl.libraryValue = PropertiesService.getScriptProperties().getProperty(
      PROPERY_NAME
    );
    var sidebar = tmpl.evaluate().setTitle('実験用ライブラリ');
    SpreadsheetApp.getUi().showSidebar(sidebar);
  };

  SampleLibraryInstance.prototype.save = function(callerValue, libraryValue) {
    this.context.callerProperties.setProperty(PROPERY_NAME, callerValue);

    PropertiesService.getScriptProperties().setProperty(
      PROPERY_NAME,
      libraryValue
    );
  };

  SampleLibraryInstance.prototype.saveByEval = function(
    callerValue,
    libraryValue
  ) {
    var script =
      'PropertiesService.getDocumentProperties().setProperty("' +
      PROPERY_NAME +
      '",' +
      JSON.stringify(callerValue) +
      ')';
    this.context.evalInCaller(script);

    PropertiesService.getScriptProperties().setProperty(
      PROPERY_NAME,
      libraryValue
    );
  };

  return SampleLibraryInstance;
})();

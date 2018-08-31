'use strict';

/**
 * ドキュメントが開かれたときにサイドバーを表示させる
 *
 * @see https://developers.google.com/apps-script/guides/triggers/#onopene
 */
function onOpen() {
  var menu = SpreadsheetApp.getUi().createAddonMenu();
  menu.addItem(SampleLibrary.MENUITEM_NAME, proxySampleLibrary.name);
  menu.addToUi();
}

/**
 * サイドバーから直接ライブラリのメソッドを呼べないので、このメソッドを経由させる
 *
 * @type {Kuina.ForwardedLibrary.Proxy}
 * @param {?string} operation ライブラリに要求された処理
 * @param {?Array} args 処理のための引数
 * @return {any}
 */
function proxySampleLibrary(operation, args) {
  /** @type {Kuina.ForwardedLibrary.InstanceCreatorOption} */
  var opts = {
    // eslint-disable-next-line no-invalid-this
    caller: this,
    proxyFn: proxySampleLibrary,
    evalInCaller: evalInMe,
    callerProperties: PropertiesService.getDocumentProperties(),
  };
  var inst = SampleLibrary.createInstance(opts);
  return operation ? inst.invoke(operation, args) : inst.showSidebar();
}

/**
 * このスクリプトのスコープ内でライブラリの処理を実行する
 *
 * @param {string} s
 * @return {any}
 */
function evalInMe(s) {
  return eval(s);
}

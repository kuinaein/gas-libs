declare namespace Kuina.ForwardedLibrary {
  export interface ForwardedLibrary {
    MENUITEM_NAME: string;
    createInstance: InstanceCreator;
  }

  /**
   * サイドバーから直接ライブラリのメソッドを呼べないので、
   * 呼び出し側からこの型のメソッドを経由させる
   *
   * @param {string} operation ライブラリに要求された処理
   * @param {?any[]} args 処理のための引数
   */
  export type Proxy = (operation: string, args: any[]) => any;

  /**
   * ライブラリのインスタンスを生成する
   *
   * @param {!Kuina.ForwardedLibrary.InstanceCreatorOption} options
   * @return {Kuina.ForwardedLibrary.ForwardedLibraryInstance}
   */
  export type InstanceCreator = (
    options: InstanceCreatorOption
  ) => ForwardedLibraryInstance;

  export interface InstanceCreatorOption {
    /** 呼び出し側のグローバルthis */
    caller: object;
    /** 呼び出し側で定義されたプロクシメソッド */
    proxyFn: Proxy;
    /** 呼び出し側のスコープで処理を実行するためのeval */
    evalInCaller: typeof eval;
    /** 呼び出し側のプロパティストア */
    callerProperties: GoogleAppsScript.Properties.Properties;
  }

  export interface ForwardedLibraryInstance {
    /** ライブラリ側に処理を委譲する */
    invoke: Proxy;
    /** サイドバーを表示する */
    showSidebar(): void;
  }
}

declare const SampleLibrary: Kuina.ForwardedLibrary.ForwardedLibrary;

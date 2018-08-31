# Google Apps Script ライブラリのサンプルプロジェクト

- JSDoc は「Visual Studio Code で補完が効く」「ESLint がエラーを警告を出さない」程度に記述しています
  - なので本物の JSDoc には通らないかもしれません...

## ファイル説明

### 本体

- `Code.gs` 呼び出し側。スプレッドシートに仕込むもの
- `lib.gs, sidebar.html` ライブラリ側

## その他

- `.eslintrc.yml, package.json, yarn.lock` ESLint の構成
- `lib.d.ts` Visual Studio Code 用の型定義
- `.editorconfig` フォーマッタの指定
- `.vscode/settings.json` Visual Studio Code のプロジェクト設定。フォーマッタの指定等

## ライセンス

パブリックドメイン、CC0 と Unlicense のトリプルライセンスとします。

- Unlicense http://unlicense.org
- CC0 https://creativecommons.org/publicdomain/zero/1.0/deed.ja

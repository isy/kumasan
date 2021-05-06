---
title: 'tsdでTypeScriptの型定義とテストで戦う'
date: '2019-12-16'
category: 'dev'
---

この記事は[TypeScript Advent Calendar 2019](https://qiita.com/advent-calendar/2019/typescript) の 16日目の記事です。


「Mapped types」,「Conditional Types」などTypeScriptの型システムは高機能です。
しかし、高機能がゆえに複雑で直感的には分かりくい型を生み出していることも事実です。

TypeScriptの型定義は**型を返す関数**として扱うことができ、型がバグを生み出す原因にもなります。
そんな型でのバグをなくすために型のユニットテストを紹介します。

## tsd
型をテストするために[tsd](https://github.com/SamVerschueren/tsd)というライブラリを使用します。

tsdは`expectType`,`expectError`などの様々なアサーションで型定義をチェックすることができます。

## テスト
今回はjestを使ってテストを行うのでtsdとjestに関連するライブラリを用意します。

```bash:title=bash
yarn add -D tsd jest ts-jest @types/jest
```

#### package.json
次にpackage.jsonを編集します。

jestの設定を書いていきます。

```json:title=package.json
{
  "name": "tsd-unit-testing",
  "scripts": {
    "test": "jest",
  },
  "jest": {
    "preset": "ts-jest",
    "moduleFileExtensions": [
      "ts",
      "tsx",
      "js"
    ],
    "testMatch": [
      "**/test-dts/*.(ts|tsx|js)"
    ]
  },
  "devDependencies": {
    "@types/jest": "^24.0.23",
    "jest": "24.9.0",
    "ts-jest": "24.2.0",
    "tsd": "0.11.0",
    "typescript": "^3.7.3",
  },
}
```

#### 型定義
次に今回テストする型定義を準備します。

「TがUに含まれていればTを、そうでなければunknown」を返すConditional Typesです
```ts:title=types.ts
export type Condition<T, U> = T extends U ? T : unknown; 
```


#### テストを書く
実際にテストを書いていきます。

`expectType`はジェネリクスで指定した型が引数で指定した値と同じかを検査します。
以下の例では`'kuma'`型は`'inu' | 'neko'`型のUnion Typeには存在しないのでunknown型が返ってくるためテストは通ります🎉

```ts:title=test-dts/type.test-d.ts
import { expectType } from 'tsd';
import { Condition } from './types'

describe('Check type definitions', () => {
  it('Condition', () => {
    let animal: Condition<'kuma', 'inu' | 'neko'>

    expectType<unknown>(animal)
  })
});
```

```bash
❯ yarn test

$ jest
PASS  test-dts/type.test-d.ts
  Check type definitions
    ✓ Condition (1ms)

Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        4.715s
Ran all test suites.
✨  Done in 7.07s.
```

### おわりに
他にもいくつかアサーションが用意されているので気になる方はドキュメントをどうぞ！

普通に書いていると高度で複雑な型はあまり出てこないですが、ライブラリを作る際には活用できるかもしれません。([vue-next](https://github.com/vuejs/vue-next)で使っているのを観測しました)


#### 余談
昔、tsdというTypeSciptの型定義管理ツールがあったらしいですね...

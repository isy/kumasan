---
title: 'Gatsby × TypeScriptでGraphQL Code Generatorを使うと幸せになれる'
date: '2019-10-01'
category: 'dev'
thumb: 'gatsby-graphql-code-generator-thumb.png'
---


GatsbyでTypeScriptを使うとGraphQLクエリ部分の型定義が大変....

そもそもGraphQLスキーマに型が定義されているのにTypeScriptで型定義をするのは二重定義になってしまってイケてない

そんなときにTypeScriptの型定義を自動生成をしてくれる「[GraphQL Code Generator](https://graphql-code-generator.com/)」が幸せな気持ちにさせてくれた

## GraphQL Code Generator
![GraphQL Code Generator](gql-gen.png)

GraphQL Code GeneratorはGraphQLスキーマまたはGraphQLドキュメント(Query/Mutation/Subscription/Fragment)からTypeScriptの型定義を自動生成してくれるCLIツール。

GatsbyではGraphQLスキーマを自動生成してくれているので非常に相性が良い。使わない手はないぜって感じ


## 使いかた

#### インストール
まず、CLIと依存するパッケージをインストールします
```bash:title=bash
yarn add -D @graphql-codegen/cli @graphql-codegen/typescript @graphql-codegen/typescript-operations
```

`@graphql-codegen/typescript-operations`はデベロッパが定義したQuery等のGraphQLドキュメントを元に型を生成してくれるプラグインです。

他にも
- `@graphql-codegen/typescript-resolvers` - resolve関数の型を生成
- `@graphql-codegen/typescript-mongodb` - MongoDBモデルを元に型を生成

といったプラグインが多くあり、[ここ](https://graphql-code-generator.com/docs/plugins/)に良い感じにプラグインがまとまってるので、気になるかたは参考にしてみるといいかも

#### 構成ファイル
次に構成ファイルの`codegen.yml`をプロジェクトに作成します。

構成ファイルは`codegen.yml`または`codegen.json`を自動検出してくれます

```yml:title=codegen.yml
overwrite: true
schema: "http://localhost:8000/___graphql"
documents:
  - "./node_modules/gatsby-*/**/*.js"
  - "./src/**/*.{ts,tsx}"
generates:
  src/graphqlTypes.ts: // 型定義ファイルを生成するパス
    plugins:
      - "typescript"
      - "typescript-operations"

```

構成ファイルは`graphql-codegen init`コマンドでも作成することができます。

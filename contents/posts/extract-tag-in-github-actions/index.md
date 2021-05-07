---
title: 'GitHub Actionsでカンタンにタグを取得する方法'
date: '2021-05-07'
category: 'dev'
---


GitHub Actions では `$GITHUB_REF` でトリガーしたブランチやタグを `refs/tags/xxx` という形式で取得できるがこのタグ名部分だけを workflow で使うために `sed` や `perl` なんかを使うのはイけてないなーと思っていたら良い方法があったので紹介。


参考はこの記事 「[【シェル芸人への道】Bashの変数展開と真摯に向き合う - Qiita](https://qiita.com/t_nakayama0714/items/80b4c94de43643f4be51)」。ｶﾝｼｬ!

## GitHub Actions
結果だけいうと、変数展開の前方一致除去(最長一致)で取れた

こんな感じ

```yml
name: Tag

on:
  push:
    tags:
      - v*

jobs:
  tags:
    runs-on: ubuntu-latest
    steps:
      ## こんな感じで -> v0.0.1 とか
      - run: echo ${GITHUB_REF##*/}
      ## 実際に使うときは環境変数にしたりとか
      - name:
        run: echo "TAG=${GITHUB_REF##*/}" >> $GITHUB_ENV
      - run: echo ${{ env.TAG }}
```






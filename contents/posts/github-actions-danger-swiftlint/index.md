---
title: 'GitHub ActionsでDanger+Swiftlint'
date: '2020-01-06'
category: 'dev'
thumb: 'github-actions-danger-swiftlint.png'
---

GitHub ActionsでDanger + Swiftlintで自動コードレビューできるようにしたので記事にしました。

### Motivation
そもそもなぜCircleCIとかBitriseではなく、GitHub ActionsでDangerを動かすのが良いのかというと**アカウントを用意しなくていい**というところ。
今まで外部CIを使うと、Bot用のアカウントを用意するか自分のGitHubアカウントを使ってBotにコメントさせるかで全然イケてなかった。

その点GitHub Actionsはアカウントを用意せずにコメントを残すことができるのでよい。

## Workflow
ワークフローは以下のような感じ

```yml:title=.github/workflows/danger_swift.yml
name: Danger Swift

on: [pull_request]

jobs:
  danger:
    name: Danger
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@master
      - name: Setup Ruby
        uses: actions/setup-ruby@v1
        with:
            ruby-version: '2.x'
            architecture: 'x64'
      - name: Setup Danger
        run: |
          gem install danger danger-swiftlint
      - name: Run Danger
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        run: danger
```

GitHub Actionsの[ドキュメント](https://help.github.com/ja/actions/automating-your-workflow-with-github-actions/authenticating-with-the-github_token)にも書いてありますが`${{ secrets.GITHUB_TOKEN }}`は自動的に生成されます。

DangerはGitHub Actionsに対応しているのでdangerのgemをインストールしてコマンドをrunさせるだけで完成です。

## Dangerfile
Dangerfileは今回あまり関係ないので説明は省きますが、Rubyで書けるので以下のように設定して使ってみました。


```ruby:title=Dangerfile
# Warn when there is a big PR
warn("Big PR, try to keep changes smaller if you can :cry:") if git.lines_of_code > 1000

# Notify important file changes
important_files = %w(Podfile.lock Gemfile.lock Cartfile.resolved project.yml)

git.modified_files.map do |file|
  if important_files.include?(file)
    message "#{file} has changed. If you agree, ignore this comment."
  end
end

# Swiftlint
github.dismiss_out_of_range_messages
swiftlint.config_file = '.swiftlint.yml'
swiftlint.lint_files inline_mode: true
```

#### おわりに
Danger Swiftを使いたい場合はGitHubのMarketplaceに[danger/swift](https://github.com/marketplace/actions/danger-swift)のActionsが用意されているので使うとラクっぽい

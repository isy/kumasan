---
title: 'GitHub ActionsでDanger+Swiftlint'
date: '2020-01-06'
category: 'dev'
thumb: 'react-hooks-testing2.png'
---

## Workflow
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

## Dangerfile

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

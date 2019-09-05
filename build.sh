#!/bin/sh
yarn stdver

yarn build

git remote add github https://$GITHUB_TOKEN@github.com/LishiJ/vue-cutdown.git
git push github HEAD:master --follow-tags


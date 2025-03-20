#!/usr/bin/env sh

# abort on errors
set -e

# build
npm run build

# navigate into the build output directory
cd dist

# Create a .nojekyll file
touch .nojekyll

git init
git checkout -b main
git add -A
git commit -m 'deploy'

git push -f git@github.com:akazulak/netfonds-gruppe-girls-day-2025.git main:gh-pages

cd -

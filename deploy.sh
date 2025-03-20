#!/usr/bin/env sh

# abort on errors
set -e

# build
npm run build

# navigate into the build output directory
cd dist

# Create a .nojekyll file to allow files and folders starting with an underscore
touch .nojekyll

# if you are deploying to a custom domain
# echo 'www.example.com' > CNAME

git init
git checkout -b main
git add -A
git commit -m 'deploy'

# Update this line with your actual GitHub username
git push -f git@github.com:akazulak/netfonds-gruppe-girls-day-2025.git main:gh-pages

cd -

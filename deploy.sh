#!/bin/bash

# If a command fails then the deploy stops
set -e

printf "\033[0;32mDeploying updates to GitHub...\033[0m\n"

# Check Hugo version
echo "Using Hugo version:"
./node_modules/.bin/hugo/hugo version

# 1. Clean and Build the project
rm -rf public
./node_modules/.bin/hugo/hugo --gc --minify

# 2. Navigate to the public directory
cd public

# 3. Initialize a new git repository, set the branch to main, and add the remote
git init
git checkout -b main
git remote add origin https://github.com/hdicko/leidimen.git

# 4. Add changes, commit, and push to the gh-pages branch
git add .
git commit -m "Deploying to gh-pages"
git push --force origin main:gh-pages

# 5. Return to the project root
cd ..

printf "\033[0;32mDeployment complete!\033[0m\n"


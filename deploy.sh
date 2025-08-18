#!/bin/sh
# echo "# boni" >> README.md
# git init
# git add README.md
# git add .
# git commit -m "first commit"
# git branch -M main
# git remote add origin https://github.com/mennecy/boni.git
# git push -u origin main

# If a command fails then the deploy stops
set -e

printf "\033[0;32mDeploying updates to GitHub...\033[0m\n"

# Build the project.
# hugo # if using a theme, replace with `hugo -t <YOURTHEME>`

# Go To Public folder
# cd public

# Add changes to git.
# git add .

# Commit changes.
# msg="rebuilding site $(date)"
# if [ -n "$*" ]; then
#	msg="$*"
# fi
#git commit -m "$msg"

# Now the solution:
# ------------------
# Add a file in your project such as README.md

# git add .
# git commit -m "Somme changes"
# git branch -M main   
# Push source and build repos.
# git push -u origin master


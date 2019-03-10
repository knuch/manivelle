#!/bin/sh

DIRECTORY="web/app/themes/wise/resources/dist"
STYLEGUIDE_DIR="styleguide/"
BRANCH="dist/frontend"
BRANCH_BLOCKS="dist/blocks"
CURRENT_BRANCH=$(git branch | sed -n -e 's/^\* \(.*\)/\1/p')

# Check if the environment is ready for publishing ===========================
if [ "$CURRENT_BRANCH" != "master" ]
then
    echo "⚠️  Please run this script from master branch"
    exit 1;
fi

# if [[ $(git status -s) ]]
# then
#     echo "⚠️  The working directory is dirty. Please commit any pending changes."
#     exit 1;
# fi

jq --version || { echo "⚠️  You have jq installed on your machine (brew install jq)" ; exit 1; }

# Proceed =====================================================================
echo "rebuild frontend assets"
cd $STYLEGUIDE_DIR && yarn && yarn build
cd ..

echo "update package.json version to $1 and write a copy for publishing"
npm version $1
cp package.json $DIRECTORY/package.json
jq -e ".dependencies = {} | .devDependencies = {}" $DIRECTORY/package.json > $DIRECTORY/package.json.tmp && cp $DIRECTORY/package.json.tmp $DIRECTORY/package.json && rm $DIRECTORY/package.json.tmp

echo "backup dist content"
mkdir "$DIRECTORY-tmp"
cp -r $DIRECTORY/* "$DIRECTORY-tmp/"

echo "Deleting dist"
rm -rf $DIRECTORY
mkdir $DIRECTORY
git worktree prune
rm -rf .git/worktrees/$DIRECTORY/

echo "Checking out $BRANCH branch into dist"
git worktree add -B $BRANCH $DIRECTORY

echo "Removing existing files"
rm -rf $DIRECTORY/*

echo "Generating dist using the backup"
cp -r "$DIRECTORY-tmp"/* $DIRECTORY/
rm -rf "$DIRECTORY-tmp"

echo "Updating $BRANCH branch"
cd $DIRECTORY && git add --all && git commit -m "Publishing to $BRANCH (publish.sh)"
git push --force origin $BRANCH --tags


# blocks variables
BRANCH_BLOCKS="dist/blocks"
DIRECTORY_ROOT="web/app/themes/wise/resources/blocks"
DIRECTORY_BLOCKS="web/app/themes/wise/resources/blocks/dist"

# Proceed for blocks =====================================================================

echo "rebuild gutenberg blocks"
cd $DIRECTORY_ROOT && yarn && yarn build
cd ../../../../../..

echo "backup dist content"
mkdir "$DIRECTORY_BLOCKS-tmp"
cp -r $DIRECTORY_BLOCKS/* "$DIRECTORY_BLOCKS-tmp/"

echo "Deleting dist"
rm -rf $DIRECTORY_BLOCKS
mkdir $DIRECTORY_BLOCKS
git worktree prune
rm -rf .git/worktrees/$DIRECTORY_BLOCKS/

echo "Checking out $BRANCH_BLOCKS branch into dist"
git worktree add -B $BRANCH_BLOCKS $DIRECTORY_BLOCKS

echo "Removing existing files"
# rm -rf $DIRECTORY_BLOCKS/*
# rm $DIRECTORY_BLOCKS/.editorconfig
# rm $DIRECTORY_BLOCKS/.env.example
# rm $DIRECTORY_BLOCKS/.gitignore
# rm $DIRECTORY_BLOCKS/.yo-rc.json

echo "Generating dist using the backup"
cp -r "$DIRECTORY_BLOCKS-tmp"/* $DIRECTORY_BLOCKS/
rm -rf "$DIRECTORY_BLOCKS-tmp"

echo "Updating $BRANCH_BLOCKS branch"
cd $DIRECTORY_BLOCKS && git add --all && git commit -m "Publishing to $BRANCH_BLOCKS (publish.sh)"
git push --force origin $BRANCH_BLOCKS --tags

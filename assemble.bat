@echo off

git subtree split --branch deploy --prefix dist/
git push -u origin deploy
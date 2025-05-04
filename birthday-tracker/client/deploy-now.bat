@echo off
setlocal enabledelayedexpansion

echo Starting deployment...

REM Navigate to build directory
cd /d %~dp0\build

echo Initializing git...
git init

echo Adding files...
git add -A

echo Committing files...
git commit -m "Deploy to GitHub Pages"

echo Creating gh-pages branch...
git branch -M gh-pages

echo Setting remote...
git remote add origin https://github.com/aboomar524/web215.git

echo Pushing to GitHub...
git push -f origin gh-pages

echo Cleaning up...
cd ..
rmdir /s /q build\.git

echo Deployment complete!
pause
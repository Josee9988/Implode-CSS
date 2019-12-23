<!-- markdownlint-disable MD024-->
# **Change Log** 📜📝

All notable changes to the "**ImplodeCss**" package will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/) and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unreleased]

### Added

* WebPage uses TypeScript to create the controller which gathers the data and displays it.
* Npm node script 'npm run build' must be runned before doing any pushes to the repo as it removes all the data from the temp file (data.js) and transpiles the TypeScript into JavaScript.

## [**1.3.1**] - 2019-12-23

### Added

* Information about the error codes in the readme.md file.
* Imported esm globally in the main.js file aswell.
* More keywords in the package.json file.

## [**1.3.0**] - 2019-12-19

### Added

* More information about the author in the package.json file.
* Funding link in the package.json file.
* Errors are now controlled in the webpage.
* The webpage will show the number of html/php files found.
* The webpage will show the number of css files found.
* The webpage will show the number of ids found.
* The webpage will show the number of classes found.
* Better readability at the webpage.
* Better readability in the main.js file.

### Changed

* The CLI command will not show the files that doesn't contain CSS styles (empty).
* The CLI command will not show the number of html/php files found.
* The CLI command will not show the number of css files found.
* The CLI command will not show the number of ids found.
* The CLI command will not show the number of classes found.
* Image of the webpage in the readme.md file.
* Updated dependencies.

### Fixed

* If the server finds an error, it will now show an error, as before wasn't showing the error.
* If the server finds an error, it will try to close it in an expected way before showing the error.
* The extension will only show if there is a new version, if the user invokes the command implodeCss.
* Some typos.

### Removed

* Upcoming features in the readme.md file.
* Chalk import in the src/controller/getCssUnused.js file.

## [**1.2.0**] - 2019-12-13

### Added

* Result's page now it will also show the number of empty CSS files and their paths.

### Fixed

* Npm run tests, now it only triggers the cliTest file.

### Changed

* Audit and Fix code from the main.js file will receive an object of options instead of the options itself.
* Look of the headers of the result's page.
* Image of the result's page in the readme.md file.

## [**1.1.3**] - 2019-12-12

### Fixed

* Bug that stopped from showing the content.

## [**1.1.2**] - 2019-12-10

### Added

* Update-notifier, to see when a new version is out.

### Fixed

* Removed URLS when finding styles to avoid false positives.

## [**1.1.1**] - 2019-12-10

### Fixed

* Minor typos.
* Files without any css/ids (inconsistency) are now fixed and now it doesn't parse false positives.

### Removed

* Removed folders .vscode and node_modules from Github.

### Added

* More tests.
* Folder 'projectExampleForTests' inside the folder 'tests', that will contain an example project in order to do tests in it.

## [**1.1.0**] - 2019-12-07

### Added

* Now unexpected or unhandled errors will be controlled, and it will not throw errors.

## [**1.0.4**] - 2019-12-07

### Fixed

* Show information threw an error.

### Added

* NPM badges to the readme.md file.
* More error information in multiple catches.
* A .gitignore file with node_modules in it.

### Removed

* node_modules from the Github, as adding it to the .gitignore file.

### Changed

* If the user used unexpected arguments, it will show the manual and then the error.

## [**1.0.3**] - 2019-12-07

### Fixed

* Some typographical errors.

### Added

* More keywords to the package.json file.
* Documentation of the cliTest.js file.
* When fixing the code, now it will remove empty lines and lines with only '{}'.

### Changed

* Description of the package.
* Minor text changes in the readme.md file.

## [**1.0.2**] - 2019-12-06

### Added

* More screenshots to the readme.md file.

### Fixed

* Help command showed the version twice.

## [**1.0.1**] - 2019-12-06

### Added

* Basic readme documentation.

## [**1.0.0**] - 2019-12-06 **PUBLISH DATE**

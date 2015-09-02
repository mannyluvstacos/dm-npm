# dm-npm
The tool for npm-module maniacs.

## Description
* This command line tool helps to fulfill the daily jobs you have to do when working with npm modules.
* Documention in progress.

## Shorcuts
    dmn
    dm-npm

## Environment
- tested on ubuntu 14.04 with node 0.11.11 and 0.12.0

## Installation

    npm install dm-npm -g

## Prerequisits
- for publishing a module you have to create accounts on:
  - [npmjs.com]( http://npmjs.com )
  - [github.com](http://github.com)

## How to start
A short use case.

### Init a new npm module (with dm-npm style)
* online
  * create github repository
* local
  * clone the repository `git clone git@github.com:your_user_name/fooBar.git`
  * cd into the repository `cd fooBar`
  * run `dmn initi # to initialize the module`
  * run `dmn publish # if you want to publish the module directly`

Now you have a new running module with a task test.
The created module will have the following structure:

### module directory structure

.
|--bin/
   |--dm-fooBar
   |--gdm-fooBar
|--node_modules/
   |--co/
   |--dm-npm/
|--tasks/
   |--test/
      |--index.js
|--global.js
|--ideas.md
|--index.js
|--package.json
|--README.md
|--todo.md

### create your first task
* run `fooBar taskAdd`
  * this will command will prompt you for
    * the task name (give it the name baz for test purpose)
    * the task aliases (give it the alias bz for test purpose)
    * the task description
  * then the command will
    * create a task in the directory tasks with your given task name
    * create a entry in the README.md under the point tasks
    * create a hook for the task in the global.js
    * create a hook for the task in the index.js
    * open the task with your $EDITOR home environment variable (i am coding with vim and it will work for me)
* globally usage: presuming you named your task baz and gave it the alias bz you are now able to run
  * `fooBar bz` or `fooBar baz` and should see the outcoming
  * the output should look like `start baz`
* programmatically usage:
  * after publishing your module you can use your method in other modules
```javascript
var fooBarBaz = require("fooBar").baz;
fooBarBaz();
```
* README.md: if you look into the README.md of the project you will see a added documentation section for the task baz
* global.js: if you look into the global.js you see a added swith for your task bar, which makes it globally accessable
* index.js: if you look into the index.js you see a added switch for your task bar, which makes it programmatically accessable

### use the some basic tasks from dm-npm for your module
* after inititalizing the project you get some basic tasks a npm developer needs  for a project out of the box. these tasks are:
  * `fooBar # opens help. if you have installed markdown and lynx you can browse it with terminal ;-)`
  * `fooBar taskAdd # add a task to your module`
  * `fooBar prompt # open a prompt for your module where a lot of things are doable ;-)`
  * `fooBar todo # opens the todo.md of fooBar and lets you write something in there`
  * `fooBar idea # add a idea to the ideas.md via command line`
  * todo: `fooBar bumpVersion # bumps the version of the project (including git commit)`
  * todo: `fooBar publish # publishes fooBar (includes bumpVersion etc)`
  * todo: `fooBar configFileAdd # add a config file for fooBar`
  * todo: `fooBar installGlobal # install fooBar globally`
  * todo: `fooBar linkLocal # links your global fooBar installation locally to your development directory: this is very nifty, because you dont have to reinstall the tool globally on every change`
* the tasks marked with todo are currently available when you cd into your module and run `dmn bumpVersion` or `dmn publish` etc

## Generators
Most of the tasks here use the yield style and assume the code is contained within a generator function. For example you can use co for that. This style requires ES6 generators and has to be enabled in node 0.11.x or greater via the --harmony flag.

## Task List Documentation
* [bumpVersion](#bumpversion) todo
* [configFileAdd](#configfileadd) todo
* [idea](#idea)
* [init](#init)
* [installGlobal](#installglobal) todo
* [linkConfigFiles](#linkconfigfiles)
* [linkLocal](#linklocal) todo
* [linkNodeModules](#linknodemodules) todo
* [prompt](#prompt)
* [publish](#publish)
* [publishFolder](#publishfolder)
* [reinit](#reinit) todo
* [reinstall](#reinstall) todo
* [taskAdd](#taskadd) todo
* [todo](#todo)

## Tasks

### [help](tasks/help/index.js)
* provides the README.md of the module (if markdown and lynx are installed with terminal browsing ;-))

#### help global usage
```
dmn [help|-help|h|-h]
```

#### help programmatically usage
```javascript
var help = require("dm-npm").help;
var helpResult = help.start();
```

#### help steps

#### help features

#### help config
```javascript
{
    "help": {
    }
}
```

### [getCommonTasks](tasks/getCommonTasks/index.js)
* provides the dm-npm tasks that can be used by every dm-npm module

#### getCommonTasks global usage
```
dmn [getCommonTasks|gct]
```

#### getCommonTasks programmatically usage
```javascript
var getCommonTasks = require("dm-npm").getCommonTasks;
var getCommonTasksResult = getCommonTasks.start();
```

#### getCommonTasks steps

#### getCommonTasks features

#### getCommonTasks config
```javascript
{
    "getCommonTasks": {
    }
}
```

### [init](tasks/init/index.js)
* initiate a new npm module with the dm-npm flavor

#### global usage
```javascript
dmn [init|-init|i|-i]
```
#### programmatically usage

#### init steps
1. User Input: 
  * module name: for example fooBar
  * module Shortcut: for example fb
2. add .gitignore from [template](tasks/init/template/gitignore)
3. add package.json from [template](tasks/init/template/package.json)
4. add index.js from [template](tasks/init/template/index.js)
  * this file is the entrypoint for programatically usage
5. add global.js from [template](tasks/init/template/global.js)
  * this file is the entrypoint for usage from the command line
6. add README.md from [template](tasks/init/template/README.md)
7. add todo.md from [template](tasks/init/template/todo.md)
8. add test directory
9. add bin directory
  * the binary file for global usage
  * this one is important. adds the following alias, you can use from command line
    * `fooBar # runs your module`
    * `fb # alias for fooBar`
    * `gfb # cd into your module`
    * `fbg # cd into your module`
10. add tasks directory with test task
11. run `npm install`
  * install the dependencies
12. run task [create local link](#config)
  * 

After running that command your module is globally installed and you have the following features enabled for your module.

#### features

##### global (run from everywhere)
* `fb # opens cat's the readme.md`
* `fb prompt # opens a prompt with all added tasks`
* `fb todo # opens the todo.md file with vim`
* `fb idea # asks for a idea you have for your project and adds it to the end of ideas.md. creates ideas.md if not existent`
* `[gfb|fbg] # cd into the module directory (no need to create aliases)`

##### local (run from npm module directory)
* `gfb && dmn task add // adds a tasks in dir tasks and makes it programmatically and globally available`

### [publish](tasks/publish/index.js)

#### command
```javascript
dmn [publish|-publish]
```
#### publish steps
1. get/create root path (.git-repository with package.json for npm)
2. get git status 
3. switch git status
   - a) if git status (2) says nothing to commit, abort task (path clean)
   - b) if git status (2) says there is something to commit (go on)
4. commit current changes
5. bump version in package.json (see task [bump version](#bumpVersion))
6. commit the bump Version change
7. push commits
8. tag new version
9. push tags
10. npm publish

### [publishFolder](tasks/publishFolder/index.js)
* publishes all npm modules in a given folder

#### global usage
```javascript
dmn [publishFolder|pubFol|pf|-pf]
```

#### programmatically usage (todo)
```javascript
```

#### publishFolder steps
1. searches for publishFolder.path in ~/dm-npm.json for usage as default value
2. asks for the directory including the npm-modules destined to publish
  * dirctories starting with _ (underscore) will be ignored
3. then, a loop will run the task [publish](#publish) for every directory included in the prompted path


### [linkConfigFiles](tasks/linkConfigFiles/index.js)
* links files from given directory into home directory 

#### global usage
```
dmn [linkConfigFiles|lc]
```

#### programmatically usage

#### linkConfigFile steps
1. search for ~/.dm-npm.json and get linkConfigFiles.path as default value
  * for example ~/dotfiles/npm-modules-config
2. prompt user for directory where the npm module files are placed
3. links the src to the home directory
  * adds a . to the beginning of the filename and soft links it in the home directory
  * ie: ln -s ~/dotfiles/npm-modules-config/fb.json ~/.fb.json

### idea
* add ideas to the npm-module via shell (ideas will be added to ideas.md)
* examples 
```javascript
dmn idea // 
```

### prompt
* prompts for execution of the existent tasks of npm module
* examples 
```javascript
dmn prompt // 
```

### todo
* opens the todo.md file of the npm module
* examples 
```javascript
dmn todo // 
```

## Config
* you can place a .dm-npm.json file in your home directory (~/.dm-npm.json)
* the following things are allowed at the moment
```javascript
{
  "publishFolder": {
    "path": "~/code/dm"
  }
}
```

## Testing
- i am not really done here ;-)

    npm test

## Links
- [npm access problem](http://stackoverflow.com/questions/16151018/npm-throws-error-without-sudo)
- [node global acces problem](http://stackoverflow.com/questions/15636367/nodejs-require-a-global-module-package)
- [creating and publishing a node-js module]( https://quickleft.com/blog/creating-and-publishing-a-node-js-module/ )
- [npm run script environment](https://oncletom.io/2014/self-contained-node-scripts/)
- [tilde vs caret](https://nodesource.com/blog/semver-tilde-and-caret)

## Lessons Learned

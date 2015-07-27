// =========== [ REQUIRE ] ===========
var co = require("co");
var semver = require("semver");
var fs = require('fs');
var Prompt = require("./../../lib/prompt.js");
require("shelljs/global");

// =========== [ MODULE DEFINE ] ===========
var job = {};

// =========== [ job.start() ] ===========
job.start = co.wrap(function*() {
    try {

        var question = {
            type: "list",
            name: "release_type",
            message: "What do you want to do?",
            choices: [
                "patch",
                "minor",
                "major",
                "premajor",
                "preminor",
                "prepatch",
                "prerelease"
            ]
        };
        var answers =
            yield Prompt(question);


        var packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
        var lines = exec('git tag', {
            silent: true
        }).output;
        var newVersion = semver.inc(packageJson.version, answers.release_type);
        if (lines.indexOf(newVersion) > -1) {
            var tags = lines.split(/\r?\n/);
            tags.pop();
            tags.sort(semver.compare);
            newVersion = semver.inc(tags[tags.length - 1], answers.release_type);
        }
        sed('-i', /"version": *"[0-9]+.[0-9]+.[0-9]+"/, '"version": "' + newVersion + '"', 'package.json');

        var newVersionString = "new version: " + newVersion;
        var oldVersionString = "old version: " + packageJson.version
        console.log(oldVersionString.yellow, newVersionString.green);
    } catch (e) {
        console.log("Filename: ", __filename, "\n", e.stack);
    }

}); // job.start()

// =========== [ MODULE EXPORT ] ===========
module.exports = job;

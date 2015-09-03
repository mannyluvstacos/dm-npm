// =========== [ REQUIRE ] ===========
var co = require("co");

// =========== [ MODULE DEFINE ] ===========
var task = {};

// =========== [ task.start() ] ===========
task.start = co.wrap(function*(argv2, dirname) {
    try {
        run(argv2, dirname);
    } catch (e) {
        console.log("Filename: ", __filename, "\n", e.stack);
    }
    return yield Promise.resolve();
}); // task.start()

// =========== [ run ] ===========
var run = co.wrap(function*(argv2, dirname) {
    try {

        //TODO
        // add bumpVersion
        // add publish
        // add configFileAdd --> look at dm-tmux
        // add installGlobal
        // add linkLocal
        // add reinstall
        // add reinit
        // add upate dm-npm

        // =========== [ todo ] ===========
        if (["todo"].indexOf(argv2) > -1) {
            require("dm-npm").todo(dirname);
        }
        // =========== [ test ] ===========
        else if (["test", "-test"].indexOf(argv2) > -1) {
            var taskname = process.argv[3] || undefined;
            require("dm-npm").test(dirname, taskname);
        }
        // =========== [ taskAdd ] ===========
        else if (["taskAdd", "ta"].indexOf(argv2) > -1) {
            require("dm-npm").taskAdd(dirname);
        }
        // =========== [ idea ] ===========
        else if (["idea"].indexOf(argv2) > -1) {
            require("dm-npm").idea(dirname);
        }
        // =========== [ prompt ] ===========
        else if (["prompt", "p"].indexOf(argv2) > -1) {
            require("dm-npm").prompt(dirname);
        }
        // =========== [ prompt ] ===========
        else if (["publish"].indexOf(argv2) > -1) {
            console.log("in publish");
            require("./../publish/index.js").start(dirname);
        }
        // =========== [ help ] ===========
        else {
            require("dm-npm").help(dirname);
        }
    } catch (e) {
        console.log("Filename: ", __filename, "\n", e.stack);
    }
}); // run

// =========== [ MODULE EXPORT ] ===========
module.exports = task;

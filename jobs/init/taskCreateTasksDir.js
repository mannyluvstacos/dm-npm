// =========== [ REQUIRE ] ===========
var co = require("co");
var colors = require("colors");
require("shelljs/global");

// =========== [ MODULE DEFINE ] ===========
var job = {};

// =========== [ job.create ] ===========
/**
 * Create file .npmignore if it does not exists
 */
job.create = co.wrap(function*(templateDirPath, npmModuleName) {
    console.log("task create tasks directory started".yellow);

    var taskResult = {};

    // =========== [ copy template directory ] ===========
    cp('-R', templateDirPath + 'tasks', '.');

    // =========== [ test ] ===========
    if (test('-d', "./tasks")) {
        taskResult.success = true;
        taskResult.message = "tasks directory created";;
        console.log(taskResult.message.green);
    } else {
        taskResult.success = false;
        taskResult.message = "tasks directory not created";;
        console.log(taskResult.message.red);
    }

    console.log("task create tasks directory done".yellow);
    return yield Promise.resolve(taskResult);
}); // job.create

// =========== [ MODULE EXPORT ] ===========
module.exports = job;

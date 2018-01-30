const { exec } = require('child_process')
const fs = require("fs");
var jsonfile = require('jsonfile')

exec('node npm outdated -json > outdated.json', (err, stdout, stderr) => {
    if (err) {
        console.error(`exec error: ${err}`);
        return;
    }
    const stats = fs.statSync("outdated.json")
    if (stats.size === 0) {
        console.log("No updates available.");
        return;
    }
    var outdatedJson = jsonfile.readFileSync('outdated.json')
    var packageJson = jsonfile.readFileSync('package.json')
    if (outdatedJson.devDependencies !== null) {
        console.log("devDependencies")
        console.log("---------------")
        for (var prop in packageJson.devDependencies) {
            var msg = "Updating " + prop + " from " + packageJson.devDependencies[prop] +
                " to " + packageJson.devDependencies[prop]
            console.log(msg)
        }
    }
    if (outdatedJson.dependencies !== null) {
        console.log("dependencies")
        console.log("------------")
        for (var prop in packageJson.dependencies) {
            var msg = "Updating " + prop + " from " + packageJson.dependencies[prop] +
                " to " + packageJson.dependencies[prop]
            console.log(msg)
        }
    }
    jsonfile.writeFileSync('test.json', packageJson, { spaces: 2 })
});


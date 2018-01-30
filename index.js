const { exec } = require('child_process')
const fs = require("fs");
var jsonfile = require('jsonfile')

exec('npm outdated -json > outdated.json', (err, stdout, stderr) => {
    const stats = fs.statSync("outdated.json")
    if (stats.size === 0) {
        console.log("No updates available.");
        return;
    }
    var outdatedJson = jsonfile.readFileSync('outdated.json')
    var packageJson = jsonfile.readFileSync('package.json')
    if (packageJson.devDependencies !== null) {
        console.log("devDependencies")
        console.log("---------------")
        for (var prop in packageJson.devDependencies) {
            if(outdatedJson[prop] !== undefined &&
                outdatedJson[prop].latest !== "git") {
                    var msg = "Updating " + prop + " from " + packageJson.devDependencies[prop] +
                    " to " + outdatedJson[prop].latest
                packageJson.devDependencies[prop] = outdatedJson[prop].latest
                console.log(msg)
            }
        }
    }
    if (outdatedJson.dependencies !== null) {
        console.log("dependencies")
        console.log("------------")
        for (var prop in packageJson.dependencies) {
                if(outdatedJson[prop] !== undefined && 
                    outdatedJson[prop].latest !== "git") {
                var msg = "Updating " + prop + " from " + packageJson.dependencies[prop] +
                    " to " + outdatedJson[prop].latest
                packageJson.dependencies[prop] = outdatedJson[prop].latest
                console.log(msg)
            }
        }
    }
    jsonfile.writeFileSync('test.json', packageJson, { spaces: 2 })
});


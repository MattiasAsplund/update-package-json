const { exec } = require('child_process')
const fs = require("fs");
var jsonfile = require('jsonfile')
var outdatedJson
var packageJson

exec('npm outdated -json > outdated.json', (err, stdout, stderr) => {
    const stats = fs.statSync("outdated.json")
    if (stats.size === 0) {
        console.log("No updates available.");
        return;
    }
    outdatedJson = jsonfile.readFileSync('outdated.json')
    packageJson = jsonfile.readFileSync('package.json')
    check("devDependencies")
    check("dependencies")
    jsonfile.writeFileSync('test.json', packageJson, { spaces: 2 })
});

function check(hive) {
    if (packageJson[hive] !== null) {
        console.log(hive)
        console.log("-".repeat(hive.length))
        for (var prop in packageJson[hive]) {
            if(outdatedJson[prop] !== undefined &&
                outdatedJson[prop].latest !== "git") {
                    var msg = "Updating " + prop + " from " + packageJson[hive][prop] +
                    " to " + outdatedJson[prop].latest
                packageJson[hive][prop] = outdatedJson[prop].latest
                console.log(msg)
            }
        }
    }
}
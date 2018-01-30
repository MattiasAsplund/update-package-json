const { exec } = require('child_process')
var jsonfile = require('jsonfile')

exec('npm outdated json > outdated.json', (err, stdout, stderr) => {
  if (err) {
    console.error(`exec error: ${err}`);
    return;
  }
  var outdatedJson = jsonfile.readFileSync('outdated.json')
  var packageJson = jsonfile.readFileSync('package.json')
  for(var prop in packageJson.dependencies) {
      var msg = "Updating " +  prop + " from " + packageJson.dependencies[prop] +
        " to " + packageJson.dependencies[prop];
      console.log(msg)
  }
  jsonfile.writeFileSync('test.json', packageJson, {spaces: 2})
  });


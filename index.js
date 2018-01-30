const { exec } = require('child_process')
var jsonfile = require('jsonfile')

exec('npm outdated json > outdated.json', (err, stdout, stderr) => {
  console.log("He")
  if (err) {
    console.error(`exec error: ${err}`);
    return;
  }
  console.log(`${stdout}`);
});

var file = 'package.json'
var obj = jsonfile.readFileSync(file);
for(var prop in obj.dependencies) {
    var msg = "Updating " +  prop + " to " + obj.dependencies[prop]
    console.log(msg)
}
jsonfile.writeFileSync('test.json', obj, {spaces: 2})

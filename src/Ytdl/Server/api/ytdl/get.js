const util = require('util');
const exec = util.promisify(require('child_process').exec);

async function redis() {
  console.log('redis called')
  const { stdout, stderr } = await exec('echo "BLPOP list 1" | redis-cli -h redis | sed -n 2p');
//   console.log('stdout:', stdout);
//   console.log('stderr:', stderr);
  if(stdout[0] == '(') {

  } else {
    var a = JSON.parse(stdout);
    var b = await conv(a)
    console.log(a);
  }
}


async function curl(data) {
    const { stdout, stderr } = await exec('curl todos:80/api/todos/auth/cancelNumber -X POST -H "Content-Type: application/json" -d \'{"id":"' + data.id + '"}\'');
    // console.log('stdout:', stdout);
    // console.log('stderr:', stderr);
    if(stdout[0] == '(') {
        return false;
    } else {
        var a = JSON.parse(stdout);
        console.log(a);
        return a;
    }
}

async function conv(data) {
    const { stdout, stderr } = await exec('node index.js ' + data.url);
    // console.log('stdout:', stdout);
    // console.log('stderr:', stderr);
    if(stdout[0] == '(') {
        return false;
    } else {
        // var a = JSON.parse(stdout);
        console.log(stdout);
        var b = await curl(data)
        return b;
    }
}
redis();
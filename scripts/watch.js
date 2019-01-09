const fs = require('fs');
const chokidar = require('chokidar');
const { execSync } = require('child_process');

function exec(cmd) {
  execSync(cmd, { stdio: "inherit", env: process.env });
}

fs.readdirSync('./packages/').map((package) => {
    chokidar.watch('./packages/' + package + '/src/').on('change', 
        () => {
            exec('npm run build --prefix ./packages/' + package);
            console.log('Built ' + package)
        })
    
    chokidar.watch('./packages/' + package + '/dist/').on('change', 
        () => {
            exec('lerna link');
            console.log('Linked');
        })
})

console.log('Watching');
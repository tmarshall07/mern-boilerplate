// Load sensitive environmental variables
require('dotenv').config({ path: `${__dirname}/.env` });

const shell = require('shelljs');

// Install client dependencies
shell.cd(`client`);
shell.exec('yarn install --production');

// Build for production
shell.exec('yarn build');

console.log('Build script complete');

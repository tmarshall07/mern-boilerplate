// Load sensitive environmental variables
require('dotenv').config({ path: `${__dirname}/.env` });

const shell = require('shelljs');

// Set Font Awesome Pro token
// https://fontawesome.com/how-to-use/on-the-web/setup/using-package-managers
// shell.exec(`
//   npm config set "@fortawesome:registry" https://npm.fontawesome.com/ && \
//   npm config set "//npm.fontawesome.com/:_authToken" ${process.env.FONT_AWESOME_TOKEN}
// `);

// Install client dependencies
shell.cd(`client`);
shell.exec('yarn install --production');

// Build for production
shell.exec('yarn build');

console.log('Build script complete');

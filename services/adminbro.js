const fs = require('fs');
const AdminBro = require('admin-bro');
const AdminBroExpress = require('@admin-bro/express');
const AdminBroMongoose = require('@admin-bro/mongoose');

const User = require('../schemas/users');

const relativePath = '../schemas';
const normalizedPath = require('path').join(__dirname, relativePath);

// Load all schemas in the schemas directory
const schemas = [];
fs.readdirSync(normalizedPath).forEach((file) => {
  schemas.push(require(`${relativePath}/${file}`));
});

exports.setup = () => {
  // Set up adminbro
  AdminBro.registerAdapter(AdminBroMongoose);
  const adminBro = new AdminBro({
    databases: [],
    resources: schemas,
    rootPath: '/admin',
  });

  const adminBroRouter = AdminBroExpress.buildAuthenticatedRouter(adminBro, {
    authenticate: async (email, password) => {
      const user = await User.findOne({ email });
      if (user) {
        // If password is validated and the user is more than a user or the root user
        if (user.validatePassword(password)) {
          return user;
        }
      }
      return false;
    },
    cookiePassword: process.env.COOKIE_PASSWORD,
  });

  return { adminBroRouter, adminBro };
};

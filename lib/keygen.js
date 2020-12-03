const bcrypt = require('bcrypt');
const crypto = require('crypto');

exports.encrypt = (string) => bcrypt.hashSync(string, bcrypt.genSaltSync(8), null);

exports.compare = (originalString, newString) => bcrypt.compareSync(originalString, newString);

exports.generate = () => {
  const buffer = crypto.randomBytes(20);
  return buffer.toString('hex');
};

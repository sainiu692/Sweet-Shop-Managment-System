const validator = require("validator");

const validateRegisterData = (req) => {
  const { firstName, lastName, emailId, password } = req.body;

  if (!firstName || !lastName || !emailId || !password) {
    throw new Error("All fields are required");
  }

  if (!validator.isEmail(emailId)) {
    throw new Error("Invalid email address");
  }

  if (!validator.isStrongPassword(password)) {
    throw new Error("Password is weak,enter a strong password");
  }
};

module.exports = {
  validateRegisterData,
};

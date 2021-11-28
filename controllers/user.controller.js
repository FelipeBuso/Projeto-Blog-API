const ApiError = require('../utils/ApiError');
const HttpCodes = require('../utils/HttpCodes');
const UserService = require('../services/user.services');
const generateJWT = require('../utils/generateJWT');

async function createUser(req, res, next) {
  try {
    const { displayName, email, password, image } = req.body;

    const emailExists = await UserService.getUserByEmail(email);

    if (!emailExists) {
      await UserService.createUserInDB({ displayName, email, password, image });
      const token = generateJWT({ displayName, email });
      console.log(token);
      return res.status(HttpCodes.code.OK).json({ token });
    }
  
    return next(ApiError.alreadyRegistered());
  } catch (err) {
    return next(ApiError.internalServerError());
  }
}

module.exports = {
  createUser,
};
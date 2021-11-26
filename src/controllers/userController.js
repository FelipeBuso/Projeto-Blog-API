const { createToken } = require('../helpers/jwt');
const statusCodes = require('../schemas/statusCodesSchema');
const userService = require('../services/userService');

module.exports = {
  create: async (request, response, next) => {
    const { displayName, email, password, image } = request.body;

    try {
      await userService.create({ displayName, email, password, image });

      const token = createToken({ displayName, email });

      return response.status(statusCodes.created).json({ token });
    } catch (error) {
      return next(error);
    }
  },

  getAll: async (_request, response, next) => {
    try {
      const users = await userService.getAll();

      return response.status(statusCodes.ok).json(users);
    } catch (error) {
      return next(error);
    }
  },
};
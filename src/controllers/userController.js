const statusCodes = require('../schemas/statusCodesSchema');
const userService = require('../services/userService');

module.exports = {
  create: async (request, response, next) => {
    const { displayName, email, password, image } = request.body;

    try {
      const token = await userService.create({ displayName, email, password, image });

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

  getById: async (request, response, next) => {
    const { id } = request.params;

    try {
      const user = await userService.getById(id);

      return response.status(statusCodes.ok).json(user);
    } catch (error) {
      return next(error);
    }
  },
};
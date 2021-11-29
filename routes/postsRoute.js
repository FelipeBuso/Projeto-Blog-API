const postsRouter = require('express').Router();

const { 
  createPostController, 
  getAllPostsController, 
  getPostByIdController,
} = require('../controllers/postsController');

const { 
  validatePostFields, 
  validateExistingCategories,
} = require('../middlewares/postsValidations');

const { checkValidToken } = require('../middlewares/userValidations');

postsRouter.post(
  '/',
  validatePostFields,
  validateExistingCategories,
  checkValidToken,
  createPostController,
);

postsRouter.get(
  '/',
  checkValidToken,
  getAllPostsController,
);

postsRouter.get(
  '/:id',
  checkValidToken,
  getPostByIdController,
);

module.exports = postsRouter;
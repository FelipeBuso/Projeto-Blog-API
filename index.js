const express = require('express');
const UserController = require('./controllers/userController');
const CategoryController = require('./controllers/categoryController');
const PostController = require('./controllers/postController');
const validateJWT = require('./auth/auth');

require('dotenv').config();

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`ouvindo porta ${PORT}!`));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.get('/user', validateJWT, UserController.getAll);
app.get('/user/:id', validateJWT, UserController.getById);
app.get('/categories', validateJWT, CategoryController.getAll);
app.get('/post', validateJWT, PostController.getAll);

app.post('/user', UserController.createUser);
app.post('/login', UserController.login);
app.post('/categories', validateJWT, CategoryController.createCategory);
app.post('/post', validateJWT, PostController.createPost);
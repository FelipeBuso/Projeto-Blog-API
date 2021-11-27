const express = require('express');
const bodyParser = require('body-parser');

const user = require('./router/user');
const login = require('./router/login');

const PORT = process.env.PORT || 3000;

const app = express();
app.use(bodyParser.json());

app.use('/', user);
app.use('/login', login);

// não remova esse endpoint, e para o avaliador funcionar

app.get('/', (request, response) => {
  response.send();
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

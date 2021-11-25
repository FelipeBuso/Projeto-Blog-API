const express = require('express');

const app = express();
const PORT = 3000;
const usersRoutes = require('./routes/usersRoutes');

app.listen(PORT, () => console.log(`Ouvindo porta ${PORT}!`));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', usersRoutes);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
//

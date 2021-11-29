const express = require('express');
const validateToken = require('../auth/jwt');

const router = express.Router();
const NewUser = require('../services/userServices');

router.post('/', async (req, res) => {
  try {
    const { displayName, email, password, image } = req.body;
    
    const newUser = await NewUser.create(displayName, email, password, image);
    if (newUser.message === 'User already registered') return res.status(409).json(newUser);
    if (typeof newUser.message === 'string') return res.status(400).json(newUser);

    return res.status(201).json(newUser);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: 'Something went wrong' });
  }
});

router.get('/', validateToken, async (req, res) => {
  try {
    const getUsers = await NewUser.getAllUsers();

    return res.status(200).json(getUsers);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: 'Something went wrong' });
  }
});

router.get('/:id', validateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const userById = await NewUser.getUserById(id);

    if (typeof userById.message === 'string') {
      return res.status(404).json(userById);
    }

    return res.status(200).json(userById);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: 'Something went wrong' });
  }
});

module.exports = router;
const Joi = require('joi');
const { getByEmail } = require('../services/userServices');

const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/im;

const userSchema = Joi.object({
  displayName: 
    Joi.string()
    .min(8)
    .required()
    .messages({ 'string.min': '"displayName" length must be at least 8 characters long' }),
  email: 
    Joi.string()
    .regex(emailRegex)
    .required()
    .messages({ 
      'string.pattern.base': '"email" must be a valid email',
      'any.required': '"email" is required',
    }),
  password: 
    Joi.string()
    .min(6)
    .max(6)
    .required()
    .messages({
      'string.min': '"password" length must be 6 characters long',
      'string.max': '"password" length must be 6 characters long',
      'any.required': '"password" is required',
    }),
  image:
    Joi.string(), 
});

const userDataValidation = (req, res, next) => {
  const { error } = userSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};

const checkRepeatedEmail = async (req, res, next) => {
  const { email } = req.body;
  const getUserByEmail = await getByEmail(email);
  if (getUserByEmail) {
    return res.status(409).json({ message: 'User already registered' });
  }
  next();
};

module.exports = {
  userDataValidation,
  checkRepeatedEmail,
};
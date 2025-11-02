import Joi from 'joi';

const validation = {
  signUp: Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    phoneNumber: Joi.string().pattern(/^[0-9]{10,15}$/).required(),
    gender: Joi.string().valid('Male', 'Female', 'Other').required(),
    profileFor: Joi.string().required(),
    dateOfBirth: Joi.date().required(),
    height: Joi.string().optional(),
    country: Joi.string().optional(),
    city: Joi.string().optional(),
    state: Joi.string().optional(),
    residentialStatus: Joi.string().optional(),
    education: Joi.string().optional(),
    workExperience: Joi.string().optional(),
    occupation: Joi.string().optional(),
    income: Joi.string().optional(),
    maritalStatus: Joi.string().optional(),
    motherTongue: Joi.string().optional(),
    religion: Joi.string().optional(),
    caste: Joi.string().optional(),
    sect: Joi.string().optional(),
  }),

  // ✅ Add login validation
  login: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  }),
};

export default validation;

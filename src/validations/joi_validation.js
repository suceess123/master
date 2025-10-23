import Joi from 'joi';
 const validation={

singUp:{
        name: Joi.string().min(3).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
        phoneNumber: Joi.string().pattern(/^[0-9]{10,15}$/).required(),
        gender: Joi.string().valid('Male','Female','Other').required(),
        profileFor: Joi.string().required(),
        dateOfBirth: Joi.date().required(),
        height: Joi.string(),
        country: Joi.string(),
        city: Joi.string(),
        state: Joi.string(),
        residentialStatus: Joi.string(),
        education: Joi.string(),
        workExperience: Joi.string(),
        occupation: Joi.string(),
        income: Joi.string(),
        maritalStatus: Joi.string(),
        motherTongue: Joi.string(),
        religion: Joi.string(),
        caste: Joi.string(),
        sect: Joi.string()
}

 }
    
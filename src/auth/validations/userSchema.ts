import * as Joi from "joi";

export const createUser = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});

export const loginUser = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

import * as Joi from "joi";

export const itemsSchema = Joi.object({
  user: Joi.string().guid().required(),
  url: Joi.string().required(),
  description: Joi.string().optional(),
});

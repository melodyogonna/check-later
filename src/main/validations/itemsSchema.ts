import joi from "joi";

export const itemsSchema = joi.object({
  user: joi.string().guid().required(),
  url: joi.string().required(),
  description: joi.string().optional(),
});

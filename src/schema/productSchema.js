import Joi from "joi";
const productValidate = Joi.object({
  name: Joi.string().required().trim(),
  image: Joi.string().required().trim(),
  price: Joi.number().required(),
  description: Joi.string().trim(),
  categoryId: Joi.string().required(),
});
export default productValidate;

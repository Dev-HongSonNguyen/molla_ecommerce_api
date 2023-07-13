import Joi from "joi";
const cartValidate = Joi.object({
  productId: Joi.string().required(),
  quantity: Joi.number().integer().min(1).required(),
  price: Joi.number().min(0).required(),
  totalPrice: Joi.number().min(0).required(),
});
export default cartValidate;

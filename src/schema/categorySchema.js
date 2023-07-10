import Joi from "joi";
const categoryValidate = Joi.object({
  _id: Joi.string(),
  name: Joi.string().required().trim(),
});
export default categoryValidate;

import Joi from "joi";
const categoryValidate = Joi.object({
  _id: Joi.string(),
  name: Joi.string().required().trim().messages({
    "string.empty": "Vui lòng nhập vào tên danh mục sản phẩm",
  }),
});
export default categoryValidate;

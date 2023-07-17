import Joi from "joi";
const productValidate = Joi.object({
  _id: Joi.string(),
  name: Joi.string().required().trim().messages({
    "string.empty": "Vui lòng nhập dữ liệu vào trường name",
  }),
  image: Joi.string().required().trim().messages({
    "string.empty": "Vui lòng nhập vào trường image",
  }),
  price: Joi.number().min(10).required().messages({
    "number.min": "Vui lòng nhập giá phải lớn hơn 10",
  }),
  description: Joi.string().trim().messages({
    "string.empty": "Vui lòng nhập vào trường description",
  }),
  categoryId: Joi.string().required().messages({
    "string.empty": "Vui lòng chọn category",
  }),
});
export default productValidate;

import Joi from "joi";
const signupValidate = Joi.object({
  name: Joi.string().trim(),
  email: Joi.string().email().required().trim().messages({
    "string.email": "Email không đúng định dạng",
  }),
  password: Joi.string().required().min(6).trim().messages({
    "string.min": "Mật khẩu tối thiệu 6 kí tự !",
    "string.empty": "Trường dữ liệu bắt buộc phải nhập",
  }),
  confirmPassword: Joi.string().valid(Joi.ref("password")).required().messages({
    "any.only": "Mật khẩu không khớp",
  }),
});
const signinValidate = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});
export { signinValidate, signupValidate };

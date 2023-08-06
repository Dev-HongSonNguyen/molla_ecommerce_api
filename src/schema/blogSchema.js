import Joi from "joi";
const blogVlidate = Joi.object({
    _id: Joi.string(),
    title: Joi.string().required().trim().messages({
        "string.empty": "Vui lòng nhập dữ liệu vào trường title",
    }),
    image: Joi.string().required().trim().messages({
        "string.empty": "Vui lòng nhập vào trường image",
    }),
    extract: Joi.string().required().trim().messages({
        "string.empty": "Vui lòng nhập vào trường extract",
    }),
});
export default blogVlidate;

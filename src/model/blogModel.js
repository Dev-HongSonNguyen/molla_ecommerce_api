import mongoose from "mongoose";
const blogSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
        extract: {
            type: String,
            required: true,
        },
    },
    { versionKey: false, timestamps: true }
);
export default mongoose.model("Blog", blogSchema);

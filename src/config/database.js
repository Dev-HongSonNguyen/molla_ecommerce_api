import mongoose from "mongoose";

const connectDB = async (url) => {
  try {
    const conn = await mongoose.connect(url);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(`Error: ${err.message}`);
    process.exit(1);
  }
};
export default connectDB;

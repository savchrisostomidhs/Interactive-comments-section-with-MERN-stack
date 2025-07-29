import mongoose from "mongoose";

const connectDB = async () => {
    try {
        mongoose.set("strictQuery", false);
        const connect = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`DB connected ${connect.connection.host}`)
    } catch (error) {
        console.error("Database connection failed:", error);
        process.exit(1);
    }
}

export default connectDB
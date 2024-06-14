import mongoose from "mongoose";

const dbConnect = async () => {
    try {
        const connected = await mongoose.connect(process.env.MONGO_URL);
        mongoose.set("strictQuery",true)
        console.log(`Mongodb connected: ${connected.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
}

export default dbConnect;

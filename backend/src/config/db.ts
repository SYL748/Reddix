import mongoose from "mongoose";

const connectToDatabase = async () => {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/reddit_clone");
        console.log("Successfully connected to database")
    } catch (error) {
        console.log("Couldn't connect to database", error)
        process.exit(1)
    }
}

export default connectToDatabase
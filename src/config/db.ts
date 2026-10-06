import mongoose from "mongoose";

export const connectToDB = async (mongoURI: string) => {
    try {
        await mongoose.connect(mongoURI);
        console.log("Database connected");
        mongoose.connection.on("disconnected", () => console.log("Database disconnected"));
        mongoose.connection.on("error", (error) => console.log(error));
    } catch(error: unknown) {
        console.log(error);

        process.exit(1);
    }
}
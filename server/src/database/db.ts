import mongoose from "mongoose";

const connectdb = (uri: string) => {
    try {
        mongoose.connect(uri, {
        dbName: "graphql",
        });
        console.log("MongoDB connected");
    } catch (error) {
        console.log(error);
    }
};

export { connectdb };
import mongoose from "mongoose";

export const dbConnection = () => {
  console.log("MONGO_URI:", process.env.MONGO_URI); // Debug log
  mongoose
    .connect(process.env.MONGO_URI, {
      dbName: "MERN_JOB_SEEKING",
    })
    .then(() => {
      console.log("Connected to database.");
    })
    .catch((err) => {
      console.log(`Some Error occurred. ${err}`);
    });
};

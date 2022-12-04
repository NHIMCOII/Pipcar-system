import dotenv from "dotenv";
import mongoose from "mongoose";

import { UserSeeder } from "./user";

//config
dotenv.config();

const DBSeed = async () => {
  try {
    mongoose.connect(
      process.env.MONGO_URI || "mongodb://localhost:27017/pipcarsystem"
    );
    //seed collection
    await UserSeeder();

    mongoose.connection.close();
  } catch (err) {
    console.log(err);
  }
};

DBSeed();

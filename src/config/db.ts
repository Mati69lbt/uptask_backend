import mongoose from "mongoose";
import colors from "colors";
import { exit } from "node:process";

export const connectDB = async () => {
  try {
    const { connection } = await mongoose.connect(process.env.DATABASE_URL);
    const url = `${connection.host}:${connection.port}`;
    console.log(colors.bgBlue.yellow.bold(`===> MongoDB conectado en: ${url}`));
  } catch (error) {
    console.log(colors.bgWhite.red.bold("Error al conectar a MongoDB"));

    exit(1);
  }
};

// video 001 creando el modelo
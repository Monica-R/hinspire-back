// Aquí establecemos la conexión con la BBDD, en esta ocasión, utilizaremos Mongo DB con mongoose
import mongoose from "mongoose";

// Conexión a la BBDD
const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://moniroka41:4QXNKhor1nJgubs2@cluster0.l8qlh.mongodb.net/hinspire-db";

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    const dbName = mongoose.connection.name;
    console.log(`Name database: ${dbName}`);
  } catch (error) {
    console.error("Error connecting to database", error);
  }
};
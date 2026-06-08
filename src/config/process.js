import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.resolve("./src/config/.env") });

const PORT = process.env.PORT || 80;
const MONGO_URI = process.env.MONGO_URI;

export { PORT, MONGO_URI };

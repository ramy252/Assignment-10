import dotenv from "dotenv";
import { resolve } from "node:path";

export const NODE_ENV = process.env.NODE_ENV 
const  envPath = {
    development :"dev.env",
    // staging :"staging.env",
    production :"prod.env"
}

dotenv.config({path:resolve(`./config/${envPath.development}`)})

export const PORT = process.env.PORT;
export const DB_URL = process.env.DB_URL;

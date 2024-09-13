import dotenv, { populate } from "dotenv";
import { connectdb } from "./database/db.js";
import { connectGraphQL } from "./graphql/graphql.js";
dotenv.config({ path: "./.env" });

export const envMode = process.env.NODE_ENV?.trim() || "DEVELOPMENT";
const port = Number(process.env.PORT) || 3000;

const mongoURI = process.env.MONGO_URI!;
connectdb(mongoURI);

connectGraphQL(port, envMode);
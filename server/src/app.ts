import express from "express";
import cors from "cors";
import { errorMiddleware } from "./middlewares/error.js";
import morgan from "morgan";
import dotenv from "dotenv";
import { connectdb } from "./database/db.js";
import { connectGraphQL } from "./graphql/graphql.js";
import { expressMiddleware } from "@apollo/server/express4"

dotenv.config({ path: "./.env" });
export const envMode = process.env.NODE_ENV?.trim() || "DEVELOPMENT";
const port = Number(process.env.PORT) || 3000;

const mongoURI = process.env.MONGO_URI!;
connectdb(mongoURI);

const server = connectGraphQL();
await server.start()

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: " * ", credentials: true }));
app.use(morgan("dev"));
app.use(errorMiddleware);

app.use("/graphql", expressMiddleware(server));

app.get("/", (req, res) => {
  res.send("Hello, World!");
});


app.get("*", (req, res) => {
  res.status(404).json({
    success: false,
    message: "Page not found",
  });
});

app.listen(port, () =>
  console.log("Server is working on Port:" + port + " in " + envMode + " Mode.")
);

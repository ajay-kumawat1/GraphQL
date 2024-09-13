// import express from "express";
// import cors from "cors";
// import { errorMiddleware } from "./middlewares/error.js";
// import morgan from "morgan";
import dotenv, { populate } from "dotenv";

// package for Apollo Server configuration
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { schema } from "./graphql/schema/schema.js";
import { connectdb } from "./database/db.js";
import { getAllUsers, getUserById } from "./controllers/user.js";
import { getAllCourses, getCourse } from "./controllers/course.js";

dotenv.config({ path: "./.env" });
export const envMode = process.env.NODE_ENV?.trim() || "DEVELOPMENT";
const port = Number(process.env.PORT) || 3000;

const mongoURI = process.env.MONGO_URI!;
connectdb(mongoURI);

const Users: {
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
} [] = [];

// Apollo Server Configuration
const server = new ApolloServer({
  typeDefs: schema,
  resolvers: {
    Mutation: {
      newUser: (parent, { name, email, password, isAdmin }) => {
        Users.push({ name, email, password, isAdmin });
        return "New User Created";
      }
    },

    Query: {
      users: getAllUsers,
      courses: getAllCourses,
      course: getCourse,
      sampleUsers: () => {
        return Users;
      },
    },
    Course: {
      instructor: async (course) => {
        return await getUserById(course.instructor);
      },
    },
  },
});

// Start Apollo Server
startStandaloneServer(server, {
  listen: {
    port,
  },
})
  .then(() => {
    console.log(`Server is working on Port: ${port} in ${envMode} Mode.`);
  })
  .catch((error) => {
    console.error(error);
  });

// const app = express();
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(cors({ origin: " * ", credentials: true }));
// app.use(morgan("dev"));
// app.use(errorMiddleware);

// app.get("/", (req, res) => {
//   res.send("Hello, World!");
// });

// // your routes here

// app.get("*", (req, res) => {
//   res.status(404).json({
//     success: false,
//     message: "Page not found",
//   });
// });

// app.listen(port, () =>
//   console.log("Server is working on Port:" + port + " in " + envMode + " Mode.")
// );

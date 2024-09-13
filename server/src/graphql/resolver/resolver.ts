import { getAllCourses, getCourse } from "../../controllers/course.js";
import { getAllUsers, getUserById } from "../../controllers/user.js";
import { ICourse } from "../../models/courseModel.js";

type userTypes = {
    name: string;
    email: string;
    password: string;
    isAdmin: boolean;
};
const Users: userTypes[] = [];

export const GraphQlResolver = {
    Mutation: {
      newUser: (_: any, { name, email, password, isAdmin }: userTypes) => {
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
      instructor: async (course: ICourse) => {
        return await getUserById(course.instructor);
      },
    },
  }
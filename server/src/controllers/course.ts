import { Course } from "../models/courseModel.js";

export const getAllCourses = async () => {
    const courses = await Course.find();
    return courses;
};

export const getCourse = async (parent: any, args : {_id: String}) => {
    const course = await Course.findById(args._id);
    return course;
}
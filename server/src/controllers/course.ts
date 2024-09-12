import { Course } from "../models/courseModel.js";

export const getAllCourses = async () => {
    const courses = await Course.find();
    return courses;
};
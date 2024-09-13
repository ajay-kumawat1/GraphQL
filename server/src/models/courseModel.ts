import mongoose from "mongoose";

type ICourse = {
  title: string;
  description: string;
  instructor: string;
  price: number;
  rating: number;
  image: string;
};

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  instructor: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

export const Course = mongoose.model<ICourse>("Course", courseSchema);

export type { ICourse };
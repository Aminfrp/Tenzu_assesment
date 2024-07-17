import { Post } from "@/types/posts";
import axios from "axios";

const instance = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_BASE_URL || "https://jsonplaceholder.typicode.com",
});

const services = {
  fetchPosts: () => instance.get<Post[]>("/posts"),
};

export default services;

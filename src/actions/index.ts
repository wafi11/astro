import { createBlog, createComment, deleteComment, updateBlog } from "./post";
export const server = {
  blog : createBlog,
  updateBlog,
  comment : createComment,
  deleteComment
};

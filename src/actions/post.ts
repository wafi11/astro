import { defineAction, z } from "astro:actions";
import prisma from "../lib/db";


export const createComment = defineAction({
  accept: "form",
  input: z.object({
    blogId: z.string(),
    userId: z.string(),
    text: z.string(),
  }),
  handler: async ({ blogId, text, userId }) => {
    try {
      const comment = await prisma.comments.create({
        data: {
          text,
          blog: {
            connect: {
              id: blogId,
            },
          },
          user: {
            connect: {
              id: userId,
            },
          },
        },
      });
      return comment;
    } catch {
      throw new Error("Internal Server Error");
    }
  },
});
export const deleteComment = defineAction({
  input: z.object({
    id: z.string(),
  }),
  handler: async ({ id }) => {
    try {
      const comment = await prisma.comments.findUnique({
        where: { id },
        select: { blogId: true, userId: true },
      });
      if (!comment) {
        throw new Error("Comment not found");
      }
      const deletedComment = await prisma.comments.delete({
        where: { id },
      });
      await prisma.blog.update({
        where: { id: comment.blogId },
        data: {
          Comments: {
            disconnect: { id },
          },
        },
      });
      await prisma.user.update({
        where: {
          id: comment.userId,
        },
        data: {
          comments: {
            disconnect: { id },
          },
        },
      });
      return deletedComment;
    } catch {
      throw new Error("Internal Server Error");
    }
  },
});

export const updateBlog = defineAction({
  accept: "form",
  input: z.object({
    id: z.string(),
    author: z.string(),
    image: z.string(),
    category: z.array(z.string()),
    title: z.string(),
    description: z.string(),
  }),
  handler: async ({ id, author, category, description, image, title }) => {
    try {
      console.log("ACTIOOOOOON", id);
      const updateBlog = await prisma.blog.update({
        where: { id },
        data: {
          author,
          category,
          image,
          title,
          description,
        },
      });
      return updateBlog;
    } catch {
      throw new Error("Internal Server Error");
    }
  },
});
export const createBlog = defineAction({
  accept: "form",
  input: z.object({
    author: z.string(),
    image: z.string(),
    category: z.array(z.string()),
    title: z.string(),
    description: z.string(),
  }),
  handler: async ({ author, category, description, image, title }) => {
    try {
      const Blog = await prisma.blog.create({
        data: {
          author,
          category,
          image,
          title,
          description,
          url: "localhost:4000",
        },
      });
      return Blog;
    } catch (e) {
      throw new Error("Internal Server Erorr");
    }
  },
});

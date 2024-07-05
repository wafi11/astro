import type { APIRoute } from "astro";
import prisma from "../../lib/db";

export const POST: APIRoute = async ({ request }) => {
  if (request.headers.get("Content-Type") === "application/json") {
    try {
      const body = await request.json();
      const { text, userId, commentId } = body;

      if ( !userId || !text || !commentId) {
        throw new Error("Missing required fields");
      }

      const parentComment = await prisma.comments.findUnique({
        where: { id: commentId },
      });

      if (!parentComment) {
        throw new Error("Parent comment not found");
      }

      const reply = await prisma.replyComments.create({
        data: {
          text,
          userId,
          commentId,
        },
      });

      return new Response(
        JSON.stringify({
          message: "Reply created successfully",
          reply,
        }),
        {
          status: 200,
        }
      );
    } catch (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
      });
    }
  }

  return new Response(JSON.stringify("Invalid Content-Type"), { status: 400 });
};


export const DELETE: APIRoute = async ({ request }) => {
  if (request.headers.get("Content-Type") === "application/json") {
      try {
          const body = await request.json();
          const { id } = body;

          if (!id) {
              throw new Error("id is required");
          }

          const comment = await prisma.replyComments.findUnique({
              where: { id },
          });

          if (!comment) {
              return new Response(JSON.stringify({ error: "Comment not found" }), { status: 404 });
          }

          await prisma.replyComments.delete({
              where: { id },
          });

          return new Response(JSON.stringify({
              message: "Comment deleted successfully"
          }), {
              status: 200
          });
      } catch (error) {
          return new Response(JSON.stringify({ error: error.message }), { status: 500 });
      }
  }
  return new Response(JSON.stringify("Invalid Content-Type"), { status: 400 });
};

// Update a comment
export const PATCH: APIRoute = async ({ request }) => {
  if (request.headers.get("Content-Type") === "application/json") {
      try {
          const body = await request.json();
          const { replyId,text } = body;

          if (!replyId || text) {

              throw new Error("replyId andtext are required");

          }

          const comment = await prisma.comments.findUnique({
              where: { id: replyId },
          });

          if (!comment) {
              return new Response(JSON.stringify({ error: "Comment not found" }), { status: 404 });
          }

          const updatedComment = await prisma.replyComments.update({
              where: { id: replyId },
              data: { text:text },

          });

          return new Response(JSON.stringify({
              message: "Comment updated successfully",
              data: updatedComment
          }), {
              status: 200
          });
      } catch (error) {
          return new Response(JSON.stringify({ error: error.message }), { status: 500 });
      }
  }
  return new Response(JSON.stringify("Invalid Content-Type"), { status: 400 });
};

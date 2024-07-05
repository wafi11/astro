import { type APIRoute } from 'astro';
import prisma from "../../lib/db";

export const POST: APIRoute = async ({ request }) => {
    if (request.headers.get("Content-Type") === "application/json") {
        try {
            const body = await request.json();
            const { text, blogId, userId } = body;

            if (!text || !blogId || !userId) {
                throw new Error("text, blogId, and userId are required");
            }

            const data = await prisma.comments.create({
                data: {
                    text,
                    blog: {
                        connect: { id: blogId }
                    },
                    user: {
                        connect: { id: userId }
                    }
                }
            });

            return new Response(JSON.stringify({
                message: "Comment created successfully",
                data: data
            }), {
                status: 200
            });
        } catch (error) {
            return new Response(JSON.stringify({ error: error.message }), { status: 500 });
        }
    }
    return new Response(JSON.stringify("Invalid Content-Type"), { status: 400 });
};

export const DELETE: APIRoute = async ({ request }) => {
    if (request.headers.get("Content-Type") === "application/json") {
        try {
            const body = await request.json();
            const {id} = body;

            if (!id) {
                throw new Error("id is required");
            }

            const comment = await prisma.comments.findUnique({
                where: { id},
            });

            if (!comment) {
                return new Response(JSON.stringify({ error: "Comment not found" }), { status: 404 });
            }

            await prisma.comments.delete({
                where: { id },
            });
            await prisma.likes.deleteMany({
                where : {
                    commentId : id
                }
             
            })

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
            const { id,text } = body;

            if (!id || text) {

                throw new Error("id andtext are required");

            }

            const comment = await prisma.comments.findUnique({
                where: { id: id },
            });

            if (!comment) {
                return new Response(JSON.stringify({ error: "Comment not found" }), { status: 404 });
            }

            const updatedComment = await prisma.comments.update({
                where: { id: id },
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

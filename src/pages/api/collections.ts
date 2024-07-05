import { type APIRoute } from 'astro';
import prisma from "../../lib/db";

// Create a comment
export const GET: APIRoute = async ({ request,params }) => {
    try {
        const {Id}  = params

      const datas = await prisma.blog.findUnique({
        where : {
            id : Id
        },
      })
      const likes  = await  prisma.collection.findMany({
        where : {
            blogId : datas.id
        },
        select : {
            id : true,
            collect : true
        }
      })
      return new Response(JSON.stringify(likes), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } catch (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }
  };

export const POST: APIRoute = async ({ request }) => {
    if (request.headers.get("Content-Type") === "application/json") {
        try {
            const body = await request.json();
            const { blogId, userId } = body;

            if ( !blogId || !userId) {
                throw new Error("text, blogId, and userId are required");
            }

            const data = await prisma.collection.create({
                data: {
                    collect : true,
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

            const comment = await prisma.collection.findUnique({
                where: { id},
            });

            if (!comment) {
                return new Response(JSON.stringify({ error: "Comment not found" }), { status: 404 });
            }

            await prisma.collection.delete({
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


import type { APIRoute } from 'astro';
import prisma from '../../../../lib/db'; // Adjust the path if necessary

export const POST: APIRoute = async ({ request ,params}) => {
    if (request.headers.get("Content-Type") === "application/json") {
        try {
            const { Id } = params
            const body = await request.json()
            const {userId} = body

           
            if (typeof !Id === 'string') {
                return new Response(JSON.stringify({ error: "Blog not found" }), { status: 404 });
            }

            const like = await prisma.likes.create({
                data: {
                    likes: true,
                    replies: {
                        connect: {
                            id: Id,
                        },
                    },
                    user : {
                        connect : {
                            id : userId
                        }
                    }
                },
            });

            return new Response(
                JSON.stringify({
                    message: "Blog liked",
                    data: like,
                }),
                { status: 200 }
            );
        } catch (error) {
            return new Response(
                JSON.stringify({ error: error.message || "Internal Server Error" }),
                { status: 500 }
            );
        }
    }
    return new Response(JSON.stringify({ error: "Invalid Content-Type" }), { status: 400 });
};

export const GET: APIRoute = async ({ request,params }) => {
    try {
        const {Id}  = params

      const datas = await prisma.replyComments.findUnique({
        where : {
            id : Id
        },
      })
      const likes  = await  prisma.likes.findMany({
        where : {
            respliesId : datas.id
        },
        select : {
            id : true,
            likes : true
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


export const DELETE: APIRoute = async ({ request,params }) => {
    if (request.headers.get("Content-Type") === "application/json") {
        try {
            const { Id } = params


            const like = await prisma.likes.delete({
                where: { id  : Id },
            });

            return new Response(
                JSON.stringify({ message: "Like status updated successfully", data: like }),
                { status: 200 }
            );
        } catch (error) {
            return new Response(
                JSON.stringify({ error: error.message || "Internal Server Error" }),
                { status: 500 }
            );
        }
    }
    return new Response(JSON.stringify({ error: "Invalid Content-Type" }), { status: 400 });
};

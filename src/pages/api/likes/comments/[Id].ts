import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ request,params }) => {
    try {
        const {Id}  = params
      const datas = await prisma.comments.findUnique({
        where : {
            id : Id
        },
      })
      const likes  = await  prisma.likes.findMany({
        where : {
            commentId : datas.id
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


export const POST: APIRoute = async ({ request ,params}) => {
  if (request.headers.get("Content-Type") === "application/json") {
    try {
        const {Id} =  params 
        const body = await request.json()
        const {userId}  = body
      const blog = await prisma.comments.findUnique({
        where: {
          id: Id,
        },
      });

      if (!blog) {
        return new Response(JSON.stringify({ error: "Blog not found" }), {
          status: 404,
        });
      }

      const like = await prisma.likes.create({
        data: {
          likes: true,
          comment: {
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
  return new Response(JSON.stringify({ error: "Invalid Content-Type" }), {
    status: 400,
  });
};



export const DELETE: APIRoute = async ({ request ,params}) => {
  if (request.headers.get("Content-Type") === "application/json") {
    try {
        const {Id} =  params 

      if (Id === "string") {
        return new Response(JSON.stringify({ error: "Invalid data" }), {
          status: 400,
        });
      }

      const like = await prisma.likes.delete({
        where: { id: Id },
      });

      return new Response(
        JSON.stringify({
          message: "Like status updated successfully",
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
  return new Response(JSON.stringify({ error: "Invalid Content-Type" }), {
    status: 400,
  });
};


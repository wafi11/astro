import type { APIRoute } from "astro";
import prisma from '../../../lib/db'
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

import jwt, { type JwtPayload } from 'jsonwebtoken';
import prisma from "../lib/db"


export async function BlogsData(){
    try {
        const data = await prisma.blog.findMany()
        return data 
    }
    catch {
        throw new Error('Internal Server Errorr')
    }
}
export async function Popular(){
  try {
    const data = await prisma.blog.findMany({
      orderBy : {
        createdAt : 'asc'
      }
    })
    return data
  } catch {
    throw new Error('Internal Server Errorr')
  }
}

export async function Trending (){
  try {
    const data = await prisma.blog.findMany({
      orderBy : {
        createdAt : 'desc'
      }
    })
    return data
  }catch{
    throw new Error('Internal Server Errorr')
  }
}
export async function BlogsDataById(id : string){
    try {
        const data = await prisma.blog.findMany({
            where : {
                id
            }
        })
        return data 
    }
    catch {
        throw new Error('Internal Server Errorr')
    }
}

export async function Category () {
  try {
   const categories = await prisma.blog.findMany({})

   const uniuqeCategories = new Set<string>()
  categories.forEach(item => {
    item.category.forEach(cat => uniuqeCategories.add(cat))
  })

  const uniuqeCategoriesArray = Array.from(uniuqeCategories)
  const completeData = await prisma.blog.findMany({
    where : {
      category : {
        hasSome : uniuqeCategoriesArray
      }
    }
  })
  return uniuqeCategoriesArray
  }catch {
    throw new Error('Internal Server Error');

  }
}

export async function getLikeByCommentId (commentId : string){
  try {
    const data = await prisma.likes.findMany({
      where : {
        commentId
      },
      select: {
        id : true,
        likes : true
      }
    })
    return data
  }catch {
    throw new Error('Internal Server Error')
  }
}
export async function getLikeByReplyCommentId (replyId : string){
  try {
    const data = await prisma.likes.findMany({
      where : {
        respliesId : replyId
      },
      select: {
        id : true,
        likes : true
      }
    })
    return data
  }catch {
    throw new Error('Internal Server Error')
  }
}
export async function getLikeByBlogId (blogId : string){
  try {
    const data = await prisma.likes.findMany({
      where : {
        blogId
      },
      select: {
        id : true,
        likes : true
      }
    })
    return data
  }catch {
    throw new Error('Internal Server Error')
  }
}


export async function getCommentByBlogId(blogId : string) {
  try {
    const data = await prisma.comments.findMany({
      where: {
        blogId: blogId,
      },
      select: {
        id : true,
        text: true,
        createdAt: true,
        likes : {
          select : {
            id : true,
            likes : true
          }
        },
        replies : {
          select : {
            text : true,
            id : true,
            createdAt : true,
            Likes : {
              select : {
                likes : true,
                id : true
              }
            },
            user : {
              select : {
                id : true,
                image : true,
                name : true
              }
            }
          }
        },
        user: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return data;
  }catch(e){
    throw new Error('Internal Server Error')
  }
}

export async function getUserFromToken(token : string) {

  try {
    const jwtKey = import.meta.env.AUTH_SECRET;
    if (!token) {
      return null
    }
    if (!jwtKey) {
      throw new Error('JWT key not found in environment variables');
    }

    // Verify the token
    const decoded = jwt.verify(token, jwtKey);
    if (typeof decoded === 'string') {
      throw new Error('Invalid token payload');
    }

    // Get the userId from the decoded token
    const userId = (decoded as JwtPayload).userId as string;
    if (!userId) {
      throw new Error('User ID not found in token');
    }

    // Fetch the user from the database
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select : {
        id : true,
        name : true,
        image : true,
        collections : {
          select : {
            id : true,
            blogId :true,
            blog : {
              select : {
                title : true
              }
            }
          }
        },
        comments : {
          select : {
            blogId :true,
            id : true,
            text : true,
            createdAt : true
          }
        },
        reply : {
          select : {
            commentId :true,
            id : true,
            createdAt : true
          }
        },
      }
    });





    if (!user) {
      throw new Error('User not found');
    }

    return user;
  } catch (error) {
    console.error('Error getting user from token:', error);
    throw error; 
  }
}




export const GetUser = async () => {
  try {
      const data = await fetch('http://localhost:3000/api/profile',{
        method : 'GET'
      });
      if (!data.ok) {
          throw new Error('Failed to fetch user profile');
      }
      const userData = await data.json();
      return userData;
  } catch (error) {
    console.log(error)
  }
};










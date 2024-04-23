const { prisma } = require("./index");

const getAllPosts = async() => {

const posts = await prisma.posts.findMany();
return posts;

}


const getOnePost = async(postid) => {
  postid = postid*1;

  const post = await prisma.posts.findUnique({
    where: {
      id: postid,
    },
  })

  return post;

}





module.exports = {
  getAllPosts,
  getOnePost
}

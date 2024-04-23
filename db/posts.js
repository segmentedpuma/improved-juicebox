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

const createPost = async(title, content, creatorId) => {
  const post = await prisma.posts.create({
    data:{
      title,
      content,
      creatorId
    }
  });

  return post;

}

const updatePost = async(passedId, title, content) => {
passedId = passedId*1;
  const updatedPost = await prisma.posts.update({
    where: {
      id: passedId
    },
    data: {
      title,
      content
    },
  })

  return updatedPost;

}





module.exports = {
  getAllPosts,
  getOnePost,
  createPost,
  updatePost
}

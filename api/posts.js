const express = require('express');

const { getAllPosts, getOnePost } = require("../db/posts");

const postsRouter = express.Router();

postsRouter.get("/", async (req, res, next) => {

  try {

    const posts = await getAllPosts();
    res.send(posts);

  } catch (error) {
    next(error);
  }
})

postsRouter.get("/:id", async(req,res,next) => {
  const id = req.params.id;
  console.log(id);
  try {
    const post = await getOnePost(id);
    
    res.send(post);
  } catch (error) {
    next(error);
  }

})


module.exports = postsRouter;
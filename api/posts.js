const express = require('express');


const { getAllPosts, getOnePost, createPost, updatePost } = require("../db/posts");
const { requireUser } = require("./utils");

const postsRouter = express.Router();

postsRouter.get("/", async (req, res, next) => {

  try {

    const posts = await getAllPosts();
    res.send(posts);

  } catch (error) {
    next(error);
  }
})

postsRouter.get("/:id", async (req, res, next) => {
  const id = req.params.id;
  console.log(id);
  try {
    const post = await getOnePost(id);

    res.send(post);
  } catch (error) {
    next(error);
  }

})



//token required

postsRouter.post("/", requireUser, async (req, res, next) => {
  console.log('attempting post...');

  try {
    const id = req.user.id;
    const title = req.body.title
    const content = req.body.content
    const creatorId = id;


    const post = await createPost(title, content, creatorId);
    console.log(post);

    console.log("created post: ");
    res.send(post);

  } catch (error) {
    next(error);
  }
});

postsRouter.put("/:id", requireUser, async(req,res,next) => {

  const id = req.params.id;

  try {

    const post = await getOnePost(id);
    const originalcreator = post.creatorId;
    
    if(originalcreator === req.user.id){
      const title = req.body.title;
      const content = req.body.content;
      const updatedPost  = await updatePost(id ,title, content);

      res.send(updatedPost);
    }
    else{
      console.log('incorrect user');
      res.send('must be original creator to edit posts');
    }

    

  } catch (error) {
    next(error);
  }

})

module.exports = postsRouter;
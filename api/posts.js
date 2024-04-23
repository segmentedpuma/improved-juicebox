const express = require('express');

const postsRouter = express.Router();

postsRouter.get("/", async(req,res,next) => {
  res.send('ok, this is epic');
})


module.exports = postsRouter;
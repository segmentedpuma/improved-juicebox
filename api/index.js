const express = require('express');

const apiRouter = express.Router();

const usersRouter = require("./users");
const postsRouter = require("./posts");

apiRouter.use("/users", usersRouter);
apiRouter.use("/posts", postsRouter);


apiRouter.get("/", (req,res,next) => {
  res.send("this also works");
})




module.exports = apiRouter;
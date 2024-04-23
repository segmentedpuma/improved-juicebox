const express = require('express');

const usersRouter = express.Router();

usersRouter.get("/", (req,res,next) => {
  res.send("this also also works again yay!");
})

module.exports = usersRouter;
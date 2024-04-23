const express = require('express');

const jwt = require("jsonwebtoken");

const apiRouter = express.Router();

const usersRouter = require("./users");
const postsRouter = require("./posts");
const {getUserById} = require("../db/users");

apiRouter.use( async (req,res,next) => {

  const prefix = "Bearer ";
  const auth = req.header('Authorization');

 console.log(auth);

  if(!auth){
    console.log('no auth');
    next();
  }
  else if(auth.startsWith(prefix)){
    const token = auth.slice(prefix.length);
    const {id} = jwt.verify(token, process.env.SECRET);
    if(id){

      const user = await getUserById(id);
      console.log("succesfully varified user: ");
      console.log(user);
      req.user = {id: user.id, username: user.username};
      console.log('tagging req with:');
      console.log(req.user);
      next();
    }
  }
  else{
    console.log('no prefix');
    next();
  }

});
apiRouter.use("/users", usersRouter);
apiRouter.use("/posts", postsRouter);


apiRouter.get("/", (req,res,next) => {
  res.send("this also works");
})




module.exports = apiRouter;
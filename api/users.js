const express = require('express');

const jwt = require("jsonwebtoken");

const {createToken, getAllUsers, createNewUser} = require("../db/users");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));



const usersRouter = express.Router();

usersRouter.get("/", async (req,res,next) => {

try {
  const users = await getAllUsers();
  res.send(users);

} catch (error) {
  next(error);
}
 
})


usersRouter.post("/auth/register", async(req,res,next) => {

  const body = req.body;
  try {

    const newUser = await createNewUser();
    res.send(newUser);
    
  } catch (error) {
    next(error);
  }

})



module.exports = usersRouter;
const express = require('express');


const { createToken, getAllUsers, createNewUser, getSingleUser } = require("../db/users");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



const usersRouter = express.Router();

usersRouter.get("/", async (req, res, next) => {

  try {
    const users = await getAllUsers();
    res.send(users);

  } catch (error) {
    next(error);
  }

})


usersRouter.post("/auth/register", async (req, res, next) => {


  const username = req.body.username;
  const password = req.body.password;

  try {

    const newUser = await createNewUser(username, password);
    const id = newUser.id;

    const token = createToken(id, password);


    res.send({ message: "Successfully registered!", token });


  } catch (error) {
    next(error);
  }

});

usersRouter.post("/auth/login", async (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  try {

    const user = await getSingleUser(username, password);
    if (user) {
      const id = user.id;
      const token = createToken(id, password);

      res.send({ message: "Succesfully Logged in", token });
    }
    else {
      res.sendStatus(401);
    }


  } catch (error) {
    next(error);
  }

})



module.exports = usersRouter;
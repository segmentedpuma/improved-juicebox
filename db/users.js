const { prisma } = require("./index");
const jwt = require("jsonwebtoken");

const getAllUsers = async() => {

  const users = await prisma.users.findMany();
  return users;

}

const getSingleUser = async(passedUsername, passedPassword) => {

  const user = await prisma.users.findUnique({
    where:{
      username: passedUsername,
      password: passedPassword
    }
  });

  return user;

}

const getUserById = async(passedId) => {
  const user = await prisma.users.findUnique({
    where:{
     id: passedId
    }
  });
  return user;
}

const createNewUser = async(username,password) => {

  const newUser = await prisma.users.create({
    data:{
      username,
      password
    }
  })

  return newUser;

}

const createToken = (id, password) => {
  const token = jwt.sign({
    id,
    password
  }, process.env.SECRET,
    {
      expiresIn: "3w"
    });

    return token;
}


module.exports = {
  createToken,
  getAllUsers,
  createNewUser,
  getSingleUser,
  getUserById
}
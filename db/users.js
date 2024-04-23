const { prisma } = require("./index");


const getAllUsers = async() => {

  const users = await prisma.users.findMany();
  return users;

}

const createNewUser = async() => {

  const works = "this works yay";

  return works;

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
  createNewUser
}
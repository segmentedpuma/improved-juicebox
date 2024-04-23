// const { PrismaClient } = require("@prisma/client");
// const prisma = new PrismaClient();

const { prisma } = require("./index");

console.log('this works');

const createUsers = async (username, password) => {
  try {
    const createdUser = await prisma.users.create({
      data: {
        username,
        password
      }
    })
    console.log("created:");
    console.log(createdUser);

    return createdUser;

  } catch (error) {
    console.log(error);
  }
}

const createPosts = async (title, content, creatorId) => {
  try {
    const createdPost = await prisma.posts.create({
      data:{
        title,
        content,
        creatorId
      }
    });
    console.log("created:");
    console.log(createdPost);
  } catch (error) {
    console.log(error);
  }
}



const seed = async () => {
  try {
    console.log("seed start");

    console.log('creating users...');

    await Promise.all([
        await createUsers("testUser1", "testPassword1"),
        await createUsers("testUser2", "testPassword2"),
        await createUsers("testUser3", "testPassword3")
      ]);
    console.log("created users!");

    console.log("creating posts...");
    await Promise.all([
      await createPosts('test title1', 'test content1', 1),
      await createPosts('test title2', 'test content2', 1),
      await createPosts('test title3', 'test content3', 1),

      await createPosts('test title4', 'test content4', 2),
      await createPosts('test title5', 'test content5', 2),
      await createPosts('test title6', 'test content6', 2),

      await createPosts('test title7', 'test content7', 3),
      await createPosts('test title8', 'test content8', 3),
      await createPosts('test title9', 'test content9', 3)
    ]);
    console.log("created posts!");

    const test1 = await prisma.users.findUnique({
      where: {
        username: "testUser1"
      },
      include: {
        posts: true
      }
    })

    console.log(test1);

  } catch (error) {
    console.log(error);
  }
  console.log("seed end")
}




if (require.main === module) {
  seed()
    .then(async () => {
      await prisma.$disconnect()
    })
    .catch(async (e) => {
      console.error(e)
      await prisma.$disconnect()
      process.exit(1)
    });
}



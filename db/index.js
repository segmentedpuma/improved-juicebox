
require("dotenv").config();

const {PrismaClient} = require(`@prisma/client`);

const prisma = new PrismaClient();

const { Client} = require("pg");

const client = new Client(process.env.DATABASE_URL ||"postgres://localhost:5432/34d_juicebox");




module.exports = {
  client,
  prisma
};

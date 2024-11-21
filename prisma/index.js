const bcrypt=require("bcrypt")
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient().$extends({
  model: {
    user: {
      async Register(username, password) {
        const hashedpassword = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
          data: { username, password: hashedpassword }
        })
        return user
      },
      async Login(email, password) {
        const user = await prisma.user.findUniqueorThrow({
          where: { email },
        });
        const valid = await bcrypt.compare(password, user.password);
        if (!valid) throw Error("Invalid Password");
        return user;
      }
    },
  },
});

module.exports = prisma;
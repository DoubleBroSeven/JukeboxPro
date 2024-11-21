const prisma = require("../prisma");
const GenerateRandomInt = (high, low) => {
  return Math.floor((Math.random() * high) + low)
}
const seed = async(numtracks = 20) => {
  //create at least ten tracks per playlist
  const tracks = Array.from({ length: numtracks }, () => ({
    name: `${GenerateRandomInt(3000, 1)}`
  }));
  await prisma.track.createMany({ data: tracks });
};

seed()
  .then(async () => await prisma.$disconnect())
  .catch(async (e) => {
    console.log(e);
    await prisma.$disconnect();
    process.exit(1)
  });


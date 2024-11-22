express = require("express");
router = express.Router();
module.exports = router;

const { authenticate } = require("./auth");
const prisma = require("../prisma");

router.get("/", authenticate, async (req, res, next) => {
  try {
    const playlists = await prisma.playlist.findMany({
      where: { ownerId: req.user.id },
    });
    res.json(playlists);
  } catch (e) {
    next(e);
  }
});

router.post("/", authenticate, async (req, res, next) => {
  const { name, description, trackIds } = req.body;
  try {
    const tracks = trackIds.map((id) => ({ id }));
    const playlist = await prisma.playlist.create({
      data: {
        name,
        description,
        ownerId: req.user.id,
        tracks: { connect: tracks },
      },
    });
    res.status(201).json(playlist);
  } catch (e) {
    next(e);
  }
});

router.get("/:id", authenticate, async (req, res, next) => {
  const { id } = req.params;
  const includeTracks = req.user ? { where: { ownerId: req.user.id } } : false;

  try {
    const playlists = await prisma.playlist.findUniqueOrThrow({
      where: { id: +id },
      include: { tracks: includeTracks },
    });
    res.status(201).json(playlists);
  } catch (e) {
    next({
      status: 403,
      message: "Woah there BUddy, You dont belong around here.",
    });
  }
});

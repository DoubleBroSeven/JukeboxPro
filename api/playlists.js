express = require("express");
router = express.Router();
const prisma = require("../prisma");
const { authenticate } = require("./auth");

router.get("/", authenticate, async (req, res, next) => {
  try {
    const playlists = await prisma.user.findMany({
      where: { userid: req.user.id },
    });
    res.json(playlists);
  } catch (e) {
    next(e);
  }
});
module.exports = router;

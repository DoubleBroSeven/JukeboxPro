require("dotenv").config();
const express = require("express");
const app = express();
PORT = 3000;

app.use((req, res, next) => {
  console.log(`${req.method}${req.originalUrl}`);
  next();
});

app.use(express.json());

app.use(require("./api/auth").router);
app.use("/playlists", require("./api/playlists"));
//app.use("/tracks", require("./api/tracks"));

app.use((req, res, next) => {
  next(res.status(404).message("Endpoint not Found"));
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status ?? 500);
  res.json(err.message ?? `Something has probably caught on fire. One Sec...`);
});
app.listen(PORT, () => {
  console.log(
    `The App hears the call of port ${PORT} and The App will answer!`
  );
});

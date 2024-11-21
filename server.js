const express = require("express")
const app = express();
require("dotenv").config();
app.use(express.json());
PORT = 3000

app.use((req, res, next) => {
  console.log(`${req.method}${req.originalUrl}`)
  next();
})


app.use((req, res, next) => {
  next({res.status(404).message('Endpoint not Found')})
})



app.use((err, req, res, next) => {
  console.error(err)
  res.status(err.status ?? 500)
  res.json(err.message ?? `Something has probably caught on fire. One Sec...`)
})
app.listen(PORT, () => {
  console.log(`The port hears the call of port ${PORT} and we have answered!`)
})
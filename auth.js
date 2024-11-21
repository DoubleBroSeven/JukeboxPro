express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
JWT_SECRET = process.env.JWT_SECRET;
const express = require("express");
const router = express.Router();
const userController = require("./../controller/user-controller");

router.get("/:username", userController.getUserDetails);

router.post("/adduser", userController.addUser);

module.exports = router;

const express = require("express");
const mongoose = require("mongoose");
const user = require("../model/user");
const router = express.Router();
const { deleteuser, edituser, adduser, getusers }=require("../controller/user")

router.get("/all",getusers)
router.post("/add",adduser );
router.put("/edit/:id",edituser );
router.delete("/delete/:id",deleteuser);

module.exports = router;

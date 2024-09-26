const express = require("express")
const mongoose = require("mongoose")
const user=require("../model/user")


const getusers=async (req, res) => {
  const users = await user.find();
  res.json(users);
}
const adduser=async (req, res) => {
  try {
    const { fname, lname } = req.body;
    // Create a new user instance
    const User = new user({ fname, lname });
    // Save the user to the database
    await User.save();
    const users = await user.find();
    res.status(201).json(users);
  } catch (error) {
    res
      .status(400)
      .json({ error: "User registration failed", message: error.message });
  }
}
const edituser=async (req, res) => {
  const { fname, lname } = req.body;
  try {
    const updatedItem = await user.findByIdAndUpdate(
      req.params.id,
      { fname, lname },
      { new: true }
    );
    res.status(200).json(updatedItem);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}
const deleteuser=async (req, res) => {
  try {
    const users =  user.findByIdAndDelete(req.params.id);
    
    res.status(200).json({
      message: 'User deleted successfully',
      deletedUser: user
  });
} catch (err) {
    res.status(500).json({ error: err.message });
}
}

module.exports = { deleteuser, edituser, adduser, getusers };
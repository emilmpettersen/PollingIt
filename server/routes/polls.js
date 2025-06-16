import express from "express";
import db from "../db/connection.js";
import { ObjectId } from "mongodb";

// The router will be added as a middleware and will take control of requests starting with path /polls.
const router = express.Router();

// get all polls
router.get("/", async (req, res) => {
  let collection = await db.collection("polls");
  let results = await collection.find({}).toArray();
  res.send(results).status(200);
});

// get single poll by ID
router.get("/:id", async (req, res) => {
  let collection = await db.collection("polls");
  let query = { _id: new ObjectId(req.params.id) };
  let result = await collection.findOne(query);

  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
});

// create new poll
router.post("/", async (req, res) => {
  try {
    let newDocument = {
      name: req.body.name,
      position: req.body.position,
      level: req.body.level,
    };
    let collection = await db.collection("polls");
    let result = await collection.insertOne(newDocument);
    res.send(result).status(204);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error adding poll");
  }
});

// update poll by ID.
router.patch("/:id", async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };
    const { optionIndex, votes } = req.body;

    const updates = {
      $set: {
        [`options.${optionIndex}.votes`]: votes,
      },
    };
    let collection = await db.collection("polls");
    let result = await collection.updateOne(query, updates);
    res.send(result).status(200);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating poll");
  }
});

// delete poll by ID
router.delete("/:id", async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };

    const collection = db.collection("polls");
    let result = await collection.deleteOne(query);

    res.send(result).status(200);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting poll");
  }
});

export default router;

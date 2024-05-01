const express = require("express");

const app = express();
app.use(express.json());

const cors = require("cors");
app.use(cors());

require("./db/connection");
const UserModel = require("./Models/User");

app.get("/getUsers", function (req, res) {
  UserModel.find()
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
});

app.get("/getUsers", async (req, res) => {
  try {
    const userCount = await User.countDocuments(); // Get the count of documents in the users collection

    res.send({ totalUsers: userCount });
  } catch (error) {
    console.error("Error fetching user count:", error);
    res.status(500).json({ error: "Server error" });
  }
});

app.post("/", async (req, res) => {
  console.log(req.body);
  let user = new UserModel({
    concern: req.body.concern,
  });

  let result = await user.save();
  res.send(result);
});

app.listen(4000, () => {
  console.log("App is running");
});

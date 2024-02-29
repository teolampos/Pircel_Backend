const express = require("express");
const cors = require("cors");
const data = require("./data");
require("dotenv").config();

const PORT = process.env.PORT || 4000;
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000", "https://pircel-app.onrender.com"],
  })
);

app.get("/houses", async (req, res) => {
  try {
    const name = req.query.name;
    if (name) {
      const filteredHouses = data.houses.filter((house) =>
        house.name.includes(name)
      );
      return res.status(200).json(filteredHouses);
    }
    res.status(200).json(data.houses);
  } catch (err) {
    res.status(500).json({ msg: "Internal Server Error" });
  }
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));

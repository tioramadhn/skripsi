const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  let i = 0;
  setInterval(() => {
    console.log(i++);
  }, 1000);

  console.log(`Running on port ${port}`);
});

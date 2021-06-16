"use strict";

const { db } = require("./server/db");
const app = require("./server");
const PORT = process.env.PORT;

db.sync().then(() => {
  console.log("db synced");
  app.listen(PORT, () => console.log(`serving on port ${PORT}`));
});

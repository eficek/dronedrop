"use strict";

const { db } = require("./server/db");
const app = require("./server");
const PORT = 8888;

db.sync().then(() => {
  console.log("db synced");
  app.listen(PORT, () => console.log(`serving on port ${PORT}`));
});

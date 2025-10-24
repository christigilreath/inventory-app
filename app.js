import express from "express";

import indexRouter from "./routes/index.js";

const app = express();
const PORT = 3000;

app.set("view engine", "ejs");
app.set("views", "./views");

app.use("/", indexRouter);

// app.use("/orchestral");
// app.use("/guitars");
// app.use("/keyboards");
// app.use("/drums");

app.listen(PORT, console.log(`Listening on port: ${PORT}`));

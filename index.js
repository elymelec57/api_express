const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors")
const empleadosRouter = require("./routes/empleados");
const fileUpload = require("express-fileupload");

app.use(cors())
app.use("/public",express.static('public'));
app.use(express.json({limit: '25mb'}));
app.use(
  express.urlencoded({
    extended: true,
    limit: '25mb',
  })
);
app.use(
  fileUpload()
);

app.get("/", (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  res.json({ message: "ok" });
});

app.use("/programming-languages", empleadosRouter);

/* Error handler middleware */
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });

  return;
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
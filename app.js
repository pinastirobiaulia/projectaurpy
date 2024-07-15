require("dotenv").config();
const app = require("express")();
const express = require("express");
//process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
const bookRoutes = require("./routes/index");
const userRoutes = require("./routes/userRoutes");
const diskusiRoutes = require("./routes/diskusiRoutes");
const bodyParser = require("body-parser");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const cookieParser = require("cookie-parser");

// const mongoose = require('mongoose');
// mongoose.set('strictQuery', false); // Menyiapkan untuk perubahan di Mongoose 7

// dokumnetasi swagger
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const options = require("./swagger");
// const cookieParser = require("cookie-parser");
const specs = swaggerJsDoc(options);



// // Set up multer for file uploads
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/'); // Ensure this directory exists
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + path.extname(file.originalname));
//   }
// });

// const upload = multer({ storage: storage });


const port = process.env.PORT || 5000;



require("./database");
app.use(cors({ credentials: true }));
app.use(cookieParser());
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));

// menggunakan body-parser
app.use(bodyParser.json());
// app.use(express.json)
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// module.exports.db = mongoose.connection;
// db.once('open', () => {console.log('database connected')})



app.use(userRoutes);
app.use(bookRoutes);
app.use(diskusiRoutes);

// Handle static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// app.use('/books/tambah', bookRoutes)
// app.put('/books/ubah', bookRoutes)
// app.delete('/books/hapus', bookRoutes)

const server = app.listen(port, () => {
  console.log(`app listen at http://localhost:${port}`);
  // console.log(`app listen at *:${port}`);
});

module.exports = { app, server };

const mongoose = require('mongoose');
const Book = require("../models/books");
const Category = require("../models/category");
const upload = require("../middleware/multer");
const { GridFSBucket } = require('mongodb'); 
const path = require('path');
//const Grid = require('gridfs-stream');
const { Readable } = require('stream');

//tambahan
// Setup MongoDB connection and GridFSBucket
let gfsBucket;
mongoose.connection.once('open', () => {
  gfsBucket = new GridFSBucket(mongoose.connection.db, {
    bucketName: 'uploads'
  });
});

// Get all books
const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find().populate('category');;  // Error di sini menunjukkan bahwa Book undefined
    res.status(200).json({ books });
  } catch (err) {
    console.error(err); // Tambahkan logging error
    res.status(404).json({ message: err.message });
  }
};

// Search books
const searchBook = async (req, res) => {
  try {
    if (!req.query.namaBuku) {
      return res.status(400).json({ message: "Wrong Query", status: 400 });
    }
    const result = await Book.find({
      namaBuku: { $regex: req.query.namaBuku, $options: "i" },
    }).populate('category');
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get book by ID
const getBookById = async (req, res) => {
  try {
    const book = await Book.findOne({ _id: req.params.id }).populate('category');;
    if (!book) {
      throw new Error("id not found");
    }
    res.status(200).json({ book, message: "buku ditemukan" });
  } catch (err) {
    console.error(err); // Tambahkan logging error
    res.status(404).json({ message: "id not found" });
  }
};

// addbook baru bisa
const addBooks = async (req, res) => {
  const { namaBuku, penerbit, pengarang, tahunTerbit, tempatTerbit, isbn, jmlhhlmn, abstrak, category } = req.body;
  //tambahan
  // const pdfUrl = req.files['pdfUrl'][0].id; // Mengambil ID dari file PDF yang diupload
  // const imageUrl = req.files['imageUrl'][0].id;

  //baru
  const pdfUrl = req.files['pdfUrl'] ? req.files['pdfUrl'][0].id : null;
  const imageUrl = req.files['imageUrl'] ? req.files['imageUrl'][0].id : null;
  console.log("Uploaded Files: ", req.files);

  try {
    if (!req.files['pdfUrl'] || req.files['pdfUrl'].length === 0) {
      throw new Error("PDF file is required");
    }

    const pdfUrl = req.files['pdfUrl'][0].id;
    const imageUrl = req.files['imageUrl'] ? req.files['imageUrl'][0].id : null;

    const duplikat = await Book.findOne({ namaBuku });
    if (duplikat) {
      throw new Error("nama buku sudah ada");
    }

    const newBook = new Book({
      namaBuku,
      penerbit,
      pengarang,
      tahunTerbit,
      tempatTerbit,
      isbn,
      jmlhhlmn,
      abstrak,
      pdfUrl,
      imageUrl,
      category,
    });

    const addBook = await newBook.save();
    res.status(201).json({ addBook, message: "berhasil ditambahkan" });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err.message });
  }
};

// Update book
const updateBook = async (req, res) => {
  const { namaBuku, penerbit, pengarang, tahunTerbit, tempatTerbit, isbn, jmlhhlmn, abstrak, category } = req.body;
  const pdfUrl = req.file ? req.file.id : null;
  const imageUrl = req.file ? req.file.id : null;

  try {
    const book = await Book.findOne({ _id: req.params.id });
    if (!book) {
      throw new Error("id not found");
    }

    const duplikat = await Book.findOne({ namaBuku });
    if (book.namaBuku !== namaBuku && duplikat) {
      throw new Error("nama buku sudah ada");
    }

    const updateData = {
      namaBuku,
      penerbit,
      pengarang,
      tahunTerbit,
      tempatTerbit,
      isbn,
      jmlhhlmn,
      abstrak,
      category,
    };

    if (pdfUrl) {
      updateData.pdfUrl = pdfUrl;
    }

    const bookUpdated = await Book.updateOne({ _id: req.params.id }, { $set: updateData });
    res.status(200).json({ bookUpdated, message: "Data Buku Berhasil Di Ubah" });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err.message });
  }
};

// Delete book
const deleteBook = async (req, res) => {
  try {
    const delBook = await Book.deleteOne({ _id: req.params.id });
    res.status(200).json(delBook);
  } catch (err) {
    console.error(err); // Tambahkan logging error
    res.status(404).json({ message: "id not found" });
  }
};

// Handle bad requests
const reqError = (req, res) => {
  res.status(400).json({ status: 400, message: "cannot request with this end point" });
};

//baru
const downloadFile = async (req, res, next) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: "Buku tidak ditemukan" });
    }
    const pdfId = book.pdfUrl;
    gfsBucket.find({ _id: mongoose.Types.ObjectId(pdfId) }).toArray((err, files) => {
      if (!files || files.length === 0) {
        return res.status(404).json({ message: "File tidak ditemukan" });
      }

      const file = files[0];

      if (file.contentType === 'application/pdf') {
        const downloadStream = gfsBucket.openDownloadStream(mongoose.Types.ObjectId(pdfId));
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'inline; filename="' + file.filename + '"');
        downloadStream.pipe(res);
      } else {
        res.status(400).json({ message: "Bukan file PDF" });
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Kesalahan server" });
  }
};


// Get image by book ID
const downloadImage = async (req, res, next) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    const imageId = book.imageUrl;
    gfsBucket.find({ _id: mongoose.Types.ObjectId(imageId) }).toArray((err, files) => {
      if (!files || files.length === 0) {
        return res.status(404).json({ message: "File not found" });
      }

      const file = files[0];

      const downloadStream = gfsBucket.openDownloadStream(mongoose.Types.ObjectId(imageId));
      res.setHeader('Content-Type', file.contentType);
      downloadStream.pipe(res);
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getAllBooks,
  addBooks,
  getBookById,
  updateBook,
  deleteBook,
  reqError,
  searchBook,
  downloadFile,
  downloadImage,
};
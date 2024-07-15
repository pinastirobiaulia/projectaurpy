const multer = require('multer');
const { GridFsStorage } = require('multer-gridfs-storage');
const path = require('path');
const crypto = require('crypto');

// URI MongoDB
//const mongoURI = process.env.MONGODB_ATLAS;
const mongoURI = 'mongodb+srv://pinastiaul:vmjHXEGrffgQbqgH@aurpy.pzccrez.mongodb.net/?retryWrites=true&w=majority&appName=aurpy';

// Buat storage engine
const storage = new GridFsStorage({
    url: mongoURI,
    options: { useNewUrlParser: true, useUnifiedTopology: true },
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            crypto.randomBytes(16, (err, buf) => {
                if (err) {
                    return reject(err);
                }
                const filename = buf.toString('hex') + path.extname(file.originalname);
                const fileInfo = {
                    filename: filename,
                    bucketName: 'uploads' // Nama koleksi di MongoDB
                };
                //console.log('File Info:', fileInfo);
                resolve(fileInfo);
            });
        });
    }
});


// // Set storage engine
// const storage = multer.diskStorage({
//     destination: './uploads/',
//     filename: function (req, file, cb) {
//         cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
//     }
// });


// const upload = multer({ storage });
const upload = multer({
    storage,
    limits: { fileSize: 50 * 1024 * 1024 }, // Batas ukuran file 50MB dalam bytes
});

// const upload = multer({
//     storage: storage,
//     fileFilter: function (req, file, cb) {
//         const filetypes = /pdf/;
//         const mimetype = filetypes.test(file.mimetype);
//         const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
//         if (mimetype && extname) {
//             return cb(null, true);
//         } else {
//             cb(new Error('Only PDF files are allowed!'));
//         }
//     }
// });

// // Gunakan body-parser middleware
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

module.exports = upload;



// Initialize upload
// const upload = multer({
//     storage: storage,
//     limits: { fileSize: 1000000 }, // 1MB file size limit
//     fileFilter: function (req, file, cb) {
//         checkFileType(file, cb);
//     }
// }).single('pdf');

// // Check file type
// function checkFileType(file, cb) {
//     const filetypes = /pdf/;
//     const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
//     const mimetype = filetypes.test(file.mimetype);

//     if (mimetype && extname) {
//         return cb(null, true);
//     } else {
//         cb('Error: PDFs Only!');
//     }
// }

// module.exports = upload;


// const multer = require('multer');
// const path = require('path');

// // Konfigurasi penyimpanan
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, 'uploads/');
//     },
//     filename: function (req, file, cb) {
//         cb(null, Date.now() + path.extname(file.originalname)); // Menambahkan timestamp ke nama file
//     }
// });

// // Filter file untuk hanya mengizinkan PDF
// const fileFilter = (req, file, cb) => {
//     if (file.mimetype === 'application/pdf') {
//         cb(null, true);
//     } else {
//         cb(new Error('File harus dalam format PDF'), false);
//     }
// };

// const upload = multer({
//     storage: storage,
//     fileFilter: fileFilter
// });

// module.exports = upload;


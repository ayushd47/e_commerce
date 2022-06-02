const multer = require("multer")

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log(file)
        cb(null, 'public/uploads/files')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname)
    }
})

const fileFilter = function (req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png|svg|JPG|JPEG|PNG|SVG|mp4|flv|3gp|mp3|mov|avi|mpeg|mkv)$/)) {
        return cb(new Error('You can upload an image and video file only'), false)
    }
    cb(null, true)
}

const upload = multer(
    {
        storage: storage,
        fileFilter: fileFilter
    }
);

module.exports = upload;
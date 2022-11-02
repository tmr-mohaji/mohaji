const express = require("express");
const router = express.Router();
const review = require("../controller/ReviewController");

const path = require("path");
const multer = require("multer");
const upload = multer({
    storage: multer.diskStorage({
        destination(req, file, done) {
            done(null, path.join(__dirname, '../../../react/project/build/img/review_img/'));
        },
        filename(req, file, done) {
            const ext = path.extname(file.originalname);
            done(null, path.basename(file.originalname, ext) + ext);
        }
    }),
    limits: {fileSize : 5*1024*1024},
})

router.get("/getComment", review.getComment);
router.post("/writeComment", upload.single("userfile"), review.writeComment);
router.delete("/deleteComment", review.deleteComment);

module.exports = router;
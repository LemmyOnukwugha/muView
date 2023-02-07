var express = require("express");
var albumsCtrl = require("../controllers/albums");
var multer = require("multer");

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/images");
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now());
  },
});

var upload = multer({ storage: storage });

var router = express.Router();

/* GET users listing. */
router.get("/", albumsCtrl.index);
router.get("/new", albumsCtrl.new);
router.get("/:id", albumsCtrl.show);
router.post("/", upload.single("cover"), albumsCtrl.create);

module.exports = router;

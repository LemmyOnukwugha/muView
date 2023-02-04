var express = require("express");
var router = express.Router();
var albumsCtrl = require("../controllers/albums");

/* GET users listing. */
router.get("/", albumsCtrl.index);
router.get("/new", albumsCtrl.new);
router.get("/:id", albumsCtrl.show);
router.post("/", albumsCtrl.create);

module.exports = router;

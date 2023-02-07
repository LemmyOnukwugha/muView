const express = require("express");
const router = express.Router();
const reviewsCtrl = require("../controllers/reviews");

router.post("/albums/:id/reviews", reviewsCtrl.create);
router.put("/reviews/:id", reviewsCtrl.update);
router.delete("/reviews/:id", reviewsCtrl.delete);
module.exports = router;

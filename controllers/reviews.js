const Album = require("../models/album");

function create(req, res) {
  Album.findById(req.params.id, function (err, album) {
    album.reviews.push(req.body);
    album.save(function (err) {
      res.redirect(`/albums/${album._id}`);
    });
  });
}

module.exports = {
  create,
};

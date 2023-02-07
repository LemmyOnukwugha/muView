const Album = require("../models/album");

function create(req, res) {
  Album.findById(req.params.id, function (err, album) {
    album.reviews.push(req.body);
    album.save(function (err) {
      res.redirect(`/albums/${album._id}`);
    });
  });
}

function update(req, res) {
  Album.findOne({ "reviews._id": req.params.id }, function (err, album) {
    const commentSubdoc = album.reviews.id(req.params.id);
    console.log(req);
    commentSubdoc.content = req.body.text;
    commentSubdoc.rating = req.body.rating;
    album.save(function (err) {
      if (err) {
        console.error(err);
        return;
      }
      res.redirect(`/albums/${album._id}`);
    });
  });
}

function deleteReview(req, res) {
  Album.findOne({ "reviews._id": req.params.id }, function (err, album) {
    const commentSubdoc = album.reviews.id(req.params.id);
    commentSubdoc.remove();
    album.save(function (err) {
      res.redirect(`/albums/${album._id}`);
    });
  });
}

module.exports = {
  create,
  update,
  delete: deleteReview,
};

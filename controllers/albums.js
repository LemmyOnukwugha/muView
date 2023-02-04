const Album = require("../models/album");

function newAlbum(req, res) {
  res.render("albums/new");
}

function index(req, res, next) {
  Album.find({}, (err, albums) => {
    if (err) {
      console.log(err);
      res.redirect("/");
    }
    res.render("albums/index", { albums });
  });
}

function create(req, res) {
  req.body.by = req.body.by.replace(/\s*,\s*/g, ",");
  if (req.body.by) req.body.by = req.body.by.split(",");
  const album = new Album(req.body);
  album.save(function (err) {
    if (err) return res.render("albums/new");
    console.log(album);
    res.redirect("/albums");
  });
}

module.exports = {
  new: newAlbum,
  create,
  index,
};

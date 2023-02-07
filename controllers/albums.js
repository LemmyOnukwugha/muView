const Album = require("../models/album");
const Image = require("../models/image");
const fs = require("fs");
const path = require("path");

function index(req, res, next) {
  Album.find({}, (err, albums) => {
    if (err) {
      console.log(err);
      res.redirect("/");
    }
    res.render("albums/index", { albums });
  });
}

function show(req, res) {
  Album.findById(req.params.id, (err, album) => {
    res.render("albums/show", { title: "Album Detail", album });
  });
}

function newAlbum(req, res) {
  res.render("albums/new");
}

function create(req, res) {
  const obj = {
    name: req?.body?.tile,
    img: {
      data: req.file.buffer,
      contentType: "image/png",
    },
  };
  Image.create(obj, (err, image) => {
    if (err) {
      console.log(err, "error saving image");
    } else {
      image.save();
      console.log(image, "image was saved");
      res.redirect("/");
    }
  });
  console.log(req.file, "the file in the request");
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
  show,
};

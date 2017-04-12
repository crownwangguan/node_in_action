var photos = [];

photos.push({
    name: 'Node.js Logo',
    path: 'https://nodejs.org/static/images/logos/nodejs-green.png'
});

photos.push({
    name: 'Ryan Speaking',
    path: 'https://nodejs.org/images/ryan-speaker.jpg'
});

exports.list = function(req, res) {
    res.render('photos', {
        title: 'Photos',
        photos: photos
    });
};

exports.form = function(req, res) {
    res.render('photos/upload', {
        title: 'Photo upload'
    })
};

const Photo = require('../models/photo');
const path = require('path');
const fs = require('fs');
let join = path.join;
const multer = require('multer');

var storage = multer.diskStorage({
	destination: function(req, file, callback) {
		callback(null, './public/photos')
	},
	filename: function(req, file, callback) {
		callback(null, req.body.photo.name)
	}
})

exports.submit = function(dir) {
    return function(req, res, next) {
        var upload = multer({
            storage: storage,
            fileFilter: function(req, file, callback) {
                var ext = path.extname(file.originalname)
                if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
                    return callback(res.end('Only images are allowed'), null)
                }
                callback(null, true)
            }
        }).single('photo[image]');
        upload(req, res, function(err) {
            if(err){
                console.log(err)
            }
            var new_image = new Photo({name: req.body.photo.name, path: './public/photos/'+req.body.photo.name});
            new_image.save(err => {
                if (err) return next(err);

                res.redirect('/');
            })
        });
    }
}
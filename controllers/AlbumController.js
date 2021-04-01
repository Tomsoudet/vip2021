
let model = require("../models/vip.js");
var async = require('async');

// ////////////////////// L I S T E R     A L B U M S

module.exports.ListerAlbum = function(request, response){
   response.title = 'Album des stars';
    model.getlisterPhotos(function (err, result) {
        if (err) {
            console.log(err);
            return;
        }

        response.listePhotos = result;
        console.log();
        response.render('listerAlbum', response);

    })
  } ;

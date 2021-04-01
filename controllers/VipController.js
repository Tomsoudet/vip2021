
let model = require("../models/vip.js");
var async = require('async');

// ///////////////////////// R E P E R T O I R E    D E S     S T A R S

module.exports.Repertoire = 	function(request, response){
   response.title = 'Répertoire des stars';

   model.getInitiale(function(err, result){
       if (err) {
           console.log(err);
           return;
       }

      response.initiale = result;

      response.render('repertoireVips', response);
    } );
  }

  module.exports.ListeStars = function (request, response) {
   let data = request.params.initiale;
   console.log(data);
   response.title = "Stars dont le nom commence par " + data;

   async.parallel([
      function (callback) {
         model.getInitiale(function (err, result) {
            callback(null, result);
         });
      },
      function (callback) {
         model.getListeVIP(data, function (err, result) {
            callback(null, result)
         });
      }
   ],
      function (err, result) {
         if (err) {
            console.log(err);
            return;
         }
         response.initiale = result[0];
         response.stars = result[1];
         console.log(result[1]);
         response.render('repertoireVips', response);
      }
   );
}

module.exports.DetailVIP = function (request, response) {
 let data = request.params.detailVIP;
 console.log(data);
 response.title = "Stars dont le nom commence par " + data;

 async.parallel([
    function (callback) {
       model.getInitiale(function (err, result) {
          callback(null, result);
       });
    },
    function (callback) {
       model.getDetailVIP(data, function (err, result) {
          callback(null, result)
       });
    },
    function (callback) {
       model.getEstActeur(data, function (err, result) {
          callback(null, result)
       });
    },
    function (callback) {
       model.getEstChanteur(data, function (err, result) {
          callback(null, result)
       });
    },
    function (callback) {
       model.getEstCouturier(data, function (err, result) {
          callback(null, result)
       });
    },
    function (callback) {
       model.getEstMannequin(data, function (err, result) {
          callback(null, result)
       });
    },
    function (callback) {
       model.getEstRealisateur(data, function (err, result) {
          callback(null, result)
       });
    },
    function (callback) {
       model.getEstHomme(data, function (err, result) {
          callback(null, result)
       });
    },
    function (callback) {
       model.getdetailActeur(data, function (err, result) {
          callback(null, result)
       });
    },
    function (callback) {
       model.getdetailChanteur(data, function (err, result) {
          callback(null, result)
       });
    },
    function (callback) {
       model.getdetailCouturier(data, function (err, result) {
          callback(null, result)
       });
    },
    function (callback) {
       model.getdetailMannequin(data, function (err, result) {
          callback(null, result)
       });
    },
    function (callback) {
       model.getdetailRealisateur(data, function (err, result) {
          callback(null, result)
       });
    },
    function (callback) {
       model.getdetailMariage(data, function (err, result) {
          callback(null, result)
       });
    },
    function (callback) {
       model.getdetailLiaison(data, function (err, result) {
          callback(null, result)
       });
    },
    function (callback) {
       model.getdetailQuiSuisJe(data, function (err, result) {
          callback(null, result)
       });
    },
    function (callback) {
       model.getdetailPhotos(data, function (err, result) {
          callback(null, result)
       });
    }
 ],
    function (err, result) {
       if (err) {
          console.log(err);
          return;
       }
       response.initiale = result[0];
       response.detailVIP = result[1];
       response.estActeur = result[2];
       response.estChanteur = result[3];
       response.estCouturier = result[4];
       response.estMannequin = result[5];
       response.estRealisateur = result[6];
       response.estHomme = result[7];
       response.detailActeur = result[8];
       response.detailChanteur = result[9];
       response.detailCouturier = result[10];
       response.detailMannequin = result[11];
       response.detailRealisateur = result[12];
       response.detailMariage = result[13];
       response.detailLiaison = result[14];
       response.detailQuiSuisJe = result[15];
       response.detailPhotos = result[16];
       console.log(result[16]);
       response.render('repertoireVips', response);
    }
 );
}

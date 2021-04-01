
let model = require("../models/vip.js");
let async = require("async");


module.exports.DetailsVip = function (request, response) {
    response.title = 'Articles';

    model.getListeVIP(function (err, result) {
        if (err) {
            console.log(err);
            return;
        }

        response.listeVIP = result;

        response.render('articles', response);

    })
};


module.exports.DetailsArticle = function (request, response) {
    response.title = 'Articles';

    let numeroData = request.params.numeroRouter;
    console.log(numeroData);

    async.parallel([

            function (callback) {
                model.getListeVIP(function (err, result) {callback(null, result)});
            },

            function (callback) {
                model.articleVIP(numeroData, function (err, result) {callback(null, result)});
            },

        ],

        function (err, result) {
            if (err) {
                console.log(err);
                return;
            }

            response.listeVIP = result[0];
            response.articleVIP = result[1];
            response.render('articles', response);

        }
    );

};

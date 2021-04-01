let db = require('../configDb');


module.exports.test = function(callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            let sql = "SELECT COUNT(*) AS NB FROM vip ;";
              // console.log(sql);
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};

module.exports.getInitiale = function(callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            let sql = "SELECT DISTINCT SUBSTRING(VIP_NOM, 1, 1) AS firstletter FROM vip ORDER by firstletter asc;";
              // console.log(sql);
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};

module.exports.getListeVIP = function (firstletter, callback) {
    db.getConnection(function (err, connexion) {
        if (!err) {
            let sql = "SELECT DISTINCT  VIP_NOM as nom,   p.VIP_NUMERO as numero, VIP_PRENOM as prenom, p.PHOTO_ADRESSE as img FROM vip  join photo p ON vip.VIP_NUMERO=p.VIP_NUMERO WHERE VIP_NOM LIKE '" + firstletter  + "%' AND PHOTO_NUMERO = 1 ORDER BY 1 asc ";
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};

module.exports.getDetailVIP = function (numero, callback) {
    db.getConnection(function (err, connexion) {
        if (!err) {
            let sql = "SELECT DISTINCT p.VIP_NUMERO as numero, p.PHOTO_ADRESSE as img, VIP_NOM as nom, VIP_PRENOM as prenom, v.VIP_NAISSANCE as naissance, n.NATIONALITE_NOM as nationalite, v.VIP_SEXE as sexe FROM vip v  join photo p ON v.VIP_NUMERO=p.VIP_NUMERO join nationalite n on v.NATIONALITE_NUMERO=n.NATIONALITE_NUMERO WHERE p.VIP_NUMERO='"+numero+"' AND PHOTO_NUMERO = 1 ORDER BY 1 asc ";
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};

module.exports.getEstCouturier = function (numero, callback) {
    db.getConnection(function (err, connexion) {
        if (!err) {
            let sql = "SELECT c.VIP_NUMERO FROM couturier c JOIN vip v ON v.VIP_NUMERO=c.VIP_NUMERO WHERE v.VIP_NUMERO="+numero+"";
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};

module.exports.getEstMannequin = function (numero, callback) {
    db.getConnection(function (err, connexion) {
        if (!err) {
            let sql = "SELECT m.VIP_NUMERO FROM mannequin m JOIN vip v ON v.VIP_NUMERO=m.VIP_NUMERO WHERE v.VIP_NUMERO="+numero+"";
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};

module.exports.getEstChanteur = function (numero, callback) {
    db.getConnection(function (err, connexion) {
        if (!err) {
            let sql = "SELECT c.VIP_NUMERO FROM chanteur c JOIN vip v ON v.VIP_NUMERO=c.VIP_NUMERO WHERE v.VIP_NUMERO="+numero+"";
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};

module.exports.getEstActeur = function (numero, callback) {
    db.getConnection(function (err, connexion) {
        if (!err) {
            let sql = "SELECT a.VIP_NUMERO FROM acteur a JOIN vip v ON v.VIP_NUMERO=a.VIP_NUMERO WHERE v.VIP_NUMERO="+numero+"";
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};

module.exports.getEstRealisateur = function (numero, callback) {
    db.getConnection(function (err, connexion) {
        if (!err) {
            let sql = "SELECT r.VIP_NUMERO FROM realisateur r JOIN vip v ON v.VIP_NUMERO=r.VIP_NUMERO WHERE v.VIP_NUMERO="+numero+"";
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};

module.exports.getEstHomme = function (numero, callback) {
    db.getConnection(function (err, connexion) {
        if (!err) {
            let sql = "SELECT VIP_SEXE as sexe FROM vip p " + "WHERE VIP_NUMERO="+numero+"";
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};

module.exports.getdetailActeur= function(numero ,callback ) {
    db.getConnection(function(err, connexion) {
        if (!err) {

            let sql = "SELECT f.FILM_TITRE as titre, f.FILM_DATEREALISATION as date, v.VIP_NUMERO as numReal, v.VIP_PRENOM as preReal, v.VIP_NOM as nomReal" +
                " FROM acteur a JOIN joue j ON a.VIP_NUMERO=j.VIP_NUMERO JOIN film f ON j.FILM_NUMERO=f.FILM_NUMERO " +
                "JOIN realisateur r ON r.VIP_NUMERO=f.VIP_NUMERO JOIN vip v ON v.VIP_NUMERO=r.VIP_NUMERO  WHERE a.VIP_NUMERO="+numero+"";

            connexion.query(sql, callback);
            connexion.release();
        }
    });
};

module.exports.getdetailMannequin= function(numero ,callback ) {
    db.getConnection(function(err, connexion) {
        if (!err) {

            let sql = "SELECT DEFILE_LIEU as lieu, DEFILE_DATE as date, v.VIP_PRENOM as preCout, v.VIP_NOM as nomCout, v.VIP_NUMERO as numCout " +
                "FROM defiledans dd JOIN defile d ON dd.DEFILE_NUMERO=d.DEFILE_NUMERO JOIN couturier c ON d.VIP_NUMERO=c.VIP_NUMERO " +
                "JOIN vip v ON v.VIP_NUMERO=c.VIP_NUMERO" +
                " WHERE dd.VIP_NUMERO="+numero+"";

            connexion.query(sql, callback);
            connexion.release();
        }
    });
};

module.exports.getdetailChanteur= function(numero ,callback ) {
    db.getConnection(function(err, connexion) {
        if (!err) {

            let sql ="SELECT ALBUM_TITRE as titre, ALBUM_DATE as date, MAISONDISQUE_NOM as maisonDisque " +
                "FROM chanteur c JOIN composer co ON c.VIP_NUMERO=CO.VIP_NUMERO JOIN album a ON co.ALBUM_NUMERO=a.ALBUM_NUMERO  " +
                "JOIN maisondisque m ON a.MAISONDISQUE_NUMERO=m.MAISONDISQUE_NUMERO" +
                " WHERE c.VIP_NUMERO="+numero+"";

            connexion.query(sql, callback);
            connexion.release();
        }
    });
};

module.exports.getdetailRealisateur= function(numero ,callback ) {
    db.getConnection(function(err, connexion) {
        if (!err) {

            let sql ="SELECT FILM_TITRE as titre, FILM_DATEREALISATION as date FROM realisateur r " +
                "JOIN film f ON r.VIP_NUMERO=f.VIP_NUMERO WHERE f.VIP_NUMERO="+numero+"";

            connexion.query(sql, callback);
            connexion.release();
        }
    });
};

module.exports.getdetailCouturier= function(numero ,callback ) {
    db.getConnection(function(err, connexion) {
        if (!err) {

            let sql ="SELECT DEFILE_LIEU as lieu, DEFILE_DATE as date FROM defile r " +
                "JOIN couturier f ON r.VIP_NUMERO=f.VIP_NUMERO WHERE f.VIP_NUMERO="+numero+"";

            connexion.query(sql, callback);
            connexion.release();
        }
    });
};

module.exports.getdetailMariage= function(numero ,callback ) {
    db.getConnection(function(err, connexion) {
        if (!err) {

          let sql = "SELECT v2.VIP_NUMERO as numero, v2.VIP_NOM as nom , v2.VIP_PRENOM as prenom, DATE_EVENEMENT as dateMariage, MARIAGE_LIEU as lieu ,MARIAGE_FIN as finMariage," +
              "MARIAGE_MOTIFFIN as motifFin, PHOTO_ADRESSE as photo, SUBSTRING(v2.VIP_TEXTE, 1, 150) as description FROM vip v join mariage m ON v.VIP_NUMERO=m.VIP_NUMERO " +
              "JOIN vip v2 ON m.VIP_VIP_NUMERO=v2.VIP_NUMERO join photo p on v2.VIP_NUMERO=p.VIP_NUMERO WHERE p.PHOTO_NUMERO=1 and v.VIP_NUMERO =" + numero + "";

            connexion.query(sql, callback);
            connexion.release();
        }
    });
};

module.exports.getdetailLiaison= function(numero ,callback ) {
    db.getConnection(function(err, connexion) {
        if (!err) {

            let sql = "SELECT v2.VIP_NUMERO as numero, v2.VIP_NOM as nom , v2.VIP_PRENOM as prenom, DATE_EVENEMENT as " +
                "dateLiaison, LIAISON_MOTIFFIN as motifFin, PHOTO_ADRESSE as photo, SUBSTR(v2.VIP_TEXTE, 1, 150) as description " +
                "FROM vip v join liaison l ON v.VIP_NUMERO=l.VIP_NUMERO JOIN vip v2 ON l.VIP_VIP_NUMERO=v2.VIP_NUMERO join photo p on v2.VIP_NUMERO=p.VIP_NUMERO " +
                "WHERE p.PHOTO_NUMERO=1 and v.VIP_NUMERO =" + numero + "";

            //console.log(sql);
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};

module.exports.getdetailQuiSuisJe= function(numero ,callback ) {
    db.getConnection(function(err, connexion) {
        if (!err) {

            let sql = "SELECT VIP_TEXTE as qui " +
                "FROM vip v WHERE v.VIP_NUMERO =" + numero + "";

            //console.log(sql);
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};

module.exports.getdetailPhotos = function(numero ,callback ) {
    db.getConnection(function(err, connexion) {
        if (!err) {

            let sql = "SELECT PHOTO_ADRESSE as photo, PHOTO_COMMENTAIRE as commentaire FROM vip v JOIN photo p ON p.VIP_NUMERO=v.VIP_NUMERO " +
                "WHERE p.VIP_NUMERO= "+numero+" and PHOTO_NUMERO != 1;";

            console.log(sql);
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};

module.exports.getlisterPhotos = function(callback ) {
    db.getConnection(function(err, connexion) {
        if (!err) {

            let sql = "SELECT PHOTO_ADRESSE as photo FROM vip v JOIN photo p ON p.VIP_NUMERO=v.VIP_NUMERO " +
                "WHERE PHOTO_NUMERO = 1;";

            console.log(sql);
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};

module.exports.articleVIP = function (numero, callback) {
    db.getConnection(function (err, connexion) {
        if (!err) {

            let sql = "SELECT ARTICLE_RESUME as texte, ARTICLE_DATE_INSERT as date, v.VIP_NUMERO as numero, VIP_PRENOM as prenom, VIP_NOM as nom from " +
                "article a join apoursujet aps on a.ARTICLE_NUMERO=aps.ARTICLE_NUMERO join vip v on aps.VIP_NUMERO=v.VIP_NUMERO where v.VIP_NUMERO=" + numero + "";

            //console.log(sql);
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};

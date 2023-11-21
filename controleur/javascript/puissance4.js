var largeurFenetre = document.documentElement.clientWidth;
var hauteurFenetre = document.documentElement.clientHeight;
var plateau = document.getElementById("plateau");
var canvas = plateau.getContext("2d");
var matricePion = initialiserMatrice();
var isAutourDuJaune = true;
var largeurPlateau = hauteurFenetre * 0.7;
var hauteurPlateau = hauteurFenetre * 0.6;
var tailleCercle = (largeurPlateau / (7 * 2.3));
var posX = (largeurPlateau / 19) + tailleCercle;
var posY = (largeurPlateau / 20) + tailleCercle;
var ecart = tailleCercle * 2.1;
function initialiserMatrice() {
    var mat = [];
    for (var i = 0; i < 6; i++) {
        var liste = [];
        for (var j = 0; j < 7; j++) {
            liste.push(-1);
        }
        mat.push(liste);
    }
    return mat;
}
function creerPlateau() {
    console.log(matricePion);
    plateau.width = largeurPlateau;
    plateau.height = hauteurPlateau;
    canvas.fillStyle = "blue";
    canvas.fillRect(10, 10, largeurPlateau, hauteurPlateau);
    console.log(tailleCercle);
    var x = posX;
    var y = posY;
    for (var i = 0; i < 6; i++) {
        for (var j = 0; j < 7; j++) {
            creerCercle(x, y, tailleCercle, [i, j], null);
            x += ecart;
        }
        y += ecart;
        x = (largeurPlateau / 19) + tailleCercle;
    }
}
function creerCercle(x, y, rayon, position, couleur) {
    if (position === void 0) { position = []; }
    var cercle = new Path2D();
    cercle.arc(x, y, rayon, 0, 2 * Math.PI);
    canvas.beginPath();
    canvas.arc(x, y, rayon, 0, 2 * Math.PI);
    if (couleur == null)
        canvas.fillStyle = "white";
    else if (couleur === "jaune")
        canvas.fillStyle = "yellow";
    else
        canvas.fillStyle = "red";
    canvas.strokeStyle = "black";
    canvas.fill();
    canvas.stroke();
    plateau.addEventListener("click", function (event) {
        if (canvas.isPointInPath(cercle, event.offsetX, event.offsetY)) {
            console.log("j'ai cliqué sur le cercle !");
            if (position.length !== 0) {
                console.log("position i : " + position[0] + " position j : " + position[1]);
                placerPion([x, y, rayon], position);
            }
        }
    });
}
function trouverPositionDisponible(position) {
    if (matricePion[0][position[1]] !== -1)
        return -1;
    var i = 0;
    while (i < 5) {
        if (matricePion[i + 1][position[1]] !== -1) {
            isAutourDuJaune ? matricePion[i][position[1]] = 1 : matricePion[i][position[1]] = 0;
            return i;
        }
        i++;
    }
    isAutourDuJaune ? matricePion[5][position[1]] = 1 : matricePion[5][position[1]] = 0;
    return 5;
}
function placerPion(cercle, position) {
    var resultat = trouverPositionDisponible(position);
    console.log(resultat + position[1]);
    console.log(matricePion);
    if (resultat >= 0) {
        var x = posX + ecart * position[1];
        var y = posY + ecart * resultat;
        isAutourDuJaune ?
            creerCercle(x, y, cercle[2], [resultat, position[1]], "jaune")
            : creerCercle(x, y, cercle[2], [resultat, position[1]], "rouge");
        isAutourDuJaune = !isAutourDuJaune;
    }
}
// Au démarrage du document
$(function () {
    creerPlateau();
});
//# sourceMappingURL=puissance4.js.map
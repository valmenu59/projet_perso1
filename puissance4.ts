let largeurFenetre = document.documentElement.clientWidth;
let hauteurFenetre = document.documentElement.clientHeight;
let plateau: HTMLCanvasElement = <HTMLCanvasElement> document.getElementById("plateau");
let canvas: CanvasRenderingContext2D = plateau.getContext("2d");
let matricePion: number[][] = initialiserMatrice();
let isAutourDuJaune = true;
const largeurPlateau = hauteurFenetre* 0.7;
const hauteurPlateau = hauteurFenetre * 0.6;
const tailleCercle: number = (largeurPlateau / (7 * 2.3))
const posX = (largeurPlateau / 19) + tailleCercle;
const posY = (largeurPlateau / 20) + tailleCercle;
const ecart = tailleCercle * 2.1;

function initialiserMatrice(): number[][]{
    let mat: number[][] = [];
    for (let i = 0; i < 6; i++){
        let liste: Array<number> = [];
        for (let j = 0; j < 7; j++){
            liste.push(-1);
        }
        mat.push(liste);
    }
    return mat;
}

function creerPlateau(){
    console.log(matricePion);

    plateau.width = largeurPlateau;
    plateau.height = hauteurPlateau;

    canvas.fillStyle = "blue";
    canvas.fillRect(10, 10, largeurPlateau, hauteurPlateau);

    console.log(tailleCercle);


    let x = posX;
    let y = posY;
    for (let i = 0; i < 6; i++){
        for (let j = 0; j < 7; j++){
            creerCercle(x, y, tailleCercle, [i, j], null);
            x += ecart;
        }
        y += ecart;
        x = (largeurPlateau / 19) + tailleCercle;
    }

}


function creerCercle(x: number, y: number, rayon: number, position: Array<number> = [], couleur: string | null) {
    const cercle = new Path2D();
    cercle.arc(x, y, rayon, 0, 2 * Math.PI);
    canvas.beginPath();
    canvas.arc(x, y, rayon, 0, 2 * Math.PI);
    if (couleur == null) canvas.fillStyle = "white";
    else if (couleur === "jaune") canvas.fillStyle = "yellow";
    else canvas.fillStyle = "red";
    canvas.strokeStyle = "black";
    canvas.fill();
    canvas.stroke();

    plateau.addEventListener("click", function (event: MouseEvent) {
       if (canvas.isPointInPath(cercle, event.offsetX, event.offsetY)){
           console.log("j'ai cliqué sur le cercle !");
           if (position.length !== 0){
               console.log("position i : " + position[0] + " position j : " + position[1]);
               placerPion([x, y, rayon], position);
           }
       }
    });
}


function trouverPositionDisponible(position: Array<number>):number {
    if (matricePion[0][position[1]] !== -1)
        return -1;
    let i = 0;
    while (i < 5){
        if (matricePion[i + 1][position[1]] !== -1){
            isAutourDuJaune ? matricePion[i][position[1]] = 1 : matricePion[i][position[1]] = 0;
            return i;
        }
        i++;

    }
    isAutourDuJaune ? matricePion[5][position[1]] = 1 : matricePion[5][position[1]] = 0;
    return 5;
}

function placerPion(cercle : Array<number>, position: Array<number>){
    let resultat = trouverPositionDisponible(position);
    console.log(resultat + position[1]);
    console.log(matricePion);
    if (resultat >= 0){
        let x = posX + ecart * position[1];
        let y = posY + ecart * resultat;
        isAutourDuJaune ?
            creerCercle(x, y, cercle[2], [resultat, position[1]], "jaune")
            : creerCercle(x, y, cercle[2], [resultat, position[1]], "rouge");
        isAutourDuJaune = !isAutourDuJaune;
    }
}



// Au démarrage du document
$(() => {
    creerPlateau();
});
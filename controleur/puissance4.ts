let divPlateau = <HTMLDivElement> document.getElementById("divPlateau");
let plateau= <HTMLCanvasElement> document.getElementById("plateau");
let canvas = plateau.getContext("2d");
let texte = <HTMLParagraphElement> document.getElementById("texte");
let boutonRecommencer = <HTMLButtonElement> document.getElementById("recommencer");
let boutonQuitter = <HTMLButtonElement> document.getElementById("quitter");
let matricePion: number[][] = initialiserMatrice();
let isAutourDuJaune = true;
let largeurFenetre = document.documentElement.clientWidth;
let hauteurFenetre = document.documentElement.clientHeight;
let largeurPlateau = 0;
let hauteurPlateau = 0;
let tailleCercle: number = 0;
let posX = 0;
let posY = 0;
let ecart = 0;
let listeJoueurs: string[] = [];
let compteur = 1;

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

function definirTaille(){
    if (largeurFenetre > hauteurFenetre && largeurFenetre > 1200){
        largeurPlateau = hauteurFenetre * 0.7;
        hauteurPlateau = hauteurFenetre * 0.6;
    } else if (largeurFenetre <= hauteurFenetre){
        largeurPlateau = largeurFenetre;
        hauteurPlateau = largeurFenetre * 0.9;
    } else {
        largeurPlateau = hauteurFenetre* 0.8;
        hauteurPlateau = hauteurFenetre * 0.7;
    }
    tailleCercle= (largeurPlateau / (7 * 2.3));
    posX = (largeurPlateau / 19) + tailleCercle;
    posY = (largeurPlateau / 20) + tailleCercle;
    ecart = tailleCercle * 2.1;
}

function creerPlateau(nouveau: boolean){

    console.log(matricePion);
    definirTaille();

    plateau.width = largeurPlateau;
    plateau.height = hauteurPlateau;

    console.log(largeurFenetre + " " + hauteurFenetre);

    canvas.fillStyle = "blue";
    canvas.fillRect(0, 0, largeurPlateau, hauteurPlateau);

    placerCercle(nouveau);
}

function placerCercle(nouveau: boolean){
    let x = posX;
    let y = posY;
    for (let i = 0; i < 6; i++){
        for (let j = 0; j < 7; j++){
            let couleur: string | null = null;
            if (matricePion[i][j] === 0) couleur = "rouge";
            else if (matricePion[i][j] === 1) couleur = "jaune";
            let cercle = creerCercle(x, y, couleur);
            if (nouveau) {
                plateau.addEventListener("click", function (event: MouseEvent){
                    clickCercle(event, x, y, cercle, [i, j]);
                });
            }
            x += ecart;
        }
        y += ecart;
        x = (largeurPlateau / 19) + tailleCercle;
    }
}



function creerCercle(x: number, y: number, couleur: string | null) {
    const cercle = new Path2D();
    cercle.arc(x, y, tailleCercle, 0, 2 * Math.PI);
    canvas.beginPath();
    canvas.arc(x, y, tailleCercle, 0, 2 * Math.PI);
    if (couleur == null) canvas.fillStyle = "white";
    else if (couleur === "jaune") canvas.fillStyle = "yellow";
    else canvas.fillStyle = "red";
    canvas.strokeStyle = "black";
    canvas.fill();
    canvas.stroke();
    return cercle;
}

function clickCercle(event: MouseEvent, x: number, y:number,
                     cercle: Path2D, position: Array<number> = []) {
    const offsetX = event.offsetX;
    const offsetY = event.offsetY;
    try{
        if (canvas.isPointInPath(cercle, offsetX, offsetY)) {
            console.log("j'ai cliqué sur le cercle !");
            if (position.length !== 0) {
                console.log("position i : " + position[0] + " position j : " + position[1]);
                placerPion([x, y], position);
            }
        }
    } catch (e) {

    }
    
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
            creerCercle(x, y, "jaune")
            : creerCercle(x, y, "rouge");
        isAutourDuJaune = !isAutourDuJaune;
        affichageJoueurs();
        if (verifierVictoire([resultat, position[1]])){
            isAutourDuJaune ? texte.textContent = "🔴🔴🔴🔴 VICTOIRE DE " + listeJoueurs[1] + " 🔴🔴🔴🔴"
                : texte.textContent =  "🟡🟡🟡🟡 VICTOIRE DE " + listeJoueurs[0] + " 🟡🟡🟡🟡";
            desactiverActionPlateau();
        }
        if (verifExAEquo()) {
            texte.textContent = "🔴🟡 AExoquo !🟡🔴";
            desactiverActionPlateau();
        }
    }
}

function affichageJoueurs(){
    isAutourDuJaune ?
        texte.textContent = "🟡 Au tour de " + listeJoueurs[0] + " 🟡"
        : texte.textContent = "🔴 Au tour de " + listeJoueurs[1] + " 🔴";
}

function desactiverActionPlateau(){
    //permet de supprimer toutes les actions de canvas
    canvas = null;
}


function verifierVictoire(position: number[]):boolean{
    const i: number = position[0];
    const j: number = position[1];
    let posI: number = i;
    let posJ: number = j
    compteur = 1;
    // On regarde du pion vers le côté gauche
    while (posJ > 0){
        let res = regarderConditionVictoire(posI, posJ - 1);
        if (res === 1) return true;
        else if (res === 0) posJ--;
        else break;
    }
    // On regarde du pion vers le côté droit
    posJ = j;
    while (posJ < 6){
        let res = regarderConditionVictoire(posI, posJ + 1);
        if (res === 1) return true;
        else if (res === 0) posJ++;
        else break;
    }
    // Réinitialisation compteur
    compteur = 1;
    // On regarde du pion vers le bas
    posJ = j;
    while (posI < 5){
        console.log("Le numéro de I : " + posI);
        let res = regarderConditionVictoire(posI + 1, posJ);
        if (res === 1) return true;
        else if (res === 0) posI++;
        else break;
    }
    // Réinitialisation compteur
    compteur = 1;
    // On regarde vers gauche haut
    posI = i;
    while (posI > 0 && posJ > 0){
        let res = regarderConditionVictoire(posI - 1, posJ - 1);
        if (res === 1) return true;
        else if (res === 0){
            posI--;
            posJ--;
        }
        else break;
    }
    // On regarde vers droite bas
    posI = i;
    posJ = j;
    while (posI < 5 && posJ < 6){
        let res = regarderConditionVictoire(posI + 1, posJ + 1);
        if (res === 1) return true;
        else if (res === 0){
            posI++;
            posJ++;
        }
        else break;
    }
    // Réinitialisation compteur
    compteur = 1;
    // On regarde vers gauche bas
    posI = i;
    posJ = j;
    while (posI < 5 && posJ > 0){
        let res = regarderConditionVictoire(posI + 1, posJ - 1);
        if (res === 1) return true;
        else if (res === 0){
            posI++;
            posJ--;
        }
        else break;
    }
    // On regarde vers droite haut
    posI = i;
    posJ = j;
    while (posI > 0 && posJ < 6){
        let res = regarderConditionVictoire(posI - 1, posJ + 1);
        if (res === 1) return true;
        else if (res === 0){
            posI--;
            posJ++;
        }
        else break;
    }

    return false;
}

function regarderConditionVictoire(i: number, j: number):number {
    let nombre = isAutourDuJaune ? 0 : 1;
    console.log(nombre + " " + i + " " + j);
    if (matricePion[i][j] === nombre) {
        compteur++;
        console.log("J'incrémente le compteur de 1 : " + compteur);
        if (compteur === 4) return 1;
        else return 0;
    } else
        return -1;
}


function verifExAEquo(): boolean{
    for (let i = 0; i < 7; i++){
        if (matricePion[0][i] === -1) return false;
    }
    return true;
}



// Au démarrage du document
$(() => {
    document.getElementById("body").style.display = "block";
    // @ts-ignore
    let cookie = CookieTemporaire.getInstance();
    let i = 0;
    let matriceJoueurs: string[][] = [];
    do {
        i++;
        matriceJoueurs.push(
            [cookie.getCookie("nomJoueur" + i, false),
                cookie.getCookie("couleurJoueur" + i, false)]
        );

    } while ( i < 2);

    if (matriceJoueurs[0][1] === "random"){
        (Math.round(Math.random()) === 0) ?
            listeJoueurs.push(matriceJoueurs[0][0], matriceJoueurs[1][0])
            : listeJoueurs.push(matriceJoueurs[1][0], matriceJoueurs[0][0]);

    } else {
        matriceJoueurs[0][1] === "jaune" ?
            listeJoueurs.push(matriceJoueurs[0][0], matriceJoueurs[1][0])
            : listeJoueurs.push(matriceJoueurs[1][0], matriceJoueurs[0][0]);
    }

    let random: number = Math.round(Math.random());
    random === 1 ? isAutourDuJaune = true : isAutourDuJaune = false;

    boutonRecommencer.addEventListener("click", function () {
        location.reload();
    })
    boutonQuitter.addEventListener("click", function (){
        if (window.confirm("Voulez-vous vraiment quitter ? ")){
            // @ts-ignore
            redirection("/vue/configuration_jeu.html", "configuration_jeu.html");
        }
    })


    console.log(listeJoueurs);
    affichageJoueurs();
    creerPlateau(true);
});
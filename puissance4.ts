let largeurFenetre = window.innerWidth;
let hauteurFenetre = window.innerHeight
let plateau: HTMLCanvasElement = <HTMLCanvasElement> document.getElementById("plateau");
let ctx: CanvasRenderingContext2D = plateau.getContext("2d");

function creerPlateau(){



    let largeurPlateau = (largeurFenetre * 0.7) / 1.25;
    let hauteurPlateau = (largeurFenetre * 0.6) / 1.25;

    plateau.width = largeurPlateau;
    plateau.height = hauteurPlateau;

    ctx.fillStyle = "blue";
    ctx.fillRect(10, 10, largeurPlateau, hauteurPlateau);

    creerCercle(50, 50, 20);

}


function creerCercle(x: number, y: number, rayon: number) {
    const cercle = new Path2D();
    cercle.arc(x, y, rayon, 0, 2 * Math.PI);
    ctx.beginPath();
    ctx.arc(x, y, rayon, 0, 2 * Math.PI);
    ctx.fillStyle = "white";
    ctx.strokeStyle = "black";
    ctx.fill();
    ctx.stroke();

    plateau.addEventListener("click", function (event: MouseEvent) {
       if (ctx.isPointInPath(cercle, event.offsetX, event.offsetY)){
           console.log("j'ai cliqué sur le cercle !");
       }
    });
}



// Au démarrage du document
$(() => {
    creerPlateau();
});
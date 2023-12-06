import {redirection} from "./redirection/redirection.js";
import {Cookie} from "./cookie/Cookie.js";

const body = <HTMLDivElement> document.getElementById("body");
const boutonAccepter = <HTMLButtonElement> document.getElementById("boutonValider");
const alerteInput1 = <HTMLParagraphElement> document.getElementById("alerte_texte1");
const alerteInput2 = <HTMLParagraphElement> document.getElementById("alerte_texte2");
const alerteSelect1 = <HTMLParagraphElement> document.getElementById("alerte_select1");
const alerteSelect2 = <HTMLParagraphElement> document.getElementById("alerte_select2");
const texteJoueur1 = <HTMLInputElement> document.getElementById("joueur1");
const texteJoueur2 = <HTMLInputElement> document.getElementById("joueur2");
const selectionJoueur1 = <HTMLSelectElement> document.getElementById("couleur_J1");
const selectionJoueur2 = <HTMLSelectElement> document.getElementById("couleur_J2");
const theme = <HTMLImageElement> document.getElementById("iconeTheme");
let classeJoueurs = <HTMLCollectionOf <HTMLDivElement>> document.getElementsByClassName("joueur");
let input = <HTMLCollectionOf<HTMLInputElement>> document.getElementsByTagName("input");


function verifierEtatMenu(){
    reinitialiserAlertes();
    const texte1: string = texteJoueur1.value;
    const texte2: string = texteJoueur2.value;
    const select1: string = selectionJoueur1.value;
    const select2: string = selectionJoueur2.value;
    let toutEstOK: boolean = true;
    if (texte1.length < 3) {
        alerteInput1.textContent = "Vous devez avoir au moins 3 caractères";
        toutEstOK = false;
    }
    if (texte2.length < 3){
        alerteInput2.textContent = "Vous devez avoir au moins 3 caractères";
        toutEstOK = false;
    }
    if (texte1 === texte2){
        alerteInput1.textContent += "\nLes 2 surnoms ne peuvent être identiques";
        toutEstOK = false;
    }
    if (select1 === ""){
        alerteSelect1.textContent = "Vous n'avez sélectionné aucune valeur";
        toutEstOK = false;
    }
    if (select2 === ""){
        alerteSelect2.textContent = "Vous n'avez sélectionné aucune valeur";
        toutEstOK = false;
    }

    if (toutEstOK) {
        let cookie = Cookie.getInstance();
        cookie.creerCookie("nomJoueur1", texte1);
        cookie.creerCookie("nomJoueur2", texte2);
        cookie.creerCookie("couleurJoueur1", select1);
        cookie.creerCookie("couleurJoueur2", select2);

        //redirection2("http://localhost:3000/jeu", "/src/vue/plateau_puissance_4.html");
        //redirection("/jeu");
        redirection("/jeu");
    }
}

function redirection2(url: string, chemin: string){
    $.ajax({
        type: 'POST',
        url: "/jeu",
        success: function (){
            console.log("réussi");
            document.location.href = "/jeu";
        }
    });
}

function reinitialiserAlertes(){
    alerteInput1.textContent = "";
    alerteInput2.textContent = "";
    alerteSelect1.textContent = "";
    alerteSelect2.textContent = "";
}


function changerMenuDeroulant(numeroSelect: number){
    if (numeroSelect === 1){
        if (selectionJoueur1.value == "rouge") selectionJoueur2.selectedIndex = 2;
        else if (selectionJoueur1.value == "jaune") selectionJoueur2.selectedIndex = 1;
        else selectionJoueur2.selectedIndex = 3;
    } else {
        if (selectionJoueur2.value == "rouge") selectionJoueur1.selectedIndex = 2;
        else if (selectionJoueur2.value == "jaune") selectionJoueur1.selectedIndex = 1;
        else selectionJoueur1.selectedIndex = 3;
    }
}

function changerTheme(){
    if (theme.alt === "icone lune"){ //theme clair
        theme.alt = "icone soleil";
        body.style.backgroundColor = "#0E0E18FF";
        body.style.color = "#ffffff";
        theme.src = "/src/ressources/icones/soleil.png";
        // @ts-ignore
        for (let doc of classeJoueurs){
            doc.style.backgroundColor = "#191925FF";
        }
        boutonAccepter.style.backgroundColor = "#030303FF";
        boutonAccepter.style.color = "#ffffff";
        boutonAccepter.style.borderColor = "#ffffff";

        // @ts-ignore
        for (let elem of input){
            elem.style.backgroundColor = "#202020";
            elem.style.borderColor = "#000000";
            elem.style.color = "#ffffff";
        }


    } else {
        theme.alt = "icone lune";
        body.style.backgroundColor = "#fafafa";
        body.style.color = "#000000";
        theme.src = "/src/ressources/icones/lune.png";
        // @ts-ignore
        for (let doc of classeJoueurs){
            doc.style.backgroundColor = "#F0F0F0FF";
        }
        boutonAccepter.style.backgroundColor = "#ffffff";
        boutonAccepter.style.color = "#000000";
        boutonAccepter.style.borderColor = "#000000";
    }
}


// @ts-ignore
$(() => {
    boutonAccepter.addEventListener("click", verifierEtatMenu);
    selectionJoueur1.addEventListener("change", function () {
        changerMenuDeroulant(1);
    });
    selectionJoueur2.addEventListener("change", function () {
        changerMenuDeroulant(2);
    });
    theme.addEventListener("click", changerTheme);
    boutonAccepter.addEventListener("mouseover", function () {
        theme.alt === "icone soleil" ?
            boutonAccepter.style.backgroundColor = "#856B35FF"
            : boutonAccepter.style.backgroundColor = "#d3941c";
    });
    boutonAccepter.addEventListener("mouseout", function () {
        theme.alt === "icone soleil" ?
            boutonAccepter.style.backgroundColor = "#030303FF"
            : boutonAccepter.style.backgroundColor = "#ffffff";
    });

});
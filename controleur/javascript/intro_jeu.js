var boutonAccepter = document.getElementById("bouton_valider");
var alerteInput1 = document.getElementById("alerte_texte1");
var alerteInput2 = document.getElementById("alerte_texte2");
var alerteSelect1 = document.getElementById("alerte_select1");
var alerteSelect2 = document.getElementById("alerte_select2");
var texteJoueur1 = document.getElementById("joueur1");
var texteJoueur2 = document.getElementById("joueur2");
var selectionJoueur1 = document.getElementById("couleur_J1");
var selectionJoueur2 = document.getElementById("couleur_J2");
function verifierEtatMenu() {
    reinitialiserAlertes();
    var texte1 = texteJoueur1.value;
    var texte2 = texteJoueur2.value;
    var select1 = selectionJoueur1.value;
    var select2 = selectionJoueur2.value;
    var toutEstOK = true;
    if (texte1.length < 3) {
        alerteInput1.textContent = "Vous devez avoir au moins 3 caractères";
        toutEstOK = false;
    }
    if (texte2.length < 3) {
        alerteInput2.textContent = "Vous devez avoir au moins 3 caractères";
        toutEstOK = false;
    }
    if (texte1 == texte2) {
        alerteInput1.textContent += "\nLes 2 surnoms ne peuvent être identiques";
        toutEstOK = false;
    }
    if (select1 == "") {
        alerteSelect1.textContent = "Vous n'avez sélectionné aucune valeur";
        toutEstOK = false;
    }
    if (select2 == "") {
        alerteSelect2.textContent = "Vous n'avez sélectionné aucune valeur";
        toutEstOK = false;
    }
    if (toutEstOK)
        document.location.href = "../vue/plateau_puissance_4.html";
}
function reinitialiserAlertes() {
    alerteInput1.textContent = "";
    alerteInput2.textContent = "";
    alerteSelect1.textContent = "";
    alerteSelect2.textContent = "";
}
function changerMenuDeroulant(numeroSelect) {
    if (numeroSelect == 1) {
        if (selectionJoueur1.value == "rouge")
            selectionJoueur2.selectedIndex = 2;
        else if (selectionJoueur1.value == "jaune")
            selectionJoueur2.selectedIndex = 1;
        else
            selectionJoueur2.selectedIndex = 3;
    }
    else {
        if (selectionJoueur2.value == "rouge")
            selectionJoueur1.selectedIndex = 2;
        else if (selectionJoueur2.value == "jaune")
            selectionJoueur1.selectedIndex = 1;
        else
            selectionJoueur1.selectedIndex = 3;
    }
}
$(function () {
    boutonAccepter.addEventListener("click", verifierEtatMenu);
    selectionJoueur1.addEventListener("change", function () {
        changerMenuDeroulant(1);
    });
    selectionJoueur2.addEventListener("change", function () {
        changerMenuDeroulant(2);
    });
});
//# sourceMappingURL=intro_jeu.js.map
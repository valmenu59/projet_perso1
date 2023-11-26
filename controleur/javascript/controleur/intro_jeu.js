const boutonAccepter = document.getElementById("boutonValider");
const alerteInput1 = document.getElementById("alerte_texte1");
const alerteInput2 = document.getElementById("alerte_texte2");
const alerteSelect1 = document.getElementById("alerte_select1");
const alerteSelect2 = document.getElementById("alerte_select2");
const texteJoueur1 = document.getElementById("joueur1");
const texteJoueur2 = document.getElementById("joueur2");
const selectionJoueur1 = document.getElementById("couleur_J1");
const selectionJoueur2 = document.getElementById("couleur_J2");
function verifierEtatMenu() {
    reinitialiserAlertes();
    const texte1 = texteJoueur1.value;
    const texte2 = texteJoueur2.value;
    const select1 = selectionJoueur1.value;
    const select2 = selectionJoueur2.value;
    let toutEstOK = true;
    if (texte1.length < 3) {
        alerteInput1.textContent = "Vous devez avoir au moins 3 caractères";
        toutEstOK = false;
    }
    if (texte2.length < 3) {
        alerteInput2.textContent = "Vous devez avoir au moins 3 caractères";
        toutEstOK = false;
    }
    if (texte1 === texte2) {
        alerteInput1.textContent += "\nLes 2 surnoms ne peuvent être identiques";
        toutEstOK = false;
    }
    if (select1 === "") {
        alerteSelect1.textContent = "Vous n'avez sélectionné aucune valeur";
        toutEstOK = false;
    }
    if (select2 === "") {
        alerteSelect2.textContent = "Vous n'avez sélectionné aucune valeur";
        toutEstOK = false;
    }
    if (toutEstOK) {
        // @ts-ignore
        let cookie = CookieTemporaire.getInstance();
        cookie.creerCookie("nomJoueur1", texte1);
        cookie.creerCookie("nomJoueur2", texte2);
        cookie.creerCookie("couleurJoueur1", select1);
        cookie.creerCookie("couleurJoueur2", select2);
        // @ts-ignore
        redirection("/vue/plateau_puissance_4.html", "plateau_puissance_4.html");
    }
}
function reinitialiserAlertes() {
    alerteInput1.textContent = "";
    alerteInput2.textContent = "";
    alerteSelect1.textContent = "";
    alerteSelect2.textContent = "";
}
function changerMenuDeroulant(numeroSelect) {
    if (numeroSelect === 1) {
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
$(() => {
    boutonAccepter.addEventListener("click", verifierEtatMenu);
    selectionJoueur1.addEventListener("change", function () {
        changerMenuDeroulant(1);
    });
    selectionJoueur2.addEventListener("change", function () {
        changerMenuDeroulant(2);
    });
});
//# sourceMappingURL=intro_jeu.js.map
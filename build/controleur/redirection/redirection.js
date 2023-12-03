"use strict";
function redirection(chemin, dossier) {
    // @ts-ignore
    $.ajax({
        type: 'POST',
        url: '/controleur/redirection/',
        data: { source: chemin },
        success: function () {
            console.log("réussi");
            document.location.href = dossier;
        }
    });
}
//# sourceMappingURL=redirection.js.map
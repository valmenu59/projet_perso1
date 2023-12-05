"use strict";
function redirection(url, chemin) {
    // @ts-ignore
    $.ajax({
        type: 'POST',
        url: url,
        data: { source: chemin },
        success: function () {
            console.log("réussi");
        }
    });
}
//# sourceMappingURL=redirection.js.map
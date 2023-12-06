export function redirection(url, url2 = null) {
    $.ajax({
        type: 'POST',
        url: url,
        success: function () {
            console.log("réussi");
            url2 == null ?
                document.location.href = url : document.location.href = url2;
        }
    });
}
//# sourceMappingURL=redirection.js.map
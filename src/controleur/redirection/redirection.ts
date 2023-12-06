export function redirection(url: string, url2: string | null = null){
    $.ajax({
        type: 'POST',
        url: url,
        success: function (){
            console.log("réussi");
            url2 == null ?
                document.location.href = url : document.location.href = url2;
        }
    });
}
function redirection(url: string, chemin: string){
    // @ts-ignore
    $.ajax({
        type: 'POST',
        url: url,
        data: {source: chemin},
        success: function (){
            console.log("réussi");
        }
    });
}
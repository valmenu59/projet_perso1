function redirection(chemin: string, dossier: string){
    // @ts-ignore
    $.ajax({
        type: 'POST',
        url: '/controleur/redirection/',
        data: {source: chemin},
        success: function (){
            console.log("réussi");
            document.location.href = dossier;
        }
    });
}
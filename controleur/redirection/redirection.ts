function redirection(chemin: string, dossier: string){
    $.ajax({
        type: 'POST',
        url: '/controleur/redirection/redirection.php',
        data: {source: chemin},
        success: function (){
            console.log("réussi");
            document.location.href = dossier;
        }
    });
}
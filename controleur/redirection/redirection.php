<?php

function redirection($fichier){
    header('Location: ' . $fichier);
    exit;
}

redirection($_POST['source']);

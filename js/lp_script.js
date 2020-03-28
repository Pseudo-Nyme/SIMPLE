var file_reader;

function init() {
    file_reader = document.getElementById("file_reader");
}

function choixFiche() {
    file_reader.click();
}

function verifierFiche() {
    //TODO
    /*
     * si 1 seul fichier
     *   si fichier .json
     *     lireFiche(fiche);
     *   sinon
     *     Message d'erreur
     * sinon
     *   Message d'erreur
     */
    
    if (file_reader.length == 1) 
    {
        var fiche = file_reader.files[0];
        
    } 
    else {
        //TODO
    }
}

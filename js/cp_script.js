//Pages
let pageID = "#pageIdentite";
let pageCA = "#pageCaracteristiques";

//Boutons
let buttonID = "#buttonID";
let buttonCA = "#buttonCA";

//Identité
let textNom = "#textNom";
let textPrenom = "#textPrenom";
let selectRace = "#selectRace";
let selectClasse = "#selectClasse";
let textGenre = "#textGenre";
let numberAge = "#numberAge";
let textHistoire = "#textHistoire";

//Caractéristiques
let rangeNiveau = "#rangeNiveau";
let pointsDisponibles = "#pointsDisponibles";
let rangeCorps = "#rangeCorps";
let rangeCombat = "#rangeCombat";
let rangeMental = "#rangeMental";
let rangeSocial = "#rangeSocial";
let listePerformances = [rangeCorps, rangeCombat, rangeMental, rangeSocial];
let specialisationsCorps = "#specialisationsCorps";
let specialisationsCombat = "#specialisationsCombat";
let specialisationsMental = "#specialisationsMental";
let specialisationSocial = "#specialisationSocial";
let listeSpécialisations = [specialisationsCorps, specialisationsCombat, specialisationsMental, specialisationSocial];

//Général
let alerte = "#alerte";
let buttonCreer = "#buttonCreerPersonnage";

//Points de niveaux
let pointsMax = 3;
let pointsConsommés = 0;

//Objet Personnage
let perso = new Personnage();

function init() {
    //TODO Initialisation de la page
    $(buttonID).click();
}

function afficherOnglet(value) {
    if(value == "ID")
    {
        $(pageID).show();
        $(pageCA).hide();
        $(buttonID).prop("disabled",true);
        $(buttonCA).prop("disabled",false);
    }
    else
    {
        $(pageCA).show();
        $(pageID).hide();
        $(buttonCA).prop("disabled",true);
        $(buttonID).prop("disabled",false);
    }
}

function majPoints() {
    //TODO Calcul et affichage des points restants
}

function creerPersonnage() {
    //TODO Créer et télécharger personnage sous forme de JSON
}

//TODO retravailler download ?
function download(data, filename) {
    let file = new Blob([data], {type: "application/json"});
    if (window.navigator.msSaveOrOpenBlob) // IE10+
        window.navigator.msSaveOrOpenBlob(file, filename);
    else { // Others
        let a = document.createElement("a");
        let url = URL.createObjectURL(file);
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(function() {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);  
        }, 0); 
    }
}

function Personnage() {
    //TODO créer classe personnage
}
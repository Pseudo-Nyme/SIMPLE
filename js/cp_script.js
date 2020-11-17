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
let pointsRestant = "#pointsRestant";
let rangeCorps = "#rangeCorps";
let rangeCombat = "#rangeCombat";
let rangeMental = "#rangeMental";
let rangeSocial = "#rangeSocial";
let listePerformances = [rangeCorps, rangeCombat, rangeMental, rangeSocial];
let specialisationsCorps = ".checkboxCorps";
let specialisationsCombat = ".checkboxCombat";
let specialisationsMental = ".checkboxMental";
let specialisationSocial = ".checkboxSocial";
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

function modifierPointsMax() {
    pointsMax = 1;
    for(let i = 1; i <= $(rangeNiveau).val(); i++)
        pointsMax += i;
    
    $(pointsRestant).text(pointsMax - pointsConsommés);
}

function modifierPointsRestant() {
    //TODO Calcul et affichage des points restants
    pointsConsommés = 0;

    listePerformances.forEach(p => {
        let val = $(p).val();
        if(val == 2)
            pointsConsommés += 2;
        else if(val == 3)
            pointsConsommés += 5;
        else if(val == 4)
            pointsConsommés += 8;
    });

    listeSpécialisations.forEach(s => {
        let nb = 0;
        $(s).each(function() {
            if($(this).is(':checked'))
                nb++;

            if(nb > 1)
                pointsConsommés += (nb - 1);
        });
    });

    $(pointsRestant).text(pointsMax - pointsConsommés);
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
    //Identié
    this.nom = "Goodenough";
    this.prenom = "David";
    this.race = "Humain";
    this.classe = "Barbare";
    this.age = 1;
    this.histoire = "Né dans la petite ville de Paris, il existe.";

    //Caractéristiques
    this.niveau = 1;
    this.corps = 1;
    this.combat = 1;
    this.mental = 1;
    this.social = 1;

    //Spécialisations
    this.speCorps = new Array();
    this.speCombat = new Array();
    this.speMental = new Array();
    this.speSocial = new Array();
}
//Pages
var pageID;
var pageCA;

//Boutons
var boutonID;
var boutonCA;

//Identité
var textNom;
var textPrenom;
var selectRace;
var selectClasse;
var textGenre;
var numberAge;
var textHistoire;

//Caractéristiques
var rangeNiveau;
var pointsDisponibles;
var rangeCorps;
var rangeCombat;
var rangeMental;
var rangeSocial;
var listePerformances;
var alerte;
var specialisationsCorps;
var specialisationsCombat;
var specialisationsMental;
var specialisationSocial;
var listeSpécialisations;

//Général
var pointsRestants;

function init() {
    //Pages
    pageID = document.getElementById("pageIdentite");
    pageCA = document.getElementById("pageCaracteristiques");
    
    //Bouton
    boutonID = document.getElementsByTagName("button")[0];
    boutonCA = document.getElementsByTagName("button")[1];
    
    //Identité
    textNom = document.getElementById("textNom");
    textPrenom = document.getElementById("textPrenom");
    selectRace = document.getElementById("selectRace");
    selectClasse = document.getElementById("selectClasse");
    textGenre = document.getElementById("textGenre");
    numberAge = document.getElementById("numberAge");
    textHistoire = document.getElementById("textHistoire");
    
    //Caractéristiques
    rangeNiveau = document.getElementById("rangeNiveau");
    pointsDisponibles = document.getElementById("pointsDisponibles");
    rangeCorps = document.getElementById("rangeCorps");
    rangeCombat = document.getElementById("rangeCombat");
    rangeMental = document.getElementById("rangeMental");
    rangeSocial = document.getElementById("rangeSocial");
    listePerformances = [rangeCorps, rangeCombat, rangeMental, rangeSocial];
    alerte = document.getElementById("alerte");
    alerte.style.display = "none";
    specialisationsCorps = document.getElementsByClassName("checkboxCorps");
    specialisationsCombat = document.getElementsByClassName("checkboxCombat");
    specialisationsMental = document.getElementsByClassName("checkboxMental");
    specialisationSocial = document.getElementsByClassName("checkboxSocial");
    listeSpécialisations = [specialisationsCorps, specialisationsCombat, specialisationsMental, specialisationSocial];
    
    //Mettre à jour les points
    changerPoints();
    
    //Afficher PageID et masquer PageCA
    boutonID.click();
}

function afficherOnglet() {
    var bouton = event.target;
    //Clique sur le bouton d'Identité
    if(bouton.isSameNode(boutonID))
    {
        pageID.style.display = "block";
        pageCA.style.display = "none";
        boutonID.disabled = true;
        boutonCA.disabled = false;
    }
    //Clique sur le bouton de Caractéristiques
    else
    {
        pageID.style.display = "none";
        pageCA.style.display = "block";
        boutonID.disabled = false;
        boutonCA.disabled = true;
    }
}

function changerPoints() {
    var points = 2;
    //Calculer points disponible au niveau choisi
    for(var i = 1; i < parseInt(rangeNiveau.value); i++)
        points += i;
    
    //Calculer points consommés
    var pointsConsommés = 0;
    
    //Par performances
    var niveauPerf;
    listePerformances.forEach(perf => {
        niveauPerf = perf.value.toString();
        if(niveauPerf > 0)
        {
            if(niveauPerf == 2)
                pointsConsommés += 2;
            else if(niveauPerf == 3)
                pointsConsommés += 5;
            else if(niveauPerf == 4)
                pointsConsommés += 8;
        }
    })
    
    //Par spécialisations
    var nombreSpecialisations;
    //Pour chaque liste de Spécialisation par Performance
    listeSpécialisations.forEach(listeActuelle => {
        nombreSpecialisations = 0;
        for(specialisation of listeActuelle)
        {
            if(specialisation.checked == true)
                nombreSpecialisations++;
        }
        if(nombreSpecialisations > 1)
        {
            pointsConsommés += (nombreSpecialisations - 1);
        }
    })
    
    pointsRestants = points - pointsConsommés;
    pointsDisponibles.textContent = "Points disponibles : " + pointsRestants.toString();
}

function creerPersonnage() {
    //TODO
        //Créer l'objet Personnage
        //Créer le JSON
        //dowload(data, filename)
    var complet = true;
    listeSpécialisations.forEach(listeActuelle => {
        nombreSpecialisations = 0;
        for(specialisation of listeActuelle)
        {
            if(specialisation.checked == true)
                nombreSpecialisations++;
        }
        if(nombreSpecialisations == 0)
            complet = false;
    })
    
    if(complet == true && pointsRestants >= 0)
    {
        alerte.style.display = "none";
        
        //Identité
        var nom = textNom.value;
        var prenom = textPrenom.value;
        var race = selectRace.value;
        var classe = selectClasse.value;
        var genre = textGenre.value;
        var age = numberAge.value;
        var histoire = textHistoire.value;

        //Caractéristiques
        var vie;
        switch(selectRace.value) {
            case "Humain" :
                vie = 10; break;
            case "Elfe" :
                vie = 10; break;
            case "Nain" :
                vie = 12; break;
            case "Orc" :
                vie = 12; break;
        }
        vie += parseInt(rangeNiveau.value) * (vie - 1);
        var niveau = rangeNiveau.value.toString();
        var points = pointsRestants;
        
        var corps = rangeCorps.value.toString();
        var combat = rangeCombat.value.toString();
        var mental = rangeMental.value.toString();
        var social = rangeSocial.value.toString();
        
        var speCorps = new Array();
        
        for(specialisation of specialisationsCorps)
        {
            if(specialisation.checked == true)
                speCorps.push(specialisation.value);
        }
        var speCombat = new Array();
        for(specialisation of specialisationsCombat)
        {
            if(specialisation.checked == true)
                speCombat.push(specialisation.value);
        }
        var speMental = new Array();
        for(specialisation of specialisationsMental)
        {
            if(specialisation.checked == true)
                speMental.push(specialisation.value);
        }
        var speSocial = new Array();
        for(specialisation of specialisationSocial)
        {
            if(specialisation.checked == true)
                speSocial.push(specialisation.value);
        }
        
        var personnage = new Personnage(nom, prenom, race, classe, genre, age, histoire, vie, niveau, points, corps, combat, mental,social,speCorps,speCombat,speMental,speSocial);
        var personnageJSON = JSON.stringify(personnage);
        var nomJSON;
        if(nom == "" || prenom == "")
        {
            nomJSON = "PersonnageSIMPLE";
        }
        else
        {
            nomJSON = nom + "_" + prenom;
        }
        download(personnageJSON, nomJSON);
    }
    else if(complet == false)
    {
        alerte.textContent = "Vous n'avez pas choisi de Spécialisation dans une des Perfomances.";
        alerte.style.display = "block";
    }
    else if(pointsRestants < 0)
    {
        alerte.textContent = "Vous avez dépensé plus de points que disponibles.";
        alerte.style.display = "block";
    }
}

// Function to download data to a file
function download(data, filename) {
    var file = new Blob([data], {type: "application/json"});
    if (window.navigator.msSaveOrOpenBlob) // IE10+
        window.navigator.msSaveOrOpenBlob(file, filename);
    else { // Others
        var a = document.createElement("a");
        var url = URL.createObjectURL(file);
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

function Personnage(nom, prenom, race, classe, genre, age, histoire, vie, niveau, pointsRestants, corps, combat, mental,social,specialisationsCorps,specialisationsCombat,specialisationsMental,specialisationsSocial) {
    //Identité
    this.nom = nom;
    this.prenom = prenom;
    this.race = race;
    this.classe = classe;
    this.genre = genre;
    this.age = age;
    this.histoire = histoire;
    
    //Caractéristiques
    this.vie = vie;
    this.niveau = niveau
    this.pointsRestant = pointsRestants;
    this.corps = corps;
    this.combat = combat;
    this.mental = mental;
    this.social = social;
    this.specialisationsCorps = specialisationsCorps;
    this.specialisationsCombat = specialisationsCombat;
    this.specialisationsMental = specialisationsMental;
    this.specialisationsSocial = specialisationsSocial;
}
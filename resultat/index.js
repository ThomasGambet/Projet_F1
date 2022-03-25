"use strict";

let lesResultats; //nomGP, nompilote, nomecurie, place, point

window.onload = init;

function init() {
    $.ajax({
        url: 'ajax/getlesresultats.php',
        type: 'POST',
        data: {},
        dataType: "json",
        error: response => console.error(response.responseText),
        success: remplirLesDonnees
    });
    idgrandprix.onchange = afficher;
}

function remplirLesDonnees(data) {
    lesResultats = data.lesResultats;
    for (const element of data.lesGrandprix) {
        idgrandprix.appendChild(new Option(element.nom, element.id));
    }
    afficher();
}

function afficher() {
    lesLignes.innerHTML = "";
    for (const resultats of lesResultats) {
        if (idgrandprix.value === resultats.idgrandprix)
            afficherResultats(resultats);
    }
}

function afficherResultats(resultats) {
    let tr = document.createElement('tr');

    let td = document.createElement('td');
    td.classList.add('text-center', 'masquer');
    td.innerText = resultats.place;
    tr.appendChild(td);

    td = document.createElement('td');
    td.classList.add('text-center');
    td.innerText = resultats.nompilote;
    tr.appendChild(td);

    td = document.createElement('td');
    td.classList.add('text-center');
    td.innerText = resultats.nomecurie;
    tr.appendChild(td);


    td = document.createElement('td');
    td.classList.add('text-center');
    td.innerText = resultats.point;
    tr.appendChild(td);

    lesLignes.appendChild(tr)
}

/* Variabili */

const oreLavoro = 10;
const prezziOrari = {
    backend: 20.50,
    frontend: 15.30,
    analisi: 33.60
};

const codiciSconto = ["YHDNU32", "JANJC63", "PWKCN25", "SJDPO96", "POCIE24"];
const scontoPercentuale = 25;

/* Funzione prezzo finale */

function calcolaPrezzoFinale(tipoLavoro, codicePromo) {
    const prezzoOrario = prezziOrari[tipoLavoro];
    let prezzoTotale = prezzoOrario * oreLavoro;
    const codiceValido = codicePromo && codiciSconto.includes(codicePromo);

    mostraErrore(codicePromo !== "" && !codiceValido);

    if (codiceValido) {
        prezzoTotale = applicaSconto(prezzoTotale);
    }

    return prezzoTotale.toFixed(2);
}
/* Funzione sconto */

function applicaSconto(prezzo) {
    return prezzo - (prezzo * scontoPercentuale / 100);
}

/* Funzione errore codice promozionale */

function mostraErrore(attivo) {
    const errore = document.getElementById("promo-error");
    errore.classList.toggle("d-none", !attivo);
}

document.querySelector("#preventivo-form").addEventListener("submit", function (e) {
    e.preventDefault();

    const tipoLavoro = document.getElementById("lavoro").value;
    const codicePromo = document.getElementById("codicePromo").value.trim().toUpperCase();

    if (!prezziOrari.hasOwnProperty(tipoLavoro)) {
        alert("Per favore seleziona un tipo di lavoro valido");
        return;
    }

    const prezzoFinale = calcolaPrezzoFinale(tipoLavoro, codicePromo);
    document.getElementById("prezzoFinale").innerHTML = `<strong>€ ${prezzoFinale}</strong>`;
});




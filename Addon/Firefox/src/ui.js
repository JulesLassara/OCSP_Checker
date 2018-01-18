const storage = require('./storage')
const url_parser = require('./url')

// Boutons
let btn_follow = document.getElementById('follow')
let btn_unfollow = document.getElementById('unfollow')
let btn_chevron_down = document.getElementById('chevron-down')
let btn_chevron_up = document.getElementById('chevron-up')
let btn_unfollowall = document.getElementById('unfollowall')
let btn_modif_done = document.getElementById('modif_done')

// Autres éléments
let followed = document.getElementById('followed')
let no_stapling = document.getElementById('no_stapling')
let unfollowed = document.getElementById('unfollowed')
let sites_list = document.getElementById('sites')
let div_modif = document.getElementById('modif_site')

/**
 * Affiche la liste des sites dans un tableau
 */
function printSites() {
    if (storage.isAvailable()) {
        // Vide l'ancien tableau
        clear()

        let row = sites_list.insertRow(0);

        if (storage.isEmpty()) {
            row.insertCell(0).innerHTML += 'Aucun site suivi.';
            row.insertCell(1).innerHTML += '';
            row.insertCell(2).innerHTML += '';
        } else {
            for (let i = 0; i < storage.getLength(); i++) {
                let hostname = storage.getHostname(i)
                let critical_age = storage.getCriticalAge(hostname)
                row.insertCell(0).innerHTML += hostname
                row.insertCell(1).innerHTML += critical_age
                row.insertCell(2).innerHTML += iconsWithId(hostname)
                row = sites_list.insertRow(0);
            }
        }

        row = sites_list.insertRow(0);
        row.insertCell(0).innerHTML += '<b>Site</b>'
        row.insertCell(1).innerHTML += '<b>Ancienneté critique</b>'
        row.insertCell(2).innerHTML += ''

    } else {
        storage.isUnavailableError()
    }
}

/**
 * Renvoie le string permettant d'ajouter les icônes de modification et de suppression
 */
function iconsWithId(site) { //Si vous avez une meilleure solution je suis preneur
    return '<i class="fa fa-pencil edit edit_site" id="' + site + '"></i> <i class="fa fa-remove edit delete_site" id="' + site + '"></i>'
}

/**
 * Vide la tableau
 */
function clear() {
    sites_list.innerHTML = '';
}

/**
 * Ajoute un site dans la liste
 * @param {String} site
 * @param {Number} duree
 */
function follow(site, duree) {
    storage.addSite(site, duree)
    showFollowed()
    printSites()
}

/**
 * Retire un site de la liste
 * @param {String} site
 */
function unfollow(site) {
    storage.removeSite(site)
    showUnfollowed()
    printSites()
}

/**
 * Retire tous les sites de la liste
 */
function unfollowAllSites() {
    storage.removeAllSites()
    printSites()
}

/**
 * Affiche que le site est suivi
 */
function showFollowed() {
    followed.hidden = false
    unfollowed.hidden = true
    no_stapling.hidden = true
}

/**
 * Affiche que le site n'est pas suivi
 */
function showUnfollowed() {
    followed.hidden = true
    no_stapling.hidden = true
    unfollowed.hidden = false
}

/**
 * Affiche que le site n'utilise pas OCSP Stapling
 */
function showDisabled() {
    followed.hidden = true
    unfollowed.hidden = true
    no_stapling.hidden = false
}

function showAddWarning() {
    document.getElementById('add_err').hidden = false;
}

function showModifWarning() {
    document.getElementById('modif_err').hidden = false;
}

module.exports = {
    printSites,
    btn_follow,
    btn_unfollow,
    btn_unfollowall,
    btn_chevron_down,
    btn_chevron_up,
    btn_modif_done,
    sites_list,
    unfollowAllSites,
    showFollowed,
    showUnfollowed,
    showDisabled,
    follow,
    unfollow,
    showAddWarning,
    showModifWarning,
    div_modif
}
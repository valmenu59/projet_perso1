"use strict";
class CookieTemporaire {
    static instance;
    constructor() { }
    static getInstance() {
        if (!CookieTemporaire.instance) {
            CookieTemporaire.instance = new CookieTemporaire();
        }
        return this.instance;
    }
    creerCookie(nom, valeur) {
        document.cookie = nom + "=" + valeur + "; path=/";
    }
    getCookie(nom, supprimer) {
        let nomCookie = nom + "=";
        let cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            let cookie = cookies[i].trim();
            if (cookie.indexOf(nomCookie) === 0) {
                let leCookie = cookie.substring(nomCookie.length, cookie.length);
                if (supprimer) {
                    this.removeCookie(nom);
                }
                return leCookie;
            }
        }
        return null;
    }
    removeCookie(nom) {
        document.cookie = nom + "=; path=/";
    }
}
//# sourceMappingURL=CookieTemporaire.js.map
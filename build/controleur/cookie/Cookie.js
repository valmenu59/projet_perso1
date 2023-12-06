export class Cookie {
    static instance;
    constructor() { }
    static getInstance() {
        if (!Cookie.instance) {
            Cookie.instance = new Cookie();
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
//# sourceMappingURL=Cookie.js.map
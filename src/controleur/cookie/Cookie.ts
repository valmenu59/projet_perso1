
export class Cookie {

    private static instance: Cookie;

    private constructor() {}

    public static getInstance(): Cookie{
        if (!Cookie.instance){
            Cookie.instance = new Cookie();
        }
        return this.instance;
    }

    public creerCookie(nom: string, valeur: string): void{
        document.cookie = nom + "=" + valeur + "; path=/";
    }

    public getCookie(nom: string, supprimer: boolean): any{
        let nomCookie = nom + "=";
        let cookies = document.cookie.split(';');

        for(let i = 0; i < cookies.length; i++) {
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


    public removeCookie(nom: string){
        document.cookie = nom + "=; path=/";
    }
}
// On importe les constantes du fichier env.js du dossier config afin de les utiliser dans les méthodes ci-dessous
import {DOMAIN, LOCAL_STORAGE_USER } from '@/config/env';

export default {
    methods: {
        // On crée une méthode dédié au "signup" ET "login", on lui passe en argument : une méthode, une url et des données
        $ajax(method, url, data) {
            // A REVOIR
            let user = JSON.parse(localStorage.getItem('user'))
            let auth =  (user && user.token) ? {'Content-Type': 'application/json', 'Authorization': 'Bearer' +' '+ user.token } : {'Content-Type': 'application/json'};
            // On déclare un variable url avec le nom de domaine (localhost.3000) + une url à passer
            url = DOMAIN + url;
            // On retourne la méthode, l'url, les donnéees et les headers
            return  this.$AJAX({
                method: method,
                url: url,
                data: (data) ? JSON.stringify(data) : '',
                headers: auth
            })
        },
        // On crée une méthode login qui va être utilisée dans la méthode signup afin que l'utilisateur soit connecté après son enregistrement
        $login(user) {
            // On retourne les résultats de la méthode ajax
           return this.$ajax("post", "/user/login/", user)
                .then((response) => {
                    console.log(response);
                    //alert("Login et setitem du user :)");
                    // On fait une setitem du user connecté dans le local storage pour une session de 24h
                    localStorage.setItem(LOCAL_STORAGE_USER, JSON.stringify(response.data))
                }).catch((error) => {
                    //alert("La méthode login n'a pas fonctonné :)");
                    console.log(error.response.data.message);
                });
        },
        $clearStorage(){
            let storageToClear = localStorage.getItem(LOCAL_STORAGE_USER);
            if (storageToClear != null) {
                localStorage.clear(LOCAL_STORAGE_USER);
            } 
        },
        $loadLocalStorage(id){
            return (localStorage.getItem(id) == null) ? [] : JSON.parse(localStorage.getItem(id));
        },
    }
}
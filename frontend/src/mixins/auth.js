// On importe les constantes du fichier env.js du dossier config afin de les utiliser dans les méthodes ci-dessous
import {DOMAIN, LOCAL_STORAGE_USER } from '@/config/env';

export default {
    methods: {

        //-- Méthodes dédiées au login et signup --//

        // On crée une méthode dédié au "signup" ET "login", on lui passe en argument : une méthode, une url et des données
        $ajax(method, url, data) {
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

        // On fait un setitem du user dans le local storage pour une session de 24h
        $initLogin(response) {
            console.log(response);
            this.$store.state.user = response.data;
            localStorage.setItem(LOCAL_STORAGE_USER, JSON.stringify(response.data))
        },

        // On crée une méthode login qui va être utilisée dans la méthode signup afin que l'utilisateur soit connecté automatiquement après son enregistrement
        $login(user) {
            // On retourne les résultats de la méthode ajax
           return this.$ajax("post", "/user/login/", user)
                .then((response) => {
                    this.$initLogin(response);
                }).catch((error) => {
                    console.log(error.response.data.message);
                });
        },

        // On contrôle qu'un user soit bien connecté pour l'accès au forum
        $checkLogin() {
            let storageDataUser = localStorage.getItem(LOCAL_STORAGE_USER);
            if (!storageDataUser) {
                this.$errorAccess();
                this.$router.push({  name: "home"});
            } else {
                this.$ajax("get", "/user/checkAuth")
                .then((response) => {
                    console.log(response);
                    this.$store.state.user = JSON.parse(storageDataUser);
                }).catch((error) => {
                    console.log(error);
                    this.$errorUser();
                    this.$router.push({  name: "home"});
                });
            }
        },
    }
}
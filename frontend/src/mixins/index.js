// On importe les constantes du fichier env.js du dossier config afin de les utiliser dans les méthodes ci-dessous
import {DOMAIN, LOCAL_STORAGE_USER } from '@/config/env';

export default {
    methods: {

        //-- Méthodes dédiées au login et signup --//

        // On crée une méthode pour vider le local storage
        $clearStorage(){
            let storageToClear = localStorage.getItem(LOCAL_STORAGE_USER);
            if (storageToClear != null) {
                localStorage.clear(LOCAL_STORAGE_USER);
            } 
        },

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

        // On fait un setitem du user dans le local storage pour une session de 24h
        $initLogin(response) {
            console.log(response);
            this.$store.state.user = response.data;
            localStorage.setItem(LOCAL_STORAGE_USER, JSON.stringify(response.data))
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
                    //Récupère les données du LocalStorage qui les met vers le store
                    this.$store.state.user = JSON.parse(storageDataUser);
                }).catch((error) => {
                    console.log(error);
                    this.$errorUser();
                    this.$router.push({  name: "home"});
                });
            }
        },

        //-- Méthodes dédiées aux messages d'erreur Swal --//

        $welcomeMessage() {
            this.$swal({
                icon: 'success',
                title: 'Bonjour ' + this.login + ' !',
                showConfirmButton: false,
                timer: 2500
            });
        },

        $errorUser() {
            this.$swal({
                icon: 'error',
                title: 'Oops...',
                text: 'Pseudo ou mot de passe incorrect !',
            });
        },

        $errorAccess() {
            this.$swal({
                icon: 'error',
                title: 'Oops...',
                text: 'Accès refusé !',
            });
        },

        $confirmLogout() {
            const swalWithBootstrapButtons = this.$swal.mixin({
                customClass: {
                    confirmButton: 'btn btn-secondary btn-confirm-delog',
                    cancelButton: 'btn btn-primary btn-cancel-delog'
                },
                buttonsStyling: false
                })
            swalWithBootstrapButtons.fire({
                title: 'Souhaitez-vous vous déconnecter ?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: '<i class="far fa-frown mr-2""></i>Déconnexion',
                cancelButtonText: '<i class="far fa-smile-beam mr-2""></i>Annuler', 
                reverseButtons: false
                }).then((result) => {
                if (result.value) {
                    swalWithBootstrapButtons.fire({
                        title: 'A bientôt !',
                        text: 'Merci pour votre visite',
                        icon: 'success',
                        timer: 2000,
                        showConfirmButton: false,
                    })
                    this.$clearStorage();
                    setTimeout(() => {  this.$router.push({ name: 'login'}); }, 2000);
                } else if (
                    result.dismiss === this.$swal.DismissReason
                ) {
                    return;
                }
            })
        },

        /*$confirmDeleteAccount() {
            const swalWithBootstrapButtons = this.$swal.mixin({
                customClass: {
                    confirmButton: 'btn btn-secondary btn-confirm-delog',
                    cancelButton: 'btn btn-primary btn-cancel-delog'
                },
                buttonsStyling: false
                })
            swalWithBootstrapButtons.fire({
                title: 'Êtes-vous sûr de vouloir fermer votre compte ?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: '<i class="far fa-frown mr-2""></i>Fermer le compte',
                cancelButtonText: '<i class="far fa-smile-beam mr-2""></i>Annuler', 
                reverseButtons: false
                }).then((result) => {
                if (result.value) {
                    swalWithBootstrapButtons.fire({
                        title: 'Au revoir !',
                        text: 'Merci pour votre visite',
                        icon: 'success',
                        timer: 2000,
                        showConfirmButton: false,
                    })
                    this.$clearStorage();
                    setTimeout(() => {  this.$router.push({ name: 'login'}); }, 2000);
                } else if (
                    result.dismiss === this.$swal.DismissReason.cancel
                ) {
                    return;
                }
            })
        },*/
        
        //-- Méthodes dédiées au contrôle du formulaire --//

        $checkFieldUsername(username){
            let usernameToControl = username;
            let regexUsernameToControl =  /^[A-Za-zéèàêë-]+$/;
            if (!regexUsernameToControl .test(usernameToControl) || usernameToControl.length <= 1) {
                const swalWithBootstrapButtons = this.$swal.mixin({
                    customClass: {
                      confirmButton: 'btn btn-secondary',
                    },
                    buttonsStyling: false
                  })
                  swalWithBootstrapButtons.fire({
                    title: 'Oops!',
                    text: 'Votre pseudo doit comporter plus d\'une lettre',
                    icon: 'error',
                    confirmButtonText: 'OK',
                  }).then((result) => {
                    if (result.value) {
                        return;
                    }
                  })
                return false;
            }
            return true;
        },

        $checkFieldEmail(email){
            let emailToControl = email;
            let regexEmailToControl = /.+@.+\..+/;
            if (!regexEmailToControl.test(emailToControl)) {
                const swalWithBootstrapButtons = this.$swal.mixin({
                    customClass: {
                      confirmButton: 'btn btn-secondary btn-ok',
                    },
                    buttonsStyling: false
                  })
                  swalWithBootstrapButtons.fire({
                    title: 'Oops!',
                    text: 'Entrez un format d\'email valide : johnDoe@gmail.com',
                    icon: 'error',
                    confirmButtonText: 'OK',
                  }).then((result) => {
                    if (result.value) {
                      return;
                    }
                  })
                return false;
            }
            return true;
        },

        $checkFieldPassword(password){
            let passwordToControl = password;
            if (passwordToControl.length <= 5) {
                const swalWithBootstrapButtons = this.$swal.mixin({
                    customClass: {
                      confirmButton: 'btn btn-secondary btn-ok',
                    },
                    buttonsStyling: false
                  })
                  swalWithBootstrapButtons.fire({
                    title: 'Oops!',
                    text: 'Entrez un mot de passe valide',
                    icon: 'error',
                    confirmButtonText: 'OK',
                  }).then((result) => {
                    if (result.value) {
                      return;
                    }
                  })
                return false;
            }
            return true;
        },

        //-- Méthodes dédiées à la gestion des urls dans les messages postés --//
        
        $linkify(inputText) {
            var replacedText, replacePattern1, replacePattern2, replacePattern3;
        
            //URLs avec http://, https://, ou ftp://
            replacePattern1 = /(\b(https?|ftp):\/\/[-A-Z0-9+&@#/%?=~_|!:,.;]*[-A-Z0-9+&@#/%=~_|])/gim;
            replacedText = inputText.replace(replacePattern1, '<a href="$1" target="_blank">$1</a>');
        
            //URLs avec "www." (sans // avant ça, ou redirige vers ceux du dessus
            replacePattern2 = /(^|[^/])(www\.[\S]+(\b|$))/gim;
            replacedText = replacedText.replace(replacePattern2, '$1<a href="http://$2" target="_blank">$2</a>');
        
            //Chagne l'email mail:to en lien cliquable
            replacePattern3 = /(([a-zA-Z0-9\-_.])+@[a-zA-Z_]+?(\.[a-zA-Z]{2,6})+)/gim;
            replacedText = replacedText.replace(replacePattern3, '<a href="mailto:$1">$1</a>');
        
            return replacedText;
        },
    }
}
// On importe les constantes du fichier env.js du dossier config afin de les utiliser dans les méthodes ci-dessous
import {DOMAIN, LOCAL_STORAGE_USER } from '@/config/env';

export default {
    methods: {
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
        // On crée une méthode login qui va être utilisée dans la méthode signup afin que l'utilisateur soit connecté après son enregistrement
        $login(user) {
            // On retourne les résultats de la méthode ajax
           return this.$ajax("post", "/user/login/", user)
                .then((response) => {
                    this.$initLogin(response);
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

        $initLogin(response) {
            console.log(response);
            this.$store.state.user = response.data;
            console.log("Session stored");
            console.log(this.$store.state.user);
            // On fait une setitem du user connecté dans le local storage pour une session de 24h
            localStorage.setItem(LOCAL_STORAGE_USER, JSON.stringify(response.data))
        },

        $checkLogin() {
            let storageDataUser = localStorage.getItem(LOCAL_STORAGE_USER);
            if (!storageDataUser) {
                this.$errorAccess();
                this.$router.push({  name: "home"});
            } else {
                this.$ajax("get", "/user/checkAuth")
                .then((response) => {
                    console.log(response);
                    //Recupere les données du LocalStorage qui les met vers le store
                    this.$store.state.user = JSON.parse(storageDataUser);
                }).catch((error) => {
                    //alert("La méthode login n'a pas fonctonné :)");
                    console.log(error);
                    this.$errorUser();
                    this.$router.push({  name: "home"});
                });
            }
        },
        $welcomeMessage() {
            this.$swal({
                icon: 'success',
                title: 'Welcome ' + this.login + '!',
                showConfirmButton: false,
                timer: 2500
            });
        },
        $errorUser() {
            this.$swal({
                icon: 'error',
                title: 'Oops...',
                text: 'Incorrect username or password :(!',
            });
        },
        $errorAccess() {
            this.$swal({
                icon: 'error',
                title: 'Oops...',
                text: 'Access denied :(!',
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
                title: 'Do you want to sign out?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: '<i class="far fa-frown mr-2""></i>Sign out',
                cancelButtonText: '<i class="far fa-smile-beam mr-2""></i>Cancel', 
                reverseButtons: false
                }).then((result) => {
                if (result.value) {
                    swalWithBootstrapButtons.fire({
                        title: 'Goodbye !',
                        text: 'Thank you for your visit :)',
                        icon: 'info',
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
        $confirmDeleteAccount() {
            const swalWithBootstrapButtons = this.$swal.mixin({
                customClass: {
                    confirmButton: 'btn btn-secondary btn-confirm-delog',
                    cancelButton: 'btn btn-primary btn-cancel-delog'
                },
                buttonsStyling: false
                })
            swalWithBootstrapButtons.fire({
                title: 'Are you sure you want to delete your account?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: '<i class="far fa-frown mr-2""></i>Delete',
                cancelButtonText: '<i class="far fa-smile-beam mr-2""></i>Cancel', 
                reverseButtons: false
                }).then((result) => {
                if (result.value) {
                    swalWithBootstrapButtons.fire({
                        title: 'Goodbye!',
                        text: 'Thank you for your visit :)',
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
        $confirmDeleteAccountAdmin() {
            const swalWithBootstrapButtons = this.$swal.mixin({
                customClass: {
                    confirmButton: 'btn btn-secondary btn-confirm-delog',
                    cancelButton: 'btn btn-primary btn-cancel-delog'
                },
                buttonsStyling: false
                })
            swalWithBootstrapButtons.fire({
                title: 'Are you sure you want to delete your account?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: '<i class="far fa-frown mr-2""></i>Delete',
                cancelButtonText: '<i class="far fa-smile-beam mr-2""></i>Cancel', 
                reverseButtons: false
                }).then((result) => {
                if (result.value) {
                    swalWithBootstrapButtons.fire({
                        title: 'Goodbye!',
                        text: 'Thank you for your visit :)',
                        icon: 'success',
                        timer: 2000,
                        showConfirmButton: false,
                    })
                } else if (
                    result.dismiss === this.$swal.DismissReason
                ) {
                    return;
                }
            })
        }
        
    }
}
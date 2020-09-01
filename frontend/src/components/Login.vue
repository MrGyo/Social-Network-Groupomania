<template>
    <div class="vue-template inner-block">
        <header-user></header-user>
        <form>
            <h3 mb-3 style="color:#48abe4;">Connexion</h3>
            <div class="form-group text-center">
                <label>Pseudo</label>
                <input type="text" class="form-control form-control-lg" v-model="login"/>
            </div>
            <div class="form-group text-center">
                <label>Mot de passe</label>
                <input type="password" class="form-control form-control-lg" v-model="password" />
            </div>
            <button type="submit" v-on:click="loginAccount()" :disabled="saveBtnDisabled" class="btn btn-dark btn-lg btn-block my-4">Valider</button>
            <div class="social-icons">
                <ul>
                    <li><a href="#"><i class="fa fa-google text-dark"></i></a></li>
                    <li><a href="#"><i class="fa fa-facebook text-dark"></i></a></li>
                    <li><a href="#"><i class="fa fa-twitter text-dark"></i></a></li>
                </ul>
            </div>
        </form>
    </div>
</template>

<script>
import HeaderUser from './HeaderUser';
import { LOCAL_STORAGE_USER } from '@/config/env';
export default {
    data() {
        return {
            login: '',
            password:'',
            saveBtnDisabled : false,                
        }
    },
    components: {
    'header-user': HeaderUser
    },
    methods: {
        loginAccount(){
            // Gestion de la désactivation du bouton au moment de la création du compte
            this.saveBtnDisabled = true;
            this.$clearStorage();
            // On crée un objet contenant l'ensemble des données de l'utlisateur au moment du login
            var user = {username: this.login, password: this.password};
            // On utilise la méthode prévu par le fichier index.js du dossier mixins où on passe en argument : la méthode, l'url et le nouvel utilisateur
            this.$ajax("post", "/user/login/", user)
                .then((response) => {
                    console.log(response);
                    //alert("Utilisateur connecté, session de 24h :)");
                    localStorage.setItem(LOCAL_STORAGE_USER, JSON.stringify(response.data))
                    this.saveBtnDisabled = false;
                    setTimeout(() => {  this.$router.push({ name: 'wall'}); }, 2500);
                    this.$swal({
                        icon: 'success',
                        title: 'Welcome ' + this.login + ' !',
                        showConfirmButton: false,
                        timer: 2500
                    });
                }).catch((error) => {
                    console.log("Utilisateur non connecté :(");
                    console.log(error.response.data.message);
                    this.saveBtnDisabled = false;
                    this.$swal({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'Utilisateur ou mot de passe incorrect :( !',
                    });
                });
        }
    }
}
</script>

<style scoped>
.inner-block {
    margin-top: 10%!important;
}

</style>
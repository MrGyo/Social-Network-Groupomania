<template>
    <div class="vue-template inner-block">
        <header-user></header-user>
        <form>
            <h3 class="mb-10" style="color:#48abe4;">Créer votre compte :)</h3>
            <div class="form-group text-center">
                <label>Pseudo</label>
                <input type="text" class="form-control form-control-lg" v-model="login"/>
            </div>
            <div class="form-group text-center">
                <label>Adresse Email</label>
                <input type="email" class="form-control form-control-lg" v-model="email"/>
            </div>
            <div class="form-group text-center">
                <label>Mot de passe</label>
                <input type="password" class="form-control form-control-lg" v-model="password" />
            </div>
            <button type="submit" v-on:click="createAccount()" :disabled="saveBtnDisabled" class="btn btn-dark btn-lg btn-block my-4">Valider</button>
            <p class="forgot-password text-center">
                Déjà enregistré ?
                <router-link :to="{name: 'login'}">Connexion</router-link>
            </p>
        </form>
    </div>
</template>

<script>
import HeaderUser from './HeaderUser';
export default {
    data() {
        return {
            login: '',
            email:'',
            password:'',
            saveBtnDisabled : false,
        }
    },
    components: {
    'header-user': HeaderUser
    },
    methods: {
        // Méthode appelée au moment de la création du compte utilisateur au moment du click sur le bouton
        createAccount(){
            // Gestion de la désactivation du bouton au moment de la création du compte
            this.saveBtnDisabled = true;
            this.$clearStorage();
            // On crée un objet contenant l'ensemble des données de l'utlisateur au moment de l'enregistrement
            var newUser = {username: this.login, email: this.email, password: this.password};
            // On utilise la méthode prévu par le fichier index.js du dossier mixins où on passe en argument : la méthode, l'url et le nouvel utilisateur
            this.$ajax("post", "/user/signup/", newUser)
                .then((response) => {
                    console.log(response);
                    //alert("Utilisateur créé !");
                    this.saveBtnDisabled = false;
                    // Si on a une réponse on appelle la méthode login prévue par le fichier index.js du dossier mixins pour une connexion automatique de l'utilisateur après la création de son compte
                    this.$login(newUser).then((response) => {
                        // Test pour vérifier la succession des méthodes "Signup" puis "login"
                        //alert("Utilisateur créé puis connecté !");
                        // Renvoi toujours undefined, pourquoi ?
                        console.log(response);
                    }); 
                });
            this.$swal({
                icon: 'success',
                title: 'Welcome ' + this.login + ' !',
                showConfirmButton: false,
                timer: 2500
                });
            setTimeout(() => {  this.$router.push({ name: 'wall'}); }, 2500);
        },
    }
}
</script>

<style scoped>
.inner-block {
    margin-top: 10%!important;
}
</style>
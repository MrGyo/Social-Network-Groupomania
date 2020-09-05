<template>
    <div class="vue-template inner-block">
        <header-user></header-user>
        <form>
            <h3 mb-3 style="color:#091f43;">Connexion</h3>
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
                    this.$initLogin(response);
                    this.saveBtnDisabled = false;
                    setTimeout(() => {  this.$router.push({ name: 'wall'}); }, 2500);
                    this.$welcomeMessage()
                }).catch((error) => {
                    console.log(error.response.data.message);
                    this.saveBtnDisabled = false;
                    this.$errorUser()
                });
        }
    }
}
</script>

<style scoped>
.inner-block {
    margin-top: 10%!important;
}
.btn {
  width: 100%!important;
  font-size: 1em!important;
}
@media (max-width: 991.98px) { 
    .inner-block {
        width: 80%;
        margin-top: 25%!important;
    }
}

</style>
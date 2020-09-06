<template>
    <div class="vue-template inner-block">
        <header-user></header-user>
        <form>
            <h3 class="mb-10">Créer votre compte :)</h3>
            <div class="form-group text-center">
                <label>Pseudo</label>
                <input v-on:click="unlockButton();" type="text" class="form-control form-control-lg" v-model="login"/>
            </div>
            <div class="form-group text-center">
                <label>Adresse email</label>
                <input v-on:click="unlockButton();" type="email" class="form-control form-control-lg" v-model="email"/>
            </div>
            <div class="form-group text-center">
                <label>Mot de passe</label>
                <input v-on:click="unlockButton();" type="password" class="form-control form-control-lg" v-model="password"/>
            </div>
            <button type="submit" v-on:click="createAccount();" :disabled="saveBtnDisabled" class="btn btn-validate btn-dark btn-lg btn-block my-4">Valider</button>
            <p class="forgot-password text-center">
                Déjà enregistré ?
                <router-link :to="{name: 'login'}"><span style="color:#d1515a;">Connectez-vous</span></router-link>
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
        unlockButton() {
            this.saveBtnDisabled = false;
        },
        // Méthode appelée au moment de la création du compte utilisateur au moment du click sur le bouton
        createAccount(){
            // Gestion de la désactivation du bouton au moment de la création du compte
            this.saveBtnDisabled = true;
            // On contrôle les données du formulaire
                if (!this.$checkFieldUsername(this.login) || !this.$checkFieldEmail(this.email) || !this.$checkFieldPassword(this.password)) {
                    //this.saveBtnDisabled = false;
                   return 
                }
            // On clear le storage pour l'enregistrement du nouvel utilsateur dans le local storage
            this.$clearStorage();
            // On crée un objet contenant l'ensemble des données de l'utlisateur au moment de l'enregistrement
            var newUser = {username: this.login, email: this.email, password: this.password};
            // On utilise la méthode prévu par le fichier index.js du dossier mixins où on passe en argument : la méthode, l'url et le nouvel utilisateur
            this.$ajax("post", "/user/signup/", newUser)
                .then((response) => {
                    console.log(response);
                    this.saveBtnDisabled = false;
                    // Si on a une réponse on appelle la méthode login prévue par le fichier index.js du dossier mixins pour une connexion automatique de l'utilisateur après la création de son compte
                    this.$login(newUser).then((response) => {
                        console.log(response);
                    }); 
                });
            this.$welcomeMessage();
            setTimeout(() => {  this.$router.push({ name: 'wall'}); }, 2500);
        },
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
/*.btn-validate {
  background-color: #091f44!important;
  border-color: #091f44!important;
  border-radius: 100px;
}
.btn-validate:hover {
  background-color: #051024!important;
  border-color: #051024!important;
  border-radius: 100px;
}
label {
    color: #091f44!important;
}
p {
    color: #091f44!important;
}*/
@media (max-width: 991.98px) { 
    .inner-block {
        width: 80%;
        margin-top: 25%!important;
    }
}
</style>

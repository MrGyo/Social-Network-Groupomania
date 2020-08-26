<template>
    <div class="vue-template">
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
            <button type="submit" v-on:click="createAccount()" :disabled="saveBtnDisabled" class="btn btn-dark btn-lg btn-block">Valider</button>
            <p class="forgot-password text-center">
                Déjà enregistré ?
                <router-link :to="{name: 'login'}">Connexion</router-link>
            </p>
        </form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            login: '',
            email:'',
            password:'',
            saveBtnDisabled : false,
        }
    },
    methods: {
        createAccount(){
            // Gestion de la désactivation du bouton au moment de la création du compte
            this.saveBtnDisabled = true;
            // On crée un objet contenant l'ensemble des données de l'utlisateur au moment de l'enregistrement
            var newUser = {username: this.login, email: this.email, password: this.password};
            // On utilise axios avec une méthode post pour l'envoi des données au backend, une fois la réponse obtenue on réactive le btn
            this.$ajax("post", "/user/signup/", newUser)
                .then((response) => {
                    console.log(response);
                    this.saveBtnDisabled = false;
                    this.$login(newUser).then((response) => {
                        alert("ON EST DANS LE THEN DU THEN");
                        console.log(response);
                    });
                });
        },
    }
}
</script>
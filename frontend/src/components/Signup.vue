<template>
    <div class="vue-template">
        <form>
            <h3 class="mb-10" style="color:#48abe4;">Créer votre compte :)</h3>
            <div class="form-group text-center">
                <label>Pseudo</label>
                <input type="text" class="form-control form-control-lg"/>
            </div>
            <div class="form-group text-center">
                <label>Adresse Email</label>
                <input type="email" class="form-control form-control-lg" />
            </div>
            <div class="form-group text-center">
                <label>Mot de passe</label>
                <input type="password" class="form-control form-control-lg" />
            </div>
            <button type="submit" class="btn btn-dark btn-lg btn-block">Valider</button>
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
            return {}
        }
    }
</script>
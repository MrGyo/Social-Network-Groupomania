<template>
    <div class="vue-template">
        <form>
            <h3>Créer votre compte</h3>
            <div class="form-group">
                <label>Identité</label>
                <input type="text" class="form-control form-control-lg"/>
            </div>
            <div class="form-group">
                <label>Adresse Email</label>
                <input type="email" class="form-control form-control-lg" />
            </div>
            <div class="form-group">
                <label>Mot de passe</label>
                <input type="password" class="form-control form-control-lg" />
            </div>
            <button type="submit" class="btn btn-dark btn-lg btn-block">Valider</button>
            <p class="forgot-password text-right">
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
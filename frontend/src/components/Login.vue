<template>
    <div class="vue-template">
        <form>
            <h3>Connexion</h3>
            <div class="form-group">
                <label>Adresse Email</label>
                <input type="email" class="form-control form-control-lg" />
            </div>
            <div class="form-group">
                <label>Mot de passe</label>
                <input type="password" class="form-control form-control-lg" />
            </div>
            <button type="submit" class="btn btn-dark btn-lg btn-block">Valider</button>
            <p class="forgot-password text-right mt-2 mb-4">
                <router-link to="/forgot-password">Mot de passe oublié ?</router-link>
            </p>
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
    export default {
        data() {
            return {}
        }
    }
</script>
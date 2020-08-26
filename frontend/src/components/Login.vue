<template>
    <div class="vue-template">
        <form>
            <h3 mb-3 style="color:#48abe4;">Connexion</h3>
            <div class="form-group text-center">
                <label>Adresse Email</label>
                <input type="email" class="form-control form-control-lg" />
            </div>
            <div class="form-group text-center">
                <label>Mot de passe</label>
                <input type="password" class="form-control form-control-lg" />
            </div>
            <button type="submit" class="btn btn-dark btn-lg btn-block">Valider</button>
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
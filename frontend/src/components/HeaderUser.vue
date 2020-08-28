<template>
    <div>
        <nav class="navbar bg-white justify-content-between flex-nowrap flex-row fixed-top">
            <div class="container my-2">
                <a class="navbar-brand float-left text-dark font-weight-bold">
                <router-link to="/"><img src="../assets/groupomania_4.png" alt="" class="groupomania"/></router-link>
                </a>
                <ul class="nav navbar-nav flex-row float-right">
                <li class="nav-item">
                    <router-link class="nav-link pr-3 text-dark font-weight-bold" to="/login">Connexion</router-link>
                </li>
                <li class="nav-item">
                    <router-link class="btn btn-outline-dark font-weight-bold" to="/signup">Créer votre compte</router-link>
                </li>
                </ul>
            </div>
        </nav>
    </div>
</template>

<script>
export default {
    name : 'HeaderUser',
}
</script>
<template>
    <div>
        <nav class="navbar bg-white justify-content-between flex-nowrap flex-row fixed-top">
            <div class="container my-2">
                <a class="navbar-brand float-left text-dark font-weight-bold">
                <router-link to="/"><img src="../assets/groupomania_4.png" alt="" class="groupomania mb-1"/></router-link>
                </a>
                <ul class="nav navbar-nav flex-row float-right">
                <li class="nav-item">
                    <router-link class="nav-link pr-3 text-dark font-weight-bold mb-1 connexion" to="/login">Sign in</router-link>
                </li>
                <li class="nav-item">
                    <router-link class="btn btn-outline-dark font-weight-bold mb-1" to="/signup">Sign up</router-link>
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

<style scoped>
.connexion {
    font-family: 'Montserrat', sans-serif;
}
</style>
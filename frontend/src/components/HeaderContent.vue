<template>
    <div>
        <nav class="navbar bg-white justify-content-between flex-nowrap flex-row fixed-top">
            <div class="container my-2">
                <a class="navbar-brand float-left text-dark font-weight-bold">
                <router-link to="/"><img src="../assets/groupomania_4.png" alt="" class="groupomania"/></router-link>
                </a>
                <div class="nav navbar-nav flex-row float-right">
                    <p class="text-dark font-weight-bold font-italic my-0">"Hi dear user !"</p>
                </div>
            </div>
        </nav>
    </div>
</template>

<script>
export default {
    name : 'HeaderContent',
}
</script>
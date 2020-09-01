<template>
    <div>
        <nav class="navbar bg-white justify-content-between flex-nowrap flex-row fixed-top">
            <div class="container my-2">
                <a class="navbar-brand float-left text-dark font-weight-bold">
                <router-link to="/"><img src="../assets/groupomania_4.png" alt="" class="groupomania mb-1"/></router-link>
                </a>
                <div class="nav navbar-nav flex-row float-right d-flex justif-content-end">
                    <div class="text-dark font-weight-bold font-italic mt-1 welcome-message">"Hi {{ getUsername() }} !"</div>
                    <router-link to="/useraccount"><i class="fa fa-user-circle fa-2x text-dark ml-2"></i></router-link>
                </div>
            </div>
        </nav>
    </div>
</template>

<script>
export default {
    name : 'HeaderContent',
    data() {
        return {
        }
    },
    methods: {
        getUsername() {
            let userInfo = JSON.parse(localStorage.getItem('user'));
            var user = userInfo.username;
            return user;
        }
    }
}
</script>

<style scoped>
.welcome-message {
    font-family: 'Montserrat', sans-serif;
}
</style>
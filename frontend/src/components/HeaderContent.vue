<template>
    <div>
        <nav class="navbar bg-white justify-content-between flex-nowrap flex-row fixed-top">
            <div class="container my-2">
                <a class="navbar-brand float-left text-dark font-weight-bold">
                <img src="../assets/groupomania_4.png" alt="" class="groupomania mb-1"/>
                </a>
                <div class="nav navbar-nav flex-row float-right d-flex justif-content-end">
                    <div class="d-flex">
                        <button class="btn btn btn-outline-dark font-weight-bold mr-2 logout" @click="logout()">Sign out</button>
                        <div class="text-dark font-weight-bold font-italic mt-1 welcome-message">"Hi {{ getUsername() }} !"</div>
                    </div>
                    <i v-b-modal.modalUserAccount class="fa fa-user-circle fa-2x text-dark ml-2"></i>
                </div>
            </div>
        </nav>
        <b-modal class="mr-5" ref="modalUserAccount" id="modalUserAccount" size="lg" hide-footer centered title="User Account">
            <user-account :userAccount="userAccount" />
        </b-modal>
    </div>
</template>

<script>
import UserAccount from './UserAccount';
export default {
    name : 'HeaderContent',
    data() {
        return {
            userAccount: '',
        }
    },
    components: {
    UserAccount,
    },
    methods: {
        getUsername() {
            console.log()
            return this.$store.getters.user.username;
        },
        logout() {
            this.$confirmLogout()
        }
    }
}
</script>

<style scoped>
.welcome-message {
    font-family: 'Montserrat', sans-serif;
}
.logout {
    font-size: 0.8em!important;
    width: 80px!important;
}
</style>
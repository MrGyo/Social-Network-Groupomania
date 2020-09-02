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
            console.log()
            return this.$store.getters.user.username;
        },
        logout() {
            const swalWithBootstrapButtons = this.$swal.mixin({
                customClass: {
                    confirmButton: 'btn btn-secondary btn-confirm-delog',
                    cancelButton: 'btn btn-primary btn-cancel-delog'
                },
                buttonsStyling: false
                })
            swalWithBootstrapButtons.fire({
                title: 'Do you want to sign out ?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: '<i class="far fa-frown mr-2""></i>Sign out',
                cancelButtonText: '<i class="far fa-smile-beam mr-2""></i>Cancel', 
                reverseButtons: false
                }).then((result) => {
                if (result.value) {
                    swalWithBootstrapButtons.fire({
                        title: 'Goodbye !',
                        text: 'Thank you for your visit :)',
                        icon: 'info',
                        timer: 2000,
                        showConfirmButton: false,
                    })
                    this.$clearStorage();
                    setTimeout(() => {  this.$router.push({ name: 'login'}); }, 2000);
                } else if (
                    result.dismiss === this.$swal.DismissReason
                ) {
                    return;
                }
            })
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
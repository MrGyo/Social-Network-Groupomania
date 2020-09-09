<template>
    <div>
        <ul>
            <li>Pseudo: <span class="font-weight-bold">{{ getUsername() }}</span></li>
            <li>Adresse email: <span class="font-weight-bold">{{ getEmail() }}</span></li>
        </ul>
        <div class="d-flex justify-content-end">
            <button class="btn btn-supr btn btn-secondary ml-2" @click="deleteAccount()"><i class="fa fa-times text-white mr-2"></i>Fermeture du compte</button>
        </div>
    </div>
</template>

<script>
export default {
    props: [ 'userAccount' ],
    methods: {
        getUsername() {
            return this.$store.getters.user.username;
        },
        getEmail() {
            return this.$store.getters.user.email;
        },
        /*deleteAccount() {
            this.$confirmDeleteAccount();
            this.$ajax("delete", "/user/" + this.$store.getters.user.userId)
                .then((response) => {
                    console.log(response);
                }).catch((error) => {
                    console.log(error);
                });
        },*/
        deleteAccount() {
            this.$ajax("delete", "/user/" + this.$store.getters.user.userId)
                .then((response) => {
                    console.log(response);
                    this.$root.$emit('bv::hide::modal', 'modalUserAccount');
                    this.$swal({
                        icon: 'success',
                        title: 'Votre compte est fermé',
                        text: 'Contactez votre administrateur pour une suppression définitive de votre compte, admin@groupomania.fr',
                        showConfirmButton: false,
                        timer: 5000
                        });
                        this.$clearStorage();
                        setTimeout(() => {  this.$router.push({ name: 'login'}); }, 5000);
                }).catch((error) => {
                    console.log(error);
                    this.$swal({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'Erreur :(',
                    });
                });
        }
    }
}
</script>

<style scoped>
.inner-block-wall {
    margin-top: 10%!important;
}

.btn {
  width: 220px!important;
  font-size: 0.9em!important;
}
</style>
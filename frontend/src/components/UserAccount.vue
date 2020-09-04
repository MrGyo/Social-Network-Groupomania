<template>
    <div>
        <ul>
            <li>Username: <span class="font-weight-bold">{{ getUsername() }}</span></li>
            <li>Email: <span class="font-weight-bold">{{ getEmail() }}</span></li>
        </ul>
        <div class="d-flex justify-content-end">
            <button class="btn btn-supr btn btn-danger ml-2" @click="deleteAccount()"><i class="fa fa-times text-white mr-2"></i>Close account</button>
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
        deleteAccount() {
            this.$ajax("delete", "/user/" + this.$store.getters.user.userId)
                .then((response) => {
                    console.log(response);
                    this.$confirmDeleteAccount();
                }).catch((error) => {
                    console.log(error);
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
  width: 160px!important;
  font-size: 0.9em!important;
}
</style>
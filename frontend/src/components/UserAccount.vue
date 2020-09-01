<template>
    <div class="vue-template inner-block-wall">
        <router-link :to="{name: 'wall'}"><i class="fa fa-arrow-circle-left fa-3x text-secondary mb-5"></i></router-link>
        <header-content></header-content>
        <h1 class="text-center text-dark mb-5">{{ txt }}</h1>
        <form>
            <div class="form-group">
                <label>Pseudo</label>
                <input type="text" class="form-control form-control-lg"/>
            </div>
            <div class="form-group">
                <label>Adresse Email</label>
                <input type="email" class="form-control form-control-lg"/>
            </div>
            <div class="form-group">
                <label>Mot de passe</label>
                <input type="password" class="form-control form-control-lg"/>
            </div>
        </form>
        <div class="d-flex justify-content-end flex-nowrap">
            <div class="btn btn btn-success mr-2"><i class="fa fa-edit text-white mr-2"></i>Update</div>
            <div class="btn btn-supr btn btn-danger ml-2"><i class="fa fa-trash text-white mr-2"></i>Delete</div>
        </div>
    </div>
</template>

<script>
import HeaderContent from './HeaderContent';
export default {
    data() {
        return {
            txt: 'User settings'
        }
    },
    components: {
    'header-content': HeaderContent
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
.btn {
    width : 110px!important;
}
.inner-block-wall {
    margin-top: 10%!important;
}
</style>
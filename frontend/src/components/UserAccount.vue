<template>
    <div>
        <form>
            <div class="form-group">
                <label>Username</label>
                <input type="text" class="form-control form-control-lg"/>
            </div>
            <div class="form-group">
                <label>Email</label>
                <input type="email" class="form-control form-control-lg"/>
            </div>
            <div class="form-group">
                <label>Password</label>
                <input type="password" class="form-control form-control-lg"/>
            </div>
        </form>
        <div class="d-flex justify-content-end flex-nowrap">
            <div class="btn btn-supr btn btn-danger ml-2"><i class="fa fa-trash text-white mr-2"></i>Delete</div>
        </div>
    </div>
</template>

<script>
export default {
    props: [],
    data() {
        return {
            txt: 'User settings'
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
.btn {
    width : 110px!important;
}
.inner-block-wall {
    margin-top: 10%!important;
}
</style>
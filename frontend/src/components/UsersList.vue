<template>
    <div>
        <ul>
            <!--<li v-bind:key="index" v-for="(user, index) in allUsers">
                <div class="card mb-1">
                    <div class="d-flex justify-content-between flex-nowrap">
                        <p v-bind:id="index" class="ml-2 mt-3"><span class="font-weight-bold">Username:</span> {{ user.username }}, <span class="font-weight-bold">Email:</span> {{ user.email }}</p>
                        <button v-show="checkUserRight(user)" v-on:click="deleteAccount()" class="btn btn-supr btn-danger"><i class="fa fa-trash text-white mr-2"></i>Delete</button>
                    </div>
                </div>
            </li>-->
            <li v-bind:key="index" v-for="(user, index) in allUsers">
                <div class="card mb-1">
                    <div class="d-flex justify-content-between flex-nowrap">
                        <p v-bind:id="index" class="ml-2 mt-3"><i class="fa fa-user-circle text-dark mr-2"></i><span class="font-weight-bold">Username:</span> {{ user.username }}, <span class="font-weight-bold">Email:</span> {{ user.email }}</p>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    props: ['usersList'],
    data() {
        return {
            allUsers: [],
            isAdmin: '',
        }
    },
    mounted(){
        axios
        .get('http://localhost:3000/user')
        .then(response => {
            console.log(response);
            for(let user of response.data.results){
                this.allUsers.push(user)
            }
        })
    },
    methods: {
        deleteAccount() {
            this.$ajax("delete", "/user/" + this.$store.getters.user.userId)
                .then((response) => {
                    console.log(response);
                    this.confirmDeleteAccountAdmin();
                }).catch((error) => {
                    console.log(error);
                });
        },
        /*checkUserRight(user_id){
            return (this.$store.getters.userIsAdmin || this.$store.getters.user.userId == user_id) ? true : false;
        },*/
    }
}
</script>

<style scoped>
ul {
    list-style-type: none;
    padding-inline-start: 0!important;
}
.inner-block-wall {
    margin-top: 10%!important;
}
.btn-supr {
    position: absolute;
    width: 100px!important;
    font-size: 0.9em!important;
    top:10px;
    right: 10px;
}
</style>
<template>
    <div class="vue-template inner-block-wall">
        <div>
             <router-link :to="{name: 'wall'}"><button type="submit" class="btn btn-secondary mb-4"><i class="fa fa-arrow-left text-white mr-2"></i>Back</button></router-link>
        </div>
        <header-content></header-content>
        <h1 class="text-center text-dark mb-5">{{ txt }}</h1>
        <ul>
            <li v-bind:key="index" v-for="(user, index) in allUsers">
                <div class="card mb-1">
                    <div class="d-flex justify-content-between flex-nowrap">
                        <p v-bind:id="index" class="ml-2 mt-3"><span class="font-weight-bold">Nom d'utilisateur:</span> {{ user.username }}, <span class="font-weight-bold">Adresse Email:</span> {{ user.email }}</p>
                        <div v-on:click="deleteUser()" class="btn btn-supr btn btn-danger"><i class="fa fa-trash text-white mr-2"></i>Delete</div>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
import HeaderContent from './HeaderContent';
import axios from 'axios'
export default {
    data() {
        return {
            txt: 'Users list',
            allUsers: []
        }
    },
    components: {
    'header-content': HeaderContent
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
        deleteUser() {

        }
    }
}
</script>

<style scoped>
ul {
    list-style-type: none;
    padding-inline-start: 0!important;
}
.btn {
    width : 100px!important;
}
.inner-block-wall {
    margin-top: 10%!important;
}

.btn-supr {
    width: 110px!important;
    position: absolute;
    top:10px;
    right: 10px;
}
</style>
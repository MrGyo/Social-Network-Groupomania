<template>
    <div>
        <ul>
            <li v-bind:key="index" v-for="(user, index) in allUsers">
                <p v-bind:id="index" class="ml-2 mt-3"><span class="font-weight-bold">Username:</span> {{ user.username }}, <span class="font-weight-bold">Email:</span> {{ user.email }}</p>
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
}
</script>

<style scoped>
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
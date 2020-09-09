<template>
    <div>
        <ul>
            <li v-bind:key="index" v-for="(user, index) in allUsers">
                <div class="card mb-1">
                    <div class="d-flex flex-column">
                        <p v-bind:id="index" class="ml-2 mt-3"><i class="fa fa-user-circle text-dark mr-2"></i><span class="font-weight-bold">Pseudo:</span> {{ user.username }}</p>
                        <p class="contact"><span class="font-weight-bold">Adresse email:</span> <a :href="'mailto: ' + user.email">{{ user.email }}</a></p>
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

.card {
    border: none!important;
}

.contact {
    padding-left: 4%;
}
</style>
<template>
    <div class="vue-template inner-block-wall">
        <header-content></header-content>
        <h1 class="text-center text-dark mb-5">{{ txt }}</h1>
        <div class="d-flex justify-content-start mb-3">
            <router-link :to="{name: 'newtopic'}"><button class="btn btn-success">New Topic</button></router-link>
        </div>
        <ul>
            <li v-bind:key="index" v-for="(message, index) in allMessages">
                <div class="card mb-1">
                    <div class="d-flex justify-content-between flex-nowrap">
                        <p class="ml-2 mt-3 font-weight-bold">{{ message.title }}</p>
                        <p class="mr-2 mt-3 font-italic"><u>Author : {{ message.username }}</u></p>
                    </div>
                    <p class="ml-2">{{ message.message }}</p>
                </div>
                <div class="d-flex justify-content-end mb-3">
                    <button class="btn btn-primary mr-2 mt-2">Reply</button>
                    <button class="btn btn-dark ml-2 mt-2">Modify</button>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
import HeaderContent from './HeaderContent';
//import axios from 'axios'
export default {
    data() {
        return {
            txt: 'Another brick in the wall ?',
            saveBtnDisabled : false,
            allMessages: []
        }
    },
    components: {
    'header-content': HeaderContent
    },
    /*created(){
        axios
        .get('http://localhost:3000/message')
        .then(response => {
            console.log(response);
            for(const topic of response.data.results){
                this.allMessages.push(topic)
            }
        })
    },*/
    created(){
        let userInfo = JSON.parse(localStorage.getItem('user'));
        var user = userInfo.userId;
        this.$ajax("get", "/message", user)
            .then((reponse) => {
                console.log(reponse);
                for(const topic of reponse.data.results){
                this.allMessages.push(topic)
                }
            }
        )
    },
    methods: {
        modifyTopic() {
            
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
</style>
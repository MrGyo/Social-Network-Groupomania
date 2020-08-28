<template>
    <div class="vue-template inner-block-wall">
        <header-content></header-content>
        <h1 class="text-center text-dark mb-5">{{ txt }}</h1>
        <ul>
            <li v-bind:key="index" v-for="(message, index) in allMessages">
                <router-link v-bind:to="`/message/${index + 1}`">
                    <div>
                        <p>{{ message.title }}</p>
                    </div>
                </router-link>
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
            txt: 'Welcome to the wall :)',
            allMessages: []
        }
    },
    components: {
    'header-content': HeaderContent
    },
    created(){
        axios
        .get('http://localhost:3000/message')
        .then(reponse => {
            console.log(reponse);
            for(const topic of reponse.data.results){
                this.allMessages.push(topic)
            }
        })
    }
}
</script>

<style scoped>

</style>
<template>
    <div class="vue-template inner-block-wall">
        <header-content></header-content>
        <h1 class="text-center text-dark mb-5">{{ txt }}</h1>
        <div class="d-flex justify-content-between mb-4">
            <button class="btn btn-success" v-b-modal.modalTopic @click="selectParent(null)"><i class="fa fa-plus text-white mr-2"></i>Topic</button>
            <button class="btn btn-dark" v-b-modal.modalUsersList><i class="fa fa-list-ul text-white mr-2"></i>Users</button>
        </div>
        <hr>
        <ul>
            <li class="mb-4 mt-4" v-bind:key="index" v-for="(message, index) in allMessages">
                <div class="card mb-1 topic-card">
                    <div class="d-flex justify-content-between flex-nowrap">
                        <p class="ml-2 mt-3 font-weight-bold" v-html="message.title"/>
                        <p class="mr-2 mt-3 font-italic"><u>Author : {{ message.username }}</u></p>
                    </div>
                    <p class="ml-2" v-html="message.message"/>
                </div>
                <div class="d-flex justify-content-end mb-3">
                    <button v-b-modal.modalTopic class="btn btn-primary mt-2" @click="selectParent(message)"><i class="fa fa-reply text-white mr-2"></i>Reply</button>
                    <button v-b-modal.modalUpdateTopic v-show="checkUserRight(message)" @click="currentMessage = message" class="btn btn-secondary ml-3 mt-2"><i class="fa fa-edit text-white mr-2"></i>Modify</button>
                </div>
                <div v-bind:key="index" v-for="(childMessage, index) in message.children">
                    <div class="card ml-5 reply-card">
                        <div class="d-flex justify-content-between flex-nowrap">
                            <p class="ml-2 mt-3 font-weight-bold reply-content" v-html="'Re: ' + message.title"/>
                            <p class="mr-2 mt-3 font-italic reply-content"><u>Author : {{ childMessage.username }}</u></p>
                        </div>
                        <p class="ml-2 reply-content" v-html="childMessage.message"/>
                    </div>
                    <div class="d-flex justify-content-end mb-3">
                        <button v-b-modal.modalUpdateTopic v-show="checkUserRight(childMessage)"  @click="currentMessage = childMessage" class="btn btn-secondary ml-2 my-3"><i class="fa fa-edit text-white mr-2"></i>Modify</button>
                    </div>
                </div>
                <hr>
            </li>
        </ul>
        <b-modal class="mr-5" ref="modalTopic" id="modalTopic"  @hide="getTopics()" size="lg" hide-footer centered title="Express yourself !">
            <new-topic :parentId="currentParentId" :parentTitle="currentParentTitle"  />
        </b-modal>
        <b-modal class="mr-5" ref="modalUpdateTopic" id="modalUpdateTopic"  @hide="getTopics()" size="lg" hide-footer centered title="Express yourself !">
            <update-topic :currentMessage="currentMessage"  />
        </b-modal>
        <b-modal class="mr-5" ref="modalUsersList" id="modalUsersList" size="lg" hide-footer centered title="Users List">
            <users-list :usersList="usersList"/>
        </b-modal>         
    </div>
</template>

<script>
import HeaderContent from './HeaderContent';
import NewTopic from './NewTopic';
import UpdateTopic from './UpdateTopic';
import UsersList from './UsersList';

export default {
    data() {
        return {
            txt: 'Another brick in the wall ?',
            currentParentId: '',
            currentParentTitle: '',
            currentMessage : [],
            saveBtnDisabled : false,
            allMessages: [],
            usersList: [],
        }
    },
    components: {
    HeaderContent,
    NewTopic,
    UpdateTopic,
    UsersList,
    },
    mounted(){
        this.$checkLogin();
        this.getTopics();
        //setInterval(this.getTopics, 60000);
    },
    methods: {
        checkUserRight(message){
            return (this.$store.getters.userIsAdmin || this.$store.getters.user.userId == message.user_id) ? true : false;
        },
        selectParent(msg){
            this.currentParentId = (msg) ? msg.id : null;
            this.currentParentTitle = (msg) ? msg.title : null;
        },
        getTopics(){
            let userInfo = JSON.parse(localStorage.getItem('user'));
            var user = userInfo.userId;
            this.allMessages = [];
            this.$ajax("get", "/message", user)
                .then((reponse) => {
                    //-- JR select des parents seulement
                    let parents = reponse.data.results.filter( item => item.id_parent == null);
                    parents.forEach(parent => {
                        //-- Creation d'un tableau pour les enfants (reverse => ordre decroissant date)
                        parent.children = reponse.data.results.filter( item => item.id_parent == parent.id).reverse();
                    });
                    this.allMessages = parents;
                }
            )
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
    width : 110px!important;
}

.inner-block-wall {
    margin-top: 10%!important;
}

.reply-content {
    font-size: 0.9em;
}

.topic-card {
    border-left-color: #48abe4!important;
    border-right-color: #48abe4!important;
    border-top-color: #48abe4!important;
    border-bottom-color: #48abe4!important;
}

hr {
    height: 8px;
    border: 0;
    box-shadow: inset 0 12px 12px -12px rgba(0, 0, 0, 0.5);
}
</style>
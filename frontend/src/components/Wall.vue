<template>
    <div class="vue-template inner-block-wall">
        <header-content></header-content>
        <h1 class="text-center text-dark mb-5">{{ txt }}</h1>
        <div class="d-flex justify-content-between mb-4">
            <button v-b-modal.modalTopic @click="selectParent(null)" class="btn btn-success" ><i class="fa fa-plus text-white mr-2"></i>Topic</button>
            <button v-b-modal.modalUsersList class="btn btn-dark" ><i class="fa fa-list-ul text-white mr-2"></i>Users</button>
        </div>
        <hr>
        <ul>
            <li class="mb-4 mt-4" v-bind:key="index" v-for="(message, index) in allMessages">
                <div class="date_message-parent">{{ moment(message.creation_date).fromNow() }}</div>
                <div class="card mb-1 topic-card">
                    <div class="d-flex justify-content-between flex-nowrap">
                        <p class="ml-2 mt-3 font-weight-bold title" v-html="message.title"/>
                        <p class="mr-2 mt-3 font-italic">By {{ message.username }}<i class="fa fa-user-circle text-dark ml-2"></i></p>
                    </div>
                    <p class="ml-2" v-html="$linkify(message.message)"/>
                </div>
                <div class="d-flex justify-content-end mb-3">
                    <button v-b-modal.modalTopic @click="selectParent(message)" class="btn btn-minimal btn-primary mt-2" title="Reply"><i class="fa fa-reply text-white"></i></button>
                    <button v-b-modal.modalUpdateTopic v-show="checkUserRight(message.user_id)" @click="currentMessage = message" class="btn btn-minimal btn-secondary ml-2 mt-2" title="Modify"><i class="fa fa-edit text-white"></i></button>
                    <button v-show="checkUserRight(message.user_id)" class="btn btn-minimal btn-danger ml-2 mt-2" title="Delete" @click="deleteMessage(message.id)"><i class="fa fa-trash text-white"></i></button>
                </div>
                <div v-bind:key="index" v-for="(childMessage, index) in message.children">
                    <div class="date_message-child">{{ moment(childMessage.creation_date).fromNow() }}</div>
                    <div class="card ml-5 reply-card">
                        <div class="d-flex justify-content-between flex-nowrap">
                            <p class="ml-2 mt-3 font-weight-bold reply-content title" v-html="'Re: ' + message.title"/>
                            <p class="mr-2 mt-3 font-italic reply-content">By {{ childMessage.username }}<i class="fa fa-user-circle text-dark ml-2"></i></p>
                        </div>
                        <p class="ml-2 reply-content" v-html="$linkify(childMessage.message)"/>
                    </div>
                    <div class="d-flex justify-content-end mb-3">
                        <button v-b-modal.modalUpdateTopic v-show="checkUserRight(childMessage.user_id)"  @click="currentMessage = childMessage" class="btn btn-minimal btn-secondary ml-2 my-3" title="Modify"><i class="fa fa-edit text-white"></i></button>
                        <button v-show="checkUserRight(childMessage.user_id)" class="btn btn-minimal btn-danger ml-2 my-3" title="Delete" @click="deleteMessage(childMessage.id)"><i class="fa fa-trash text-white"></i></button>
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
        <b-modal class="mr-5" ref="modalUsersList" id="modalUsersList" size="lg" hide-footer centered title="Groupomania users list :">
            <users-list :usersList="usersList"/>
        </b-modal>         
    </div>
</template>

<script>
import HeaderContent from './HeaderContent';
import NewTopic from './NewTopic';
import UpdateTopic from './UpdateTopic';
import UsersList from './UsersList';
var moment = require('moment');

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
            moment: moment,
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
        //setInterval(this.getTopics, 10000);
    },
    methods: {
        checkUserRight(msgUserId){
            return (this.$store.getters.userIsAdmin || this.$store.getters.user.userId == msgUserId) ? true : false;
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
        },
        deleteMessage(id){
            this.$ajax("delete", "/message/" + id)
                .then((response) => {
                    console.log(response);
                    this.getTopics();
                    this.$swal({
                        icon: 'success',
                        title: 'Message deleted !',
                        showConfirmButton: false,
                        timer: 1500
                        });
                }).catch((error) => {
                    console.log(error);
                    this.$swal({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'Error :(',
                    });
                });
        },
        createTopic(){
            let user = JSON.parse(localStorage.getItem('user'))
            this.saveBtnDisabled = true;
            var newTopic = {title: this.title, message: this.message, user_id: user.userId, id_parent: (this.parentId == null) ? "" : this.parentId};
            this.$ajax("post", "/message", newTopic)
                .then((response) => {
                    console.log(response);
                    this.saveBtnDisabled = false;
                    this.$root.$emit('bv::hide::modal', 'modalTopic');
                    this.$swal({
                        icon: 'success',
                        title: 'Message sent !',
                        showConfirmButton: false,
                        timer: 1500
                        });
                }).catch((error) => {
                    console.log(error);
                    this.$swal({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'Error :(',
                    });
                });
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
  width: 100px!important;
  font-size: 0.9em!important;
}
.btn-minimal {
    width: 40px!important;
    font-size: 1em!important;
}
.inner-block-wall {
    margin-top: 10%!important;
}
.reply-content {
    font-size: 0.9em;
}
.title {
    color: #1a5d85!important;
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
.date_message-parent {
    font-size: 0.8em;
    margin-left: 1.5%;
    margin-bottom: 0.5%;
}
.date_message-child {
    font-size: 0.8em;
    margin-left: 8.5%;
    margin-bottom: 0.5%;
}
</style>
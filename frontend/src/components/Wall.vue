<template>
    <div class="vue-template inner-block-wall">
        <header-content></header-content>
        <!--<h1 class="text-center text-dark font-weight-bold mb-5">{{ txt }}</h1>-->
        <div class="d-flex justify-content-between mb-4">
            <button v-b-modal.modalTopic @click="selectParent(null)" class="btn btn-primary btn-new-topic"><i class="fa fa-plus text-white mr-2"></i>Message</button>
            <button v-b-modal.modalUsersList class="btn btn-users-list btn-dark" ><i class="fa fa-list-ul text-white mr-2"></i>Membres</button>
        </div>
        <hr>
        <ul>
            <li class="mb-4 mt-4" v-bind:key="index" v-for="(message, index) in allMessages">
                <div class="date_message-parent"><i class="fa fa-clock text-dark"></i>{{ moment(message.creation_date).fromNow() }}</div> 
                <div class="card mb-1 topic-card">
                    <div class="d-flex justify-content-between flex-nowrap">
                        <p class="ml-2 mt-3 font-weight-bold title-parent" v-html="message.title"/>
                        <p class="mr-2 mt-3 font-italic author-message">Par {{ message.username }}<i class="fa fa-user-circle text-dark ml-2"></i></p>
                    </div>
                    <p class="ml-2 mr-2 text-justify" v-html="$linkify(message.message)"/>
                </div>
                <div class="d-flex justify-content-end mb-3 btn-list">
                    <button v-b-modal.modalTopic @click="selectParent(message)" class="btn btn-success btn-minimal btn-reply btn-primary mt-2" title="Répondre"><i class="fa fa-reply text-white"></i></button>
                    <button v-b-modal.modalUpdateTopic v-show="checkUserRight(message.user_id)" @click="currentMessage = message" class="btn btn-minimal btn-modify btn-secondary ml-2 mt-2" title="Modifier"><i class="fa fa-edit text-white"></i></button>
                    <button v-show="checkUserRight(message.user_id)" class="btn btn-minimal btn-trash btn-secondary ml-2 mt-2" title="Supprimer" @click="deleteMessage(message.id)"><i class="fa fa-trash text-white"></i></button>
                </div>
                <div v-bind:key="index" v-for="(childMessage, index) in message.children">
                    <div class="date_message-child">{{ moment(childMessage.creation_date).fromNow() }}</div>
                    <div class="card ml-5 reply-card">
                        <div class="d-flex justify-content-between flex-nowrap">
                            <p class="ml-2 mt-3 font-weight-bold reply-content title-child" v-html="'Re: ' + message.title"/>
                            <p class="mr-2 mt-3 font-italic reply-content author-message">Par {{ childMessage.username }}<i class="fa fa-user-circle text-dark ml-2"></i></p>
                        </div>
                        <p class="ml-2 mr-2 text-justify reply-content" v-html="$linkify(childMessage.message)"/>
                    </div>
                    <div class="d-flex justify-content-end mb-1 btn-list">
                        <button class="btn btn-minimal btn-helper ml-2 my-3"><i class="fa fa-circle text-white icon-helper"></i></button>
                        <button v-b-modal.modalUpdateTopic v-show="checkUserRight(childMessage.user_id)"  @click="currentMessage = childMessage" class="btn btn-minimal btn-modify btn-secondary ml-2 my-3" title="Modifier"><i class="fa fa-edit text-white"></i></button>
                        <button v-show="checkUserRight(childMessage.user_id)" class="btn btn-minimal btn-trash btn-secondary ml-2 my-3" title="Supprimer" @click="deleteMessage(childMessage.id)"><i class="fa fa-trash text-white"></i></button>
                    </div>
                </div>
            </li>
            <hr>
            <div class="d-flex justify-content-center top-wall" @click="scrollToTop()">
                <i class="fa fa-caret-up fa-3x text-dark top-wall-btn"></i>
            </div>
        </ul>
        
        <b-modal class="mr-5" ref="modalTopic" id="modalTopic"  @hide="getTopics()" size="lg" hide-footer centered title="Exprimez-vous !">
            <new-topic :parentId="currentParentId" :parentTitle="currentParentTitle"  />
        </b-modal>
        <b-modal class="mr-5" ref="modalUpdateTopic" id="modalUpdateTopic"  @hide="getTopics()" size="lg" hide-footer centered title="Exprimez-vous !">
            <update-topic :currentMessage="currentMessage"  />
        </b-modal>
        <b-modal class="mr-5" ref="modalUsersList" id="modalUsersList" size="lg" hide-footer centered title="Liste des membres Groupomania :">
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
            txt: 'Groupomania Network',
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
        scrollToTop() {
                window.scrollTo(0,0);
        },
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
                        //-- Creation d'un tableau pour les enfants
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
                        title: 'Message supprimé !',
                        showConfirmButton: false,
                        timer: 1500
                        });
                }).catch((error) => {
                    console.log(error);
                    this.$swal({
                            icon: 'erreur',
                            title: 'Oops...',
                            text: 'Erreur :(',
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
                        title: 'Message envoyé !',
                        showConfirmButton: false,
                        timer: 1500
                        });
                }).catch((error) => {
                    console.log(error);
                    this.$swal({
                            icon: 'erreur',
                            title: 'Oops...',
                            text: 'Error :(',
                    });
                });
        }        
    }
}
</script>

<style scoped>
.topic-card {
    border-radius: 10px!important;
    background-color:#f3f3f3!important;
    z-index: 1!important;
}
.reply-card {
    border-radius: 10px!important;
    z-index: 1!important;
}
.author-message {
    color: #d14750!important;
}
ul {
    list-style-type: none;
    padding-inline-start: 0!important;
}
.btn-list {
    margin-right: 1%;
    margin-top: -4.5%;
    position: relative;
    z-index: 2!important;
}
.btn {
    width: 120px!important;
    font-size: 0.9em!important;
}
.btn-new-topic {
    background-color: #283855!important;
    border-color:  #283855!important;
    border-radius: 100px;
}
.btn-new-topic:hover {
    background-color: #1e2a3f!important;
    background-color: #1e2a3f!important;
    border-radius: 100px;
}
.btn-reply {
    background-color: #283855!important;
    border-color: #283855!important;
    border-radius: 100px;
}
.btn-reply:hover {
    background-color: #1e2a3f!important;
    background-color: #1e2a3f!important;
    border-radius: 100px;
}
.btn-modify {
    background-color: #327da8!important;
    border-color: #327da8!important;
    border-radius: 100px;
}
.btn-modify:hover {
    background-color: #296181!important;
    border-color: #296181!important;
    border-radius: 100px;
}
.btn-users-list {
    background-color: #d14750!important;
    border-color: #d14750!important;
    border-radius: 100px;
}
.btn-users-list:hover {
    background-color: #b13c44!important;
    border-color: #b13c44!important;
    border-radius: 100px;
}
.btn-minimal {
    width: 40px!important;
    font-size: 1em!important;
    border-radius: 100%;
}
.btn-helper {
    z-index: 0!important;
    cursor: default!important;
}
.icon-helper {
    color: transparent!important;
}
.inner-block-wall {
    margin-top: 10%!important;
    margin-bottom: 5%!important;
}
.reply-content {
    font-size: 0.9em;
}
.title-parent {
    color: #091f44!important;
}
hr {
    border-top: 3px double #8b8b8c;
    opacity: 0.3;
}
.date_message-parent {
    font-size: 0.8em;
    margin-left: 1.5%;
    margin-bottom: 0.5%;
    font-weight: bold;
}
.date_message-child {
    font-size: 0.8em;
    margin-left: 8.5%;
    margin-bottom: 0.5%;
    font-weight: bold;
}
.top-wall {
    width: 100%;
}
.top-wall-btn {
    cursor: pointer;
    color: #283855!important;
}
.bottom-wall {
    margin-top: 10%;
}
@media (max-width: 991.98px) { 

    .inner-block-wall {
    margin-top: 20%!important;
    }   
}

</style>
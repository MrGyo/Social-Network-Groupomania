import Vue from 'vue';
import Vuex from 'vuex';

//import modules from './modules';
Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        //-- Tableau contenant le user actuel
        user: [],
    },
    //-- Permet de créer des methodes lié au variable du store cf : user
    getters: {
        user(state) {
            return state.user;
        },
        userIsAdmin(state){
            return (state.user.userRight == 'admin') ? true : false; 
        }
    },
    mutations: {
    },
    actions: {
    },
});

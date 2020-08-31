<template>
    <div class="vue-template inner-block-wall">
        <header-content></header-content>
        <form>
            <div class="form-group">
                <label>Title</label>
                <input type="text" class="form-control form-control-lg" v-model="title"/>
            </div>
            <div class="form-group">
                <label>Message</label>
                <input type="text" class="form-control form-control-lg" v-model="message"/>
            </div>
            <button type="submit" class="btn btn-primary" v-on:click="createTopic()" :disabled="saveBtnDisabled">Send</button>
        </form>
    </div>
</template>

<script>
import HeaderContent from './HeaderContent';
export default {
    data() {
        return {
            saveBtnDisabled : false,
            title: '',
            message: ''
        }
    },
    components: {
    'header-content': HeaderContent
    },
    methods: {
        createTopic(){
            let user = JSON.parse(localStorage.getItem('user'))
            this.saveBtnDisabled = true;
            var newTopic = {title: this.title, message: this.message, user_id: user.userId};
            console.log(newTopic);
            this.$ajax("post", "/message", newTopic)
                .then((response) => {
                    console.log(response);
                    this.saveBtnDisabled = false;
                });
            this.$swal({
                icon: 'success',
                title: 'Topic Created',
                showConfirmButton: false,
                timer: 1500
                });
            setTimeout(function(){ window.location.href = '/wall'; }, 1500);
        }
    }
}
</script>

<style scoped>
.btn {
    width : 100px!important;
}
.inner-block-wall {
    margin-top: 10%!important;
}
</style>
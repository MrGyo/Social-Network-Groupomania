<template>
    <div>
        <form>
            <div v-show="!currentMessage.id_parent" class="form-group">
                <label>Titre</label>
                <input type="text" class="form-control form-control-lg" v-model="title"/>
            </div>
            <div class="form-group">
                <label>Message</label>
                <textarea type="text" style="height: 200px;" class="form-control form-control-lg" v-model="message"></textarea>
            </div>
            <div div class="d-flex justify-content-end"> 
                <button type="submit" class="btn btn-primary" v-on:click="updateTopic()" :disabled="saveBtnDisabled">Envoyer</button>
            </div>
        </form>
    </div>
</template>

<script>
export default {
    props: ['currentMessage'],
    data() {
        return {
            saveBtnDisabled : false,
            title: '',
            message: '',
            messageId: '',
        }
    },
    components: {
    },
    mounted() {
        this.title = this.currentMessage.title;
        this.message = this.currentMessage.message;
        this.messageId = this.currentMessage.id;
    },
    methods: {
        updateTopic(){
            //let user = JSON.parse(localStorage.getItem('user'))
            this.saveBtnDisabled = true;
            var updateTopic = (!this.currentMessage.id_parent) ? {title: this.title, message: this.message} : { message: this.message};
            console.log(this.messageId);

            this.$ajax("post", "/message/" + this.messageId, updateTopic)
                .then((response) => {
                    console.log(response);
                    this.saveBtnDisabled = false;
                    this.$root.$emit('bv::hide::modal', 'modalUpdateTopic');
                    this.$swal({
                        icon: 'success',
                        title: 'Message envoyé !',
                        showConfirmButton: false,
                        timer: 1500
                        });
                }).catch((error) => {
                    console.log(error);
                    this.$swal({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'Erreur',
                    });
                });
        }
    },
    watch: {
      
    }

}
</script>

<style scoped>
.btn {
    width : 110px!important;
}
.inner-block-wall {
    margin-top: 10%!important;
}
</style>
<template>
    <div>
        <form>
            <div class="form-group">
                <label>Titre</label>
                <input v-if="parentId == null" type="text" class="form-control form-control-lg" v-model="title"/>
                <input v-else type="text" class="form-control form-control-lg" v-model="parentTitle" disabled/>
            </div>
            <div class="form-group">
                <label>Message</label>
                <textarea type="text" style="height: 200px;" class="form-control form-control-lg" v-model="message"></textarea>
            </div>
            <div div class="d-flex justify-content-end"> 
                <button type="submit" class="btn btn-primary" v-on:click="createTopic()" :disabled="saveBtnDisabled">Envoyer</button>
            </div>
        </form>
    </div>
</template>

<script>
export default {
    props: ['parentId', 'parentTitle'],
    data() {
        return {
            saveBtnDisabled : false,
            title: '',
            message: ''
        }
    },
    components: {
    },
    methods: {
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
.btn {
  width: 100px!important;
  font-size: 0.9em!important;
}
.inner-block-wall {
    margin-top: 10%!important;
}
</style>
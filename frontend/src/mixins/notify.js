export default {
    methods: {

        //-- Méthodes dédiées aux messages d'erreur Swal --//

        $welcomeMessage() {
            this.$swal({
                icon: 'success',
                title: 'Bonjour ' + this.login + ' !',
                showConfirmButton: false,
                timer: 2500
            });
        },

        $errorUser() {
            this.$swal({
                icon: 'error',
                title: 'Oops...',
                text: 'Pseudo ou mot de passe incorrect !',
            });
        },

        $errorAccess() {
            this.$swal({
                icon: 'error',
                title: 'Oops...',
                text: 'Accès refusé !',
            });
        },

        $confirmLogout() {
            const swalWithBootstrapButtons = this.$swal.mixin({
                customClass: {
                    confirmButton: 'btn btn-secondary btn-confirm-delog',
                    cancelButton: 'btn btn-primary btn-cancel-delog'
                },
                buttonsStyling: false
                })
            swalWithBootstrapButtons.fire({
                title: 'Souhaitez-vous vous déconnecter ?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: '<i class="far fa-frown mr-2""></i>Déconnexion',
                cancelButtonText: '<i class="far fa-smile-beam mr-2""></i>Annuler', 
                reverseButtons: false
                }).then((result) => {
                if (result.value) {
                    swalWithBootstrapButtons.fire({
                        title: 'A bientôt !',
                        text: 'Merci pour votre visite',
                        icon: 'success',
                        timer: 2000,
                        showConfirmButton: false,
                    })
                    this.$clearStorage();
                    setTimeout(() => {  this.$router.push({ name: 'login'}); }, 2000);
                } else if (
                    result.dismiss === this.$swal.DismissReason
                ) {
                    return;
                }
            })
        },
    }
}
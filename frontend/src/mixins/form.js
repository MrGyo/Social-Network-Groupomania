export default {
    methods: {

        //-- Méthodes dédiées au contrôle du formulaire --//

        $checkFieldUsername(username){
            let usernameToControl = username;
            let regexUsernameToControl =  /^[A-Za-zéèàêë-]+$/;
            if (!regexUsernameToControl .test(usernameToControl) || usernameToControl.length <= 1) {
                const swalWithBootstrapButtons = this.$swal.mixin({
                    customClass: {
                      confirmButton: 'btn btn-secondary',
                    },
                    buttonsStyling: false
                  })
                  swalWithBootstrapButtons.fire({
                    title: 'Oops!',
                    text: 'Votre pseudo doit comporter plus d\'une lettre',
                    icon: 'error',
                    confirmButtonText: 'OK',
                  }).then((result) => {
                    if (result.value) {
                        return;
                    }
                  })
                return false;
            }
            return true;
        },

        $checkFieldEmail(email){
            let emailToControl = email;
            let regexEmailToControl = /.+@.+\..+/;
            if (!regexEmailToControl.test(emailToControl)) {
                const swalWithBootstrapButtons = this.$swal.mixin({
                    customClass: {
                      confirmButton: 'btn btn-secondary btn-ok',
                    },
                    buttonsStyling: false
                  })
                  swalWithBootstrapButtons.fire({
                    title: 'Oops!',
                    text: 'Entrez un format d\'email valide : johnDoe@gmail.com',
                    icon: 'error',
                    confirmButtonText: 'OK',
                  }).then((result) => {
                    if (result.value) {
                      return;
                    }
                  })
                return false;
            }
            return true;
        },

        $checkFieldPassword(password){
            let passwordToControl = password;
            if (passwordToControl.length <= 5) {
                const swalWithBootstrapButtons = this.$swal.mixin({
                    customClass: {
                      confirmButton: 'btn btn-secondary btn-ok',
                    },
                    buttonsStyling: false
                  })
                  swalWithBootstrapButtons.fire({
                    title: 'Oops!',
                    text: 'Entrez un mot de passe d\'au moins 5 caractères',
                    icon: 'error',
                    confirmButtonText: 'OK',
                  }).then((result) => {
                    if (result.value) {
                      return;
                    }
                  })
                return false;
            }
            return true;
        },
    }
}
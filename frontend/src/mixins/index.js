import {DOMAIN, LOCAL_STORAGE_USER } from '@/config/env';

export default {
    methods: {
        $ajax(method, url, data) {

            //-- AUTH
            let user = JSON.parse(localStorage.getItem('user'))
            //console.log(user)
            let auth =  (user && user.token) ? {'Content-Type': 'application/json', 'Authorization': 'Bearer' +' '+ user.token }  : {'Content-Type': 'application/json'};
            //console.log(auth);
            url = DOMAIN + url;
            return  this.$AJAX({
                method: method,
                url: url,
                data: (data) ? JSON.stringify(data) : '',
                headers: auth
                 
            })
        },
        $login(user) {
           return this.$ajax("post", "/user/login/", user)
                .then((response) => {
                    console.log(response);
                    alert("COOL!");
                    localStorage.setItem(LOCAL_STORAGE_USER, JSON.stringify(response.data))

                }).catch((error) => {
                    console.log("ERREUR: OH YEAH!");
                    console.log(error.response.data.message);

                });
        }
    }
}
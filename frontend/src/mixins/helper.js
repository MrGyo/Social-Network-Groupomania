// On importe les constantes du fichier env.js du dossier config afin de les utiliser dans les méthodes ci-dessous
import {LOCAL_STORAGE_USER } from '@/config/env';

export default {
    methods: {

        //-- Méthodes dédiées au login et signup --//

        // On crée une méthode pour vider le local storage
        $clearStorage(){
            let storageToClear = localStorage.getItem(LOCAL_STORAGE_USER);
            if (storageToClear != null) {
                localStorage.clear(LOCAL_STORAGE_USER);
            } 
        },

        //-- Méthodes dédiées à la gestion des urls dans les messages postés --//
        
        $linkify(inputText) {
            var replacedText, replacePattern1, replacePattern2, replacePattern3;
        
            //URLs avec http://, https://, ou ftp://
            replacePattern1 = /(\b(https?|ftp):\/\/[-A-Z0-9+&@#/%?=~_|!:,.;]*[-A-Z0-9+&@#/%=~_|])/gim;
            replacedText = inputText.replace(replacePattern1, '<a href="$1" target="_blank">$1</a>');
        
            //URLs avec "www." (sans // avant ça, ou redirige vers ceux du dessus
            replacePattern2 = /(^|[^/])(www\.[\S]+(\b|$))/gim;
            replacedText = replacedText.replace(replacePattern2, '$1<a href="http://$2" target="_blank">$2</a>');
        
            //Chagne l'email mail:to en lien cliquable
            replacePattern3 = /(([a-zA-Z0-9\-_.])+@[a-zA-Z_]+?(\.[a-zA-Z]{2,6})+)/gim;
            replacedText = replacedText.replace(replacePattern3, '<a href="mailto:$1">$1</a>');
        
            return replacedText;
        },
    }
}
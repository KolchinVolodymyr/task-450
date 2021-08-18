import PageManager from "./page-manager";
//import { defaultModal } from './global/modal';
import $ from "jquery";
import "jquery-modal";


export default class Custom extends PageManager {

    constructor(context) {
        super(context);
        this.$body = $('body');
    }

    onReady() {

        setTimeout(function() {
            $('#login-form').modal({
                fadeDuration: 250,
                fadeDelay: 0.80
            });
        }, 4000);


    }

}
import PageManager from "./page-manager";
import $ from "jquery";
import "jquery-modal";
import "slick-carousel";


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
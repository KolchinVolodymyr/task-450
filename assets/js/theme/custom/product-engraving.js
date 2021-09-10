import PageManager from '../page-manager';
import $ from 'jquery';

export default class CustomProductEngraving extends PageManager {

    onReady() {
        /*
        * Custom JS
        */
        //global variable
        var EngravingLengthID = null;
        var EngravingID = null;
        var productInputTextValueLength = null;

            this.context.ModifierOptions.forEach(item => {
                //find an object whose name 'Engraving length'
                //assign ID to our global variable EngravingLengthID
                if(item.display_name === 'Engraving length') {
                    EngravingLengthID = item.id;
                    document.querySelector('[id*="attribute_select"]').style.display = 'none';  // display:none
                    document.querySelector('[for*="attribute_select"]').style.display = 'none'; // display:none
                }

                //Find an object whose name 'Engraving'
                if(item.display_name === 'Engraving') {
                    //Listener input
                    document.querySelector('[id*="attribute_text"]').addEventListener('input', function(e) {
                        const $productInputText = $('[id*="attribute_text"]');

                        /* Validation start */
                        const regex = /[A-Za-z ,.]/;
                        const chars = e.target.value.split('');
                        const char = chars.pop();
                        if (!regex.test(char)) {
                             e.target.value = chars.join('');
                             alert('unknown or restricted symbol');
                        }
                        if(chars.length > 50 ){
                             alert('too much symbols. Please, make your text shorter');
                        }
                        /* Validation end */
                        //replace(/ +/g, ' ').trim() does not include spaces in the price
                        productInputTextValueLength = $productInputText.find('value').prevObject[0].value.replace(/ +/g, ' ').trim().length;

                        $(`#attribute_select_${EngravingLengthID} > option`).each(function() { //Run through the loop of each option
                            //this.text = <options>text</options>
                            if(this.text.indexOf(productInputTextValueLength)>=0) { //Find if the string present as substring
                               $(`#attribute_select_${EngravingLengthID} > option`).removeAttr("selected"); //Remove the existing selected option
                               $(this).attr("selected","selected"); //Select this matching option as selected
                               return false; //Return after first match is found
                            }
                        });
                    });
                }
            });
            /*
            *
            */

            /*function show input for a engraving  */
            function yesnoCheck() {
                if (document.getElementById('yesCheck').checked) {
                    document.getElementById('ifYes').style.display = 'block';
                }
                else document.getElementById('ifYes').style.display = 'none';
            }
             /* Event listener input */
             /* show input for a engraving */
             document.querySelector('#yesCheck').addEventListener('change', function(){
                yesnoCheck(); //

                document.querySelector('[id*="attribute_text"]').addEventListener('input', function() {
                    document.getElementById('form-action-addToCart').setAttribute("disabled", "disabled");
                });

             });

             /* display; none input a engraving */
             document.querySelector('#none').addEventListener('change', yesnoCheck);

    }

}
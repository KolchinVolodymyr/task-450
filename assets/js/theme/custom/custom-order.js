import PageManager from '../page-manager';
import get from 'bigcommerce-graphql';
import regeneratorRuntime from 'regenerator-runtime';
import utils from '@bigcommerce/stencil-utils';

export default class Custom extends PageManager {


    onReady() {
        this.productsOrder = $('productOrderCustommm');
        console.log('Custom Order!!!');
         async function getData(){
                let res = await get('{ site { products (first:3, after:"") { edges { node { name } } } } }')
                console.log(await get('{ site { products (first:3, after:"") { edges { node { name } } } } }'))
                console.log('res', res);
                return $('.containerCustom').html(res);
            }

            getData();
//
//        console.log('fetch end');
//        console.log('utils.api product', utils.api.product);
//        console.log('utils.api search', utils.api.search.search);
//        utils.api.product.getById(
//            111,
//            { template: 'custom/order-custom-component'},
//            (err, res) => {
//                // Will print the name of the product.
//                //console.log(res);
//                return $('.containerCustom').html(res);
//            }
//
//        )

//        utils.api.productAttributes.optionChange(111,
//                                                             { template: 'custom/order-custom-component'},
//                                                             (err, res) => {
//                                                                 // Will print the name of the product.
//                                                                 console.log(res);
//                                                                 return $('.containerCustom').html(res);
//                                                             })

        //console.log('result', response);

    }

}
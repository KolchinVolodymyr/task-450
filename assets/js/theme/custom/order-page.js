import PageManager from '../page-manager';
import get from 'bigcommerce-graphql';
import regeneratorRuntime from 'regenerator-runtime';
import utils from '@bigcommerce/stencil-utils';

export default class Custom extends PageManager {



    onReady() {
        let countryProduct = null;

        get (`{site { products(entityIds: [88,80,81]) { edges{ node{ id, entityId, name, description, sku, inventory {isInStock}, createdAt {utc} prices { price { value, currencyCode } } defaultImage { url(width:1280) } } } } } }`)
        .then((data) => {
            console.log(data);
            data.site.products.forEach(el => {
                var block = document.createElement("DIV");

                block.innerHTML = ` <p id="title" title="${el.name}"> ${el.name} <p>
                                    <img src="${el.defaultImage.url}" alt="">
                                    ${el.description}
                                    <input id="input_${el.entityId}" name="country" type="text"> `;

                document.getElementById("containerCustom").appendChild(block);

                document.getElementById(`input_${el.entityId}`).addEventListener("input", function(e) {
                   // el.sum = el.amount*el.prices.price.value;

                    el.amount = document.getElementById(`input_${el.entityId}`).value;

                    console.log('el.prices.price.value + el.amount', el.prices.price.value);
                    console.log('el.amount', +el.amount);
                    console.log('sum', el.prices.price.value*+el.amount);
                    let sumProduct =  el.prices.price.value*+el.amount;

                    sum(sumProduct);

                });

            });

            //listener input addToCart
            document.getElementById('addToCart').addEventListener('click', customAddToCartButton);

            var products = data.site.products;
            //console.log('products', products);
            function sum(products) {
                let priceArr = [];

                products.forEach(el=> {
//                    let qw = el.prices.price.value*amount.amount ;
//                    console.log('amount amount', amount.amount);
//                    console.log('el', el);
                    priceArr.push(el.prices.price.value);
                    //amountArr.push();
                });
                //console.log('priceArr', priceArr);

                let total = priceArr.reduce((previousValue, currentValue) => previousValue + currentValue)

                var total_price = document.createElement("DIV");
                total_price.innerHTML = `Total: ${total} ${countryProduct}`;

                document.getElementById("containerCustom").appendChild(total_price)
            }


            async function customAddToCartButton () {
                for( const product of products) {
                    await fetch(`/cart.php?action=add&product_id=${product.entityId}&qty=${product.amount}`);
                }
                // go to cart
                window.location = "/cart.php";
            };


        });


    }




}

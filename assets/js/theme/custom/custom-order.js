import PageManager from '../page-manager';
import get from 'bigcommerce-graphql';
import regeneratorRuntime from 'regenerator-runtime';
import utils from '@bigcommerce/stencil-utils';

export default class Custom extends PageManager {



    onReady() {
         let countryProduct = null;


        get (`{site { products(entityIds: [104,107,111]) { edges{ node{ id, entityId, name, description, sku, inventory {isInStock}, createdAt {utc} prices { price { value, currencyCode } } defaultImage { url(width:1280) } } } } } }`)
        .then((data) => {
            console.log(data);
            data.site.products.forEach(el => {
                var block = document.createElement("DIV");

                block.innerHTML = ` <p id="title" title="${el.name}"> ${el.name} <p>
                                    <img src="${el.defaultImage.url}" alt="">
                                    ${el.description}
                                    <input id="input_${el.entityId}" name="country" type="text"> `;

               // console.log('total_price', total_price);
                document.getElementById("containerCustom").appendChild(block);

                document.getElementById(`input_${el.entityId}`).addEventListener("input", function(e) {
                    var countryProduct = document.getElementById(`input_${el.entityId}`).value;
                    sum(products);
                });

            });

            //listener input addToCart
            document.getElementById('addToCart').addEventListener('click', customAddToCartButton);

            var products = data.site.products;
            //console.log('products', products);
            function sum(products) {
                let priceArr = [];
                products.forEach(el=> {
                    priceArr.push(el.prices.price.value);
                });

                let total = priceArr.reduce((previousValue, currentValue) => previousValue + currentValue)

                var total_price = document.createElement("DIV");
                total_price.innerHTML = `Total: ${total} ${countryProduct}`;

                document.getElementById("containerCustom").appendChild(total_price)
            }
            sum(products);

            async function customAddToCartButton () {
                for( const product of products) {
                console.log('product', product);
                    await fetch(`/cart.php?action=add&product_id=${product.entityId}&qty=1`);
                }
                // go to cart
                window.location = "/cart.php";
            };


        });

        document.addEventListener("load", () => {
            console.log("DOM готов!");
          });

    }




}
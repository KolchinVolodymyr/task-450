import PageManager from '../page-manager';
import $ from 'jquery';
import get from 'bigcommerce-graphql';
import 'regenerator-runtime/runtime';

export default class CustomProductPageDetail extends PageManager {
    constructor (context) {
        super(context);
    }
    onReady() {
    let productId = this.context.product.id;
   // console.log('this.context.storefrontAPIToken', this.context.storefrontAPIToken);
        console.log('CustomProductPage');
        console.log('this.context.product.options', this.context.product.id);

        this.context.product.options.forEach(el => {
           // console.log(el.values);
            el.values.forEach(i => {
                //console.log(i.label);
            });
        });


//        const response = get(`{ site { product(entityId: ${productId}) { id entityId name variants(first: 10) { pageInfo {endCursor hasNextPage} edges { node { id entityId sku inventory {aggregated {availableToSell}} prices { price {...MoneyFields} } options{ edges { node { entityId displayName isRequired values { edges { node { entityId label }}} }}} defaultImage {url(width: 80)}}}} }}} fragment MoneyFields on Money {value currencyCode}`)
//        .then((data) => { return data });
//
//            console.log('response', response);
            let productVariants = [];
            (async function getProductVariants() {
                console.log('getProductVariants');
                let response = await get(`{ site { product(entityId: ${productId}) { id entityId name variants(first: 10) { pageInfo {endCursor hasNextPage} edges { node { id entityId sku inventory {aggregated {availableToSell}} prices { price {...MoneyFields} } options{ edges { node { entityId displayName isRequired values { edges { node { entityId label }}} }}} defaultImage {url(width: 80)}}}} }}} fragment MoneyFields on Money {value currencyCode}`)
                        .then((data) => { return data });
                console.log('response.site.product.variants', response.site.product.variants);
                productVariants.push(response.site.product.variants);
                //productVariants.flat();
                await create();
            })()
            console.log('productVariants', productVariants);

            function create() {
                console.log('create fun productVariants', productVariants.flat());
                productVariants.flat().forEach(el => {
                //console.log('el', el);
                    let optionDiv = document.createElement("div");
                    optionDiv.classList.add("my-class");
                    optionDiv.innerHTML = `
                        <img src='${el.defaultImage.url}'>
                        <div class="sku-product">${el.sku}</div>
                        <div class="price-product">${el.prices.price.value} ${el.prices.price.currencyCode}</div>
                    `;
                    document.getElementById("optionProduct").appendChild(optionDiv);
                });
            }


    }

}

import PageManager from '../page-manager';
//import get from 'bigcommerce-graphql';
import regeneratorRuntime from 'regenerator-runtime';
import utils from '@bigcommerce/stencil-utils';

export default class Custom extends PageManager {


    onReady() {
//        this.productsOrder = $('productOrderCustommm');
//        console.log('Custom Order!!!');
//         async function getData(){
//                let res = await get('{ site { products (first:3, after:"") { edges { node { name } } } } }')
//                console.log(await get('{ site { products (first:3, after:"") { edges { node { name } } } } }'))
//                console.log('res', res);
//                return $('.containerCustom').html(res);
//            }
//
//            getData();
//
//        console.log('fetch end');
//        console.log('utils.api product', utils.api.product);
//        console.log('utils.api search', utils.api.search.search);

//        utils.api.product.getById(
//            104,
//            { template: 'custom/order-custom-component'},
//            (err, res) => {
//                // Will print the name of the product.
//                //console.log(res);
//                return $('.containerCustom').html(res);
//            }
//        )

    //var fabricSwatchList = "104, 111";
    // Add Fabric Swatches //
//
//    	var arr = [103, 104, 111];
//    	var callback = (err, response) => {
//            console.log('response:\n' + response);
//            $('.containerCustom').append(response);
//        };
//
//    	console.log('arr:\t' + arr);
////    	console.log('arr.length', arr.length);
////    	for(var i = 0; i < arr.length; i++) {
////    		utils.api.product.getById(arr[i], { template: 'custom/order-custom-component' }, callback);
////    	}
//
//            for(var i = 0; i < arr.length; i++) {
//                  // convert each value into a Promise (future result)
//                  var promises = arr.map(x => new Promise(function(resolve, reject) {
//                    utils.api.product.getById(arr[i], { template: 'custom/order-custom-component' }, (err, response) => {
//                       // the value is available, fulfill the promise with an error or result
//                       if(err) { reject(err); } else { resolve(response); }
//                    });
//                  }));
//            }
//            console.log('executing all promises');
//            Promise.all(promises).then(function(values) {
//                console.log('all values available at one time', values);
//                $('.containerCustom').html(values);
//            });




        const token = JSON.parse(document.getElementById('BC_GraphQL_Token').textContent)
        console.log('token', token);


        async function get(query, removeEdges=true) {
            const response = await fetch('/graphql', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({query})
            });

            if (response.ok) {
                const { data } = await response.json()

                data.site.products.edges.forEach(el => {
//                    var item = document.createElement("DIV");
//                    item.className = "classItem";
//                    item.setAttribute("id", "classItem");

                    var name = document.createElement("P");
                    var img = document.createElement("img");
                    var description = document.createElement("DIV");
                    name.innerHTML = `This is a NAME. ${el.node.name}`;
                    description.innerHTML = `Description: ${el.node.description}`;

                    //images
                    img.setAttribute('src', `${el.node.defaultImage.url}`);
                    img.setAttribute('height', '300px');
                    img.setAttribute('width', '300px');

                    //document.getElementById("containerCustom").appendChild(item);

                    document.getElementById("containerCustom").appendChild(name);
                    document.getElementById("containerCustom").appendChild(img);
                    document.getElementById("containerCustom").appendChild(description);
                });





                 //$('.containerCustom').document.createElement('div');



//                var para = document.createElement("P");
//                para.innerHTML = `This is a paragraph. ${data.site.products.edges[0].defaultImage}`;
//                document.getElementById("containerCustom").appendChild(para);

                return


            } else
                throw Error(`GraphQL error ${response.status} - ${response.statusText}`)
        }



        get (`{site { products(entityIds: [104,107,111]) { edges{ node{ id, entityId, name, description, sku, inventory {isInStock}, createdAt {utc} prices { price { value, currencyCode } } defaultImage { url(width:1280) } } } } } }`);



    }

}
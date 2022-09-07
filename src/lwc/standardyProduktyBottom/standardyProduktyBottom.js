/**
 * Created by juraj on 14/08/2022.
 */

import {api, LightningElement, track} from 'lwc';
import getProductOptions from '@salesforce/apex/StandardyController.getProductOptions';
import getNumberOfPrvky from '@salesforce/apex/StandardyController.getNumberOfPrvky';
import getVybrany from '@salesforce/apex/StandardyController.getVybrany';


export default class StandardyProduktyBottom extends LightningElement {
    @api flatID;
    @track productOptions;
    @track productID;
    @track numOfPrvky = 0;
    @track numOfVybrane = 0;
    @api prvokID;

    @api getProductOptions(productID, selectedIds){

        console.log('product: ' +  productID);
        console.log('IDS: ' +  selectedIds);
        console.log('PRVOK: ' +  this.prvokID);

        this.productID = productID;
        getProductOptions({productID: productID, selectedIds: selectedIds, prvokID: this.prvokID  })
            .then(response => {this.productOptions = response})
            .catch(error => {console.log(error)})
        console.log('logisek '+JSON.stringify(this.productOptions))

        getVybrany({productID: productID, selectedIds: selectedIds, prvokID: this.prvokID})
            .then(response => {this.numOfVybrane = response})
            .catch(error => {console.log(error)})


        getNumberOfPrvky({mainProductId: productID})
            .then(response => {this.numOfPrvky = response})
            .catch(error => {console.log(error)})

    }

    @api resetData(){
        this.productOptions = null;
        this.numOfPrvky = null;
    }

    renderProductConcreteOptions(event){




        let eventToDispatch = new CustomEvent('name', {
            detail: {
                id: event.currentTarget.dataset.id,
                productid: this.productID,

            }
        });
        this.dispatchEvent(eventToDispatch)


    }




}
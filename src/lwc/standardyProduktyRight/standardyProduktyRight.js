/**
 * Created by mgons on 8/3/2022.
 */

import {api, LightningElement, track, wire} from 'lwc';
import getLineItem from '@salesforce/apex/StandardyController.getLineItems';
import getLineItemProdukt from '@salesforce/apex/StandardyController.getLineItemsProdukt';
import getFeaturesFromProducts from '@salesforce/apex/StandardyController.getFeaturesFromProducts';
import insertProduct from '@salesforce/apex/StandardyController.insertProduct';


export default class StandardyProduktyRight extends LightningElement {

    @api flatID;
    @track StandardyData;
    @api standardID;
    @track value = '';
    @track selectedProduct = null
    @track showBool;

    connectedCallback() {
      //  this.getLineItem()
    }

    renderedCallback() {

        let i;
        let checkboxes = this.template.querySelectorAll('[data-id="a0o1q000002yfrJAAQ"]')
        for(i=0; i<checkboxes.length; i++) {
            checkboxes[i].checked = true;
        }

        if (this.selectedProduct != null){
            console.log(('insert before'))
            this.insertProduct();
        }



    }




    get options() {
        return [
            { label: '', value: 'option1'}
        ];
    }

    @api getFeaturesFromProducts(ProductFamily){

        getFeaturesFromProducts({standardID: this.standardID, featureID: ProductFamily, flatID: this.flatID})
            .then(response => {

                this.StandardyData = response;
                console.log(JSON.stringify(this.StandardyData))

            })
            .catch(error => {
                console.log(error);
            })
    }

    insertProduct(){
        insertProduct({featureID: this.selectedProduct, flatID: this.flatID})
            .then(response => {
                console.log(('insert ' + response))

            })
            .catch(error => {
                console.log(error);
            })
    }

    handleChange(event) {
        this.selectedProduct = event.currentTarget.dataset.id;
        let id = event.currentTarget.dataset.id

        let arrayLength = this.StandardyData.length;
        for (let i = 0; i < arrayLength; i++) {
            console.log(this.StandardyData[i]);
            //Do something
        }

    }


    @api handleOpacity(){

            this.template.querySelector(".container").style="opacity:100%"
            this.template.querySelector(".slds-scrollable_y").style="pointer-events:all"


    }


}
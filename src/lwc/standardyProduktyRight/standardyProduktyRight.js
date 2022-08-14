/**
 * Created by matistikoff on 8/3/2022.
 */

import {api, LightningElement, track, wire} from 'lwc';
import getLineItem from '@salesforce/apex/StandardyController.getLineItems';
import getLineItemProdukt from '@salesforce/apex/StandardyController.getLineItemsProdukt';
import getFeaturesFromProducts from '@salesforce/apex/StandardyController.getFeaturesFromProducts';
import insertProduct from '@salesforce/apex/StandardyController.insertProduct';
import getProduktPrvky from '@salesforce/apex/StandardyController.getProduktPrvky';
import updateProduktPrvku from '@salesforce/apex/StandardyController.updateProduktPrvku';
import getActivatedPrvokID from '@salesforce/apex/StandardyController.getActivatedPrvokID';
import {ShowToastEvent} from "lightning/platformShowToastEvent";


export default class StandardyProduktyRight extends LightningElement {

    @api flatID;
    @track prvky;
    @api standardID;
    @track value = '';
    @track selectedProductId = null
    @track showBool;
    @track modal = false
    @track activatedProductID = null;
    @track saved = false;

    connectedCallback() {
      //  this.getLineItem()
    }

    renderedCallback() {



    }




    get options() {
        return [
            { label: '', value: 'option1'}
        ];
    }

    @api getFeaturesFromProducts(ProductFamily){

        this.selectedProductId = null
        this.saved = false;

        getProduktPrvky({prvokID: ProductFamily})
            .then(response => {

                this.prvky = response;

            })
            .catch(error => {
                console.log(error);
            })

        getActivatedPrvokID({prvokID: ProductFamily})
            .then(response => {

                this.activatedProductID = response;

            })
            .catch(error => {
                console.log(error);
            })



    }

    insertProduct(){
        insertProduct({featureID: this.selectedProductId, flatID: this.flatID})
            .then(response => {
                console.log(('insert ' + response))

            })
            .catch(error => {
                console.log(error);
            })
    }

    handleChange(event) {

        if (this.activatedProductID != null && this.selectedProductId === null){
            this.selectedProductId = this.activatedProductID;
        }

        if (this.selectedProductId == null){
            this.selectedProductId = event.currentTarget.dataset.id;
        }

        else if (event.currentTarget.dataset.id === this.selectedProductId){
            this.selectedProductId = null;
        }

        else {
            let currentId = event.currentTarget.dataset.id
            const theDiv = this.template.querySelector('[data-id="' +this.selectedProductId+ '"]');
            theDiv.checked = false
            this.selectedProductId = currentId;
        }
    }



    saveProduct(){

        this.saved = true;

        updateProduktPrvku({prvokID: this.selectedProductId})
            .then(response => {})
            .catch(error => {console.log(error)})

        setTimeout(this.closeModal, 3000)
    }

    getActivatedPrvokID(){

        getActivatedPrvokID()
            .then(response => {})
            .catch(error => {console.log(error)})
    }


    @api handleOpacity(){

            this.template.querySelector(".container").style="opacity:100%"
            this.template.querySelector(".slds-scrollable_y").style="pointer-events:all"


    }

    openModal(){
        this.modal = true
    }
    closeModal(){
        this.modal = false
    }


}
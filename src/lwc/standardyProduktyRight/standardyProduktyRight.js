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
import getProduktPrvkuName from '@salesforce/apex/StandardyController.getProduktPrvkuName';
import getSelectedProducts from '@salesforce/apex/StandardyController.getSelectedProducts';
import getImage from '@salesforce/apex/StandardyController.getImage';
import deleteQuoteLines from '@salesforce/apex/StandardyController.deleteQuoteLines';
import checkForActivatedPrvok from '@salesforce/apex/StandardyController.checkForActivatedPrvok';


export default class StandardyProduktyRight extends LightningElement {

    @api flatID;
    @api prvokID;
    @track prvky;
    @api standardID;
    @track value = '';
    @track selectedProductId = null
    @track showBool;
    @track modal = false
    @track deleteModal = false;
    @track checkModal = false;
    @track activatedProductID = null;
    @track saved = false;
    @track druhName;
    @track selectedProductsObjects;
    @api selectedProducts = [];
    @track deleted = false;
    @track checkForActivated;
    @track changed;
    @track productFamily;
    @track imgModal=false;
    @track image;





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
        this.productFamily = ProductFamily;

        getProduktPrvkuName({prvokID: ProductFamily})
            .then(response => {

                this.druhName = response;

            })
            .catch(error => {
                console.log(error);
            })

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



        insertProduct({flatID: this.flatID,selectedIds: this.selectedProducts, prvokID: this.prvokID})
            .then(response => {
                console.log(('insert ' + response))

            })
            .then(response => {
                this.getFeaturesFromProducts(this.productFamily);
            })
            .catch(error => {
                console.log(error);
            })
    }

    renderProductOptions(event){

               let eventToDispatch = new CustomEvent('option', {
            detail: {
                id: event.currentTarget.dataset.id,

            }
        });
        this.dispatchEvent(eventToDispatch)

    }




    @api handleOpacity(){

            this.template.querySelector(".container").style="opacity:100%"
            this.template.querySelector(".slds-scrollable_y").style="pointer-events:all"


    }

    openModal(){
        this.modal = true

        console.log('arrayProducts ' + this.selectedProducts)
        getSelectedProducts({selectedIds: this.selectedProducts})
            .then(response => {this.selectedProductsObjects = response

                console.log('products from apex: ' + JSON.stringify(this.selectedProductsObjects))

            })
            .catch(error => {console.log(error)})





    }
    closeModal(){
        this.modal = false
    }

    openDeleteModal(){
        this.deleted=false;
        this.deleteModal = true;

    }
    closeDeleteModal(){
        this.deleteModal = false;
    }

    openCheckModal(){
        this.checkModal = true;

    }
    closeCheckModal(){
        this.checkModal = false;
    }

    openImgModal(event) {
        this.imgModal = true;
        let img=event.currentTarget.dataset.id;
        console.log('img '+ img)
        getImage({imgId:img}).then(response => {this.image =response
console.log('image '+JSON.stringify(this.image))

        })
            .catch(error => {
                console.log(error);
            })

        }


    closeImgModal() {
        this.imgModal = false;
    }

    deleteProduct(){
        this.deleted=true;
        this.changed=true;
        this.selectedProductsObjects = [];

        deleteQuoteLines({prvokID: this.prvokID}).then(r => this.getFeaturesFromProducts(this.productFamily))
            .catch(error => console.log(error))

        let eventToDispatch = new CustomEvent('delete', {

        });
        this.dispatchEvent(eventToDispatch)




    }

    @api resetData(){
        this.druhName = null;
        this.prvky = null;

    }


}
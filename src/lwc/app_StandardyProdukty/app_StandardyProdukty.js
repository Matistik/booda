/**
 * Created by mgons on 8/22/2022.
 */

import {api, LightningElement, track} from 'lwc';
import getByt from '@salesforce/apex/DashboardController.getByt';
import getConcreteProductOptions from '@salesforce/apex/StandardyController.getConcreteProductOptions';
import checkIfConcreteIsSelected from '@salesforce/apex/StandardyController.checkIfConcreteIsSelected';
import getActivatedProductOptions from '@salesforce/apex/StandardyController.getActivatedProductOptions';
import getActivatedPrvokID from '@salesforce/apex/StandardyController.getActivatedPrvokID';
import getProduktPrvkuName from '@salesforce/apex/StandardyController.getProduktPrvkuName';
import getSelectedProducts from '@salesforce/apex/StandardyController.getSelectedProducts';
import deleteQuoteLines from '@salesforce/apex/StandardyController.deleteQuoteLines';
import insertProduct from '@salesforce/apex/StandardyController.insertProduct';
import getUzavretieStandarduTermin from '@salesforce/apex/EtapyATerminyController.getUzavretieStandarduTermin';
export default class AppStandardyProdukty extends LightningElement {
    @api flatID;
    @api castPrvkuName;
    @api productID;
    @api prvokID;
    @track bytData;
    @track miestnosti = false;
    @track prvky = false;
    @track prvok = false;
    @track casti = false;
    @track mojByt = false;
    @track standardy = true;
    @track selectedIds = [];
    @track products;
    @track modal = false
    @track saved = false;
    @track selectedProductsObjects;
    @track selectedProductId;
    @track stringDate;

    goToMojByt(){
        this.mojByt = !this.mojByt;
        this.standardy = !this.standardy;
    }
    goToMiestnosti(){
        let eventToDispatch = new CustomEvent('miestnost', {

        });
        this.dispatchEvent(eventToDispatch)
    }
    goToPrvky(){
        let eventToDispatch = new CustomEvent('prvky', {

        });
        this.dispatchEvent(eventToDispatch)

    }
    goToPrvok(){
        let eventToDispatch = new CustomEvent('prvok', {

        });
        this.dispatchEvent(eventToDispatch)
    }
    goToCasti(){
        let eventToDispatch = new CustomEvent('casti', {

        });
        this.dispatchEvent(eventToDispatch)
    }

    connectedCallback() {
        this.getBytData();
        this.getUzavretieStandarduTermin()
        this.getProductOptions(this.castPrvkuName, this.productID, this.selectedIds);
    }

    getBytData() {
        console.log("flatid;;;;"+this.flatID);

        getByt({ bytId: this.flatID })
            .then(response => {
                this.bytData = response;

            })
            .catch(error => {
                console.error(error);
            })
    }

    getUzavretieStandarduTermin(){
        getUzavretieStandarduTermin({ byt: this.flatID })
            .then(response => {
                this.uzavretieStandardov = response;
                this.stringDate = (JSON.stringify(this.uzavretieStandardov))
                this.stringDate = this.stringDate.substring(28,38);

            })
            .catch(error => {
                console.error(error);
            })
    }

    @api getProductOptions(Name, ProductID, SelectedIds){

        let eventToDispatch = new CustomEvent('selected', {
            detail: {
                id: this.selectedProductId,


            }
        });
        this.dispatchEvent(eventToDispatch)


        console.log('selec' + this.selectedProductId)
        console.log('act' + this.activatedProductID)






        this.selectedProductId = null

        console.log('productID ' + ProductID)
        console.log('featureName ' + Name)
        console.log('selectedIds ' + SelectedIds)
        console.log('prvokID ' + this.prvokID)



        getConcreteProductOptions({productID: ProductID, featureName: Name, selectedIds: SelectedIds, prvokID:  this.prvokID})
            .then(response => {this.products = response
                let array = [];
                array = JSON.parse(JSON.stringify(this.products))
                console.log(array)


            })

            .catch(error => {console.log(error)})


        // checkIfConcreteIsSelected({productID: ProductID, featureName: Name, selectedIds: SelectedIds, prvokID:  this.prvokID})
        //     .then(response => {this.isActivated = response
        //
        //         console.log(this.isActivated)
        //
        //
        //     })
        //     .catch(error => {console.log(error)})
        //
        //
        //  budem sa musiet naucit nejaky ASYNC na toto


        getActivatedProductOptions({productID: ProductID, featureName: Name, selectedIds: SelectedIds, prvokID:  this.prvokID})
            .then(response => {this.activatedProductID = response
            })
            .catch(error => {console.log(error)})





    }

    handleChange(event){


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

    openModal(){
        this.modal = true


        this.selectedIds.push(this.selectedProductId);
        this.selectedIds.push(this.productID);

        getSelectedProducts({selectedIds: this.selectedIds})
            .then(response => {this.selectedProductsObjects = response

                console.log('products from apex: ' + JSON.stringify(this.selectedProductsObjects))

            })
            .catch(error => {console.log(error)})





    }

    saveProduct(){

        this.saved = true;

        console.log('flatID ' + this.flatID)
        console.log('selectedIds ' + this.selectedIds)
        console.log('prvokID ' + this.prvokID)


        insertProduct({flatID: this.flatID,selectedIds: this.selectedIds, prvokID: this.prvokID})
            .then(response => {
                console.log(('insert ' + response))

            })
            .catch(error => {
                console.log(error);
            })



    }

    closeModal(){
        this.modal = false
        let eventToDispatch = new CustomEvent('casti', {

        });
        this.dispatchEvent(eventToDispatch)
    }



}
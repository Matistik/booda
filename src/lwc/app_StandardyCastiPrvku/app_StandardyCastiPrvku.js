/**
 * Created by mgons on 8/22/2022.
 */

import {api, LightningElement, track} from 'lwc';
import getByt from '@salesforce/apex/DashboardController.getByt';
import getProductOptions from '@salesforce/apex/StandardyController.getProductOptions';
import getNumberOfPrvky from '@salesforce/apex/StandardyController.getNumberOfPrvky';
import getVybrany from '@salesforce/apex/StandardyController.getVybrany';
export default class AppStandardyCastiPrvku extends LightningElement {

    @api flatID;
    @track bytData;
    @api vyberPrvokID
    @api prvokID
    @track productID;
    @track miestnosti = false;
    @track prvky = false;
    @track prvok = false;
    @track produkt = false;
    @track mojByt = false;
    @track standardy = true;
    @track selectedIds = [];
    @track productOptions;
    @track numOfVybrane;
    @track numOfPrvky;

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
    goToProdukt(){
        this.produkt = !this.produkt;
        this.standardy = !this.standardy;
    }

    connectedCallback() {
        console.log('vyberprvokID '+this.vyberPrvokID)
        console.log('prvokID '+this.prvokID)
        this.selectedIds.push(this.vyberPrvokID);
        this.selectedIds.push(this.vyberPrvokID);
        this.getBytData()
        this.getProductOptions(this.vyberPrvokID,this.selectedIds)

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

    @api getProductOptions(productID, selectedIds){

        console.log('product: ' +  productID);
        console.log('IDS: ' +  selectedIds);
        console.log('PRVOK: ' +  this.prvokID);

        this.productID = productID;
        getProductOptions({productID: productID, selectedIds: selectedIds, prvokID: this.prvokID  })
            .then(response => {this.productOptions = response
                console.log('logisek '+JSON.stringify(this.productOptions))})

            .catch(error => {console.log(error)})


        getVybrany({productID: productID, selectedIds: selectedIds, prvokID: this.prvokID})
            .then(response => {this.numOfVybrane = response})
            .catch(error => {console.log(error)})


        getNumberOfPrvky({mainProductId: productID})
            .then(response => {this.numOfPrvky = response})
            .catch(error => {console.log(error)})

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
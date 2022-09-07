/**
 * Created by mgons on 8/22/2022.
 */

import {api, LightningElement, track} from 'lwc';
import getByt from '@salesforce/apex/DashboardController.getByt';
import getLineItem from '@salesforce/apex/StandardyController.getLineItems';
import getLineItemProdukt from '@salesforce/apex/StandardyController.getLineItemsProdukt';
import getFeaturesFromProducts from '@salesforce/apex/StandardyController.getFeaturesFromProducts';
import insertProduct from '@salesforce/apex/StandardyController.insertProduct';
import getProduktPrvky from '@salesforce/apex/StandardyController.getProduktPrvky';
import updateProduktPrvku from '@salesforce/apex/StandardyController.updateProduktPrvku';
import getActivatedPrvokID from '@salesforce/apex/StandardyController.getActivatedPrvokID';
import getProduktPrvkuName from '@salesforce/apex/StandardyController.getProduktPrvkuName';
import getSelectedProducts from '@salesforce/apex/StandardyController.getSelectedProducts';
import deleteQuoteLines from '@salesforce/apex/StandardyController.deleteQuoteLines';
import getImage from '@salesforce/apex/StandardyController.getImage';
import {ShowToastEvent} from "lightning/platformShowToastEvent";

export default class AppStandardyPrvok extends LightningElement {
    @api flatID;
    @api prvokID
    @api vyberPrvokID;
    @track bytData;
    @track miestnosti = false;
    @track prvky = false;
    @track mojByt = false;
    @track casti = false;
    @track standardy = true;
    @track prvkyData
    @track deleteModal = false;
    @track deleted;

    goToMojByt(){
        this.mojByt = !this.mojByt;
        this.standardy = !this.standardy;
    }
    goToMiestnosti(){

        let eventToDispatch = new CustomEvent('miestnost', {
            detail: {
                id: this.miesnotstID,

            }
        });
        this.dispatchEvent(eventToDispatch)

    }
    goToPrvky(){
        let eventToDispatch = new CustomEvent('prvok', {
            detail: {
                id: this.prvokID,

            }
        });
        this.dispatchEvent(eventToDispatch)
    }
    goToCasti(){
        this.casti = !this.casti;
        this.standardy = !this.standardy;
    }

    connectedCallback() {
        console.log('prvokID '+this.prvokID)
        this.getBytData()
        this.getFeaturesFromProducts(this.prvokID)

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
    @api getFeaturesFromProducts(ProductFamily){

        getProduktPrvky({prvokID: ProductFamily})
            .then(response => {

                this.prvkyData = response;

            })
            .catch(error => {
                console.log(error);
            })
    }
    renderCastiPrvku(event){
        let vyberPrvokID = event.currentTarget.dataset.id;

        let eventToDispatch = new CustomEvent('vyberprvok', {
            detail: {
                id: vyberPrvokID,

            }
        });
        this.dispatchEvent(eventToDispatch)

    }

    openDeleteModal(){
        this.deleteModal = true;
        console.log('bol som true')
    }
    closeDeleteModal(){
        this.deleteModal = false;
    }

    deleteProduct(){
        this.deleted=true;
        deleteQuoteLines({prvokID: this.prvokID}).then(r => console.log(r))
            .catch(error => console.log(error))
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

    @track imgModal=false;
    @track image;
    closeImgModal() {
        this.imgModal = false;
    }
}
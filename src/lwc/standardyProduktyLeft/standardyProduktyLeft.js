/**
 * Created by mgons on 8/3/2022.
 */

import {api, LightningElement, track} from 'lwc';
import getLineItem from '@salesforce/apex/StandardyController.getLineItems';
import getLineItemMiestnost from '@salesforce/apex/StandardyController.getLineItemsMiestnost';
import getProductsFromStandard from '@salesforce/apex/StandardyController.getProductsFromStandard';

export default class StandardyProduktyLeft extends LightningElement {

    @api flatID;
    @track StandardyData;



    connectedCallback() {
        this.getLineItem()
    }


    getLineItem(){
        getLineItem({lineId: this.flatID})
            .then(response => {
                this.StandardyData = response;
            })
            .catch(error => {
                console.log(error);
            })
    }

    @api getProductsFromStandard(miestnost){
        console.log(miestnost)
        getProductsFromStandard({standardID: miestnost})
            .then(response => {

                this.StandardyData = response;
                console.log(JSON.stringify(this.StandardyData))
            })
            .catch(error => {
                console.log(error);
            })
    }

    renderProdukty(event){
        let caseId = event.currentTarget.dataset.id;



        let eventToDispatch = new CustomEvent('produkt', {
            detail: {
                id: caseId,

            }
        });
        this.dispatchEvent(eventToDispatch)
    }


}
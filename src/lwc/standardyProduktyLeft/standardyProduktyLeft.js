/**
 * Created by mgons on 8/3/2022.
 */

import {api, LightningElement, track} from 'lwc';
import getLineItem from '@salesforce/apex/StandardyController.getLineItems';
import getLineItemMiestnost from '@salesforce/apex/StandardyController.getLineItemsMiestnost';
import getProductsFromStandard from '@salesforce/apex/StandardyController.getProductsFromStandard';
import getPrvky from '@salesforce/apex/StandardyController.getPrvky';

export default class StandardyProduktyLeft extends LightningElement {

    @api flatID;
    @track prvky;



    connectedCallback() {
        this.getLineItem()
    }


    getLineItem(){
        getLineItem({lineId: this.flatID})
            .then(response => {
                this.prvky = response;
            })
            .catch(error => {
                console.log(error);
            })
    }

    @api getPrvky(miestnost){
        console.log(miestnost)
        getPrvky({MiestnostID: miestnost})
            .then(response => {

                this.prvky = response;
                console.log(JSON.stringify(this.prvky))
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
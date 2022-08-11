/**
 * Created by mgons on 8/3/2022.
 */

import {api, LightningElement, track} from 'lwc';
import getStandards from '@salesforce/apex/StandardyController.getFlatStandards';
import getFlatIdAsProduct from '@salesforce/apex/StandardyController.getFlatIdAsProduct';


export default class StandardyVyberStandardov extends LightningElement {



    @api flatID;
    @track standards;
    @track flatIdAsProduct;

    handleOpacity() {
        this.dispatchEvent(new CustomEvent('hopacity'));

    }

    connectedCallback() {

        this.getStandards()
        this.getFlatIdAsProduct();
    }


    getStandards(){
        getStandards({flatID: this.flatID})
            .then(response => {this.standards = response
               })
            .catch(error => {console.log(error)})
    }

    getFlatIdAsProduct(){
        getFlatIdAsProduct({flatID: this.flatID})
            .then(response => {this.flatIdAsProduct = response})
            .catch(error => {console.log(error)})
    }

    renderMiestnosti(event){

        let caseId = event.currentTarget.dataset.id;

        let eventToDispatch = new CustomEvent('standard', {
            detail: {
                id: caseId,

            }
        });
        this.dispatchEvent(eventToDispatch)

    }

}
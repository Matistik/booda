/**
 * Created by mgons on 8/3/2022.
 */

import {api, LightningElement, track} from 'lwc';
import getLineItem from '@salesforce/apex/StandardyController.getLineItems';
import getRooms from '@salesforce/apex/StandardyController.getDistinctRooms';
import getStandardsForRooms from '@salesforce/apex/StandardyController.getStandardsForRooms';
import getFlatIdAsProduct from '@salesforce/apex/StandardyController.getFlatIdAsProduct';
import getMiestnosti from '@salesforce/apex/StandardyController.getMiestnosti';

export default class StandardyMiestnosti extends LightningElement {

    @api flatID;
    @track StandardyData = [];
    @track rooms;
    @track flatIdAsProduct;


    connectedCallback() {
        this.getMiestnosti()
    }





    getMiestnosti(){
        getMiestnosti({flatID: this.flatID})
            .then(response => {this.rooms = response})
            .catch(error => (console.log(error)))
    }




    @api getRooms(standardID){
        console.log('standard ' + standardID)
        console.log('flatidproduct ' + this.flatIdAsProduct)

        getStandardsForRooms({flatIdAsProduct: this.flatIdAsProduct, featureID: standardID})
            .then(response => {
                this.rooms = response;
            })
            .catch(error => {
                console.log(error);
            })
    }

     renderPrvky(event){
        let caseId = event.currentTarget.dataset.id;

        let eventToDispatch = new CustomEvent('druh', {
            detail: {
                id: caseId,

            }
        });
        this.dispatchEvent(eventToDispatch)

    }





}
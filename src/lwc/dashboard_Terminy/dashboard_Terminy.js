/**
 * Created by matistikoff on 21. 7. 2022.
 */

import {api, LightningElement, track} from 'lwc';
import getTerminy from '@salesforce/apex/DashboardController.getTerminy'

export default class DashboardTerminy extends LightningElement {

    @api flatID;
    @track terminyData = true;

    renderedCallback() {
        this.getTerminyData();
    }

    getTerminyData(){
        //console.log('Byt ku kontaktu : '+this.flatID);
        getTerminy({bytId: this.flatID})
            .then(response =>{this.terminyData= response;})

            .catch(error => {
                console.error(error);
            })
    }
}
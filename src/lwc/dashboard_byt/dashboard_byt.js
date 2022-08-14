/**
 * Created by matistikoff on 21. 7. 2022.
 */

import {api, LightningElement, track} from 'lwc';
import getByt from '@salesforce/apex/DashboardController.getByt';

export default class DashboardByt extends LightningElement {

    @api flatID;
    @api caseID;
    @track bytData;
    @track openModal = false;

    openKAModal() {
        this.openModal = true;
    }

    closeKAModal() {
        this.openModal = false;
    }

    renderedCallback() {
        this.getBytData();
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

}
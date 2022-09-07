/**
 * Created by matistikoff on 21. 7. 2022.
 */

import {api, LightningElement, track} from 'lwc';
import getByt from '@salesforce/apex/DashboardController.getByt';
import updateByt from '@salesforce/apex/DashboardUpdate.updateByt';

export default class DashboardByt extends LightningElement {

    @api flatID;
    @track bytData;
    @track openModal = false;
    @track poznamky
    @track cislo

    openKAModal() {
        this.openModal = true;
    }

    closeKAModal() {
        this.openModal = false;
    }

    connectedCallback() {
        this.getBytData();
    }

    getBytData() {
        console.log("flatid;;;;" + this.flatID);

        getByt({bytId: this.flatID})
            .then(response => {
                this.bytData = response;

            })
            .catch(error => {
                console.error(error);
            })
    }

    handleSaveByt() {
        console.log("update byt" + " " + this.template.querySelector('.area1').value + " " + this.flatID)

        this.cislo = this.template.querySelector('.area1').value
        this.poznamky = this.template.querySelector('.area2').value

        updateByt({cislo: this.cislo, id: this.flatID, poznamky: this.poznamky},)
            .then(result => {
                this.getBytData();
                // Clear the user enter values
                this.cislo = {};
                this.id = {};
                this.poznamky = {};


            })
            .catch(error => {
                this.error = error.message;
            });
    }

}
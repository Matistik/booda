/**
 * Created by mgons on 8/10/2022.
 */

import {api, LightningElement, track} from 'lwc';
import getByt from '@salesforce/apex/DashboardController.getByt';

export default class AppTerminy extends LightningElement {
    @api flatID;
    @track bytData;

    @track mojByt = false;
    @track terminy = true;

    goToMOjByt(){
        this.mojByt = !this.mojByt;
        this.terminy = !this.terminy;
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
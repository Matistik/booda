/**
 * Created by Maind on 10. 8. 2022.
 */

import {api, LightningElement, track} from 'lwc';
import getByt from '@salesforce/apex/DashboardController.getByt';


export default class AppStandardy extends LightningElement {
    @api flatID;
    @track bytData;

    @track mojByt = false;
    @track standardy = true;

    goToMojByt(){
        this.mojByt = !this.mojByt;
        this.standardy = !this.standardy;
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
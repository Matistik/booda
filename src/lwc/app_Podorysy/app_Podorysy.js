/**
 * Created by Maind on 10. 8. 2022.
 */

import {LightningElement, track, api} from 'lwc';
import getByt from '@salesforce/apex/DashboardController.getByt';

export default class AppPodorysy extends LightningElement {
    @api flatID;
    @track bytData;

    @track mojByt = false;
    @track podorysy = true;

    goToMojByt(){
        this.mojByt = !this.mojByt;
        this.podorysy = !this.podorysy;
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
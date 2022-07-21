/**
 * Created by matistikoff on 21. 7. 2022.
 */

import {api, LightningElement, track} from 'lwc';
import getByt from '@salesforce/apex/PrehladBytovController.getByt';

export default class DashboardByt extends LightningElement {

    @api flatID;
    @track bytData;

    renderedCallback() {
        this.getBytData();
    }

    getBytData() {
        getByt({ bytId: this.flatID })
            .then(response => {
                this.bytData = response;

                // console.log(this.images = getImageURLFromRichText({url: this.caseData.Body__c}));
            })
            .catch(error => {
                console.error(error);
            })
    }

}
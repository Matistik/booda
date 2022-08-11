/**
 * Created by matistikoff on 21. 7. 2022.
 */

import {api, LightningElement, track} from 'lwc';
import getStandardy from '@salesforce/apex/DashboardController.getStandardy';
import getLineCount from '@salesforce/apex/StandardyController.getLineCount';

export default class DashboardStandardy extends LightningElement {

    @api flatID;
    @track standardyData = true;
    @track countData;

    renderedCallback() {
        this.getStandardyData();
        this.getStandardyLineCount();
    }
    getStandardyData(){
        getStandardy({bytId: this.flatID})
            .then(response =>{this.standardyData= response;})
            .catch(error => {
                console.error(error);
            })
    }

    getStandardyLineCount(){
        getLineCount({lineId: this.flatID})
            .then(response =>{this.countData = response;


            })
            .catch(error => {
                console.error(error);
            })

    }




    renderToStandards(){
        console.log('klik zo standardov')
        this.dispatchEvent(new CustomEvent('standards'));
    }

    @track openModal = false;

    openpdfModal() {
        this.openModal = true;
    }

    closepdfModal() {
        this.openModal = false;
    }
}
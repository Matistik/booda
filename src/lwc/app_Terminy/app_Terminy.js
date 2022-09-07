/**
 * Created by mgons on 8/10/2022.
 */

import {api, LightningElement, track} from 'lwc';
import getByt from '@salesforce/apex/DashboardController.getByt';
import getEtapyTerminy from '@salesforce/apex/EtapyATerminyController.getEtapyTerminy';

export default class AppTerminy extends LightningElement {
    @api flatID;
    @track bytData;
    @track etapyData;

    @track mojByt = false;
    @track terminy = true;

    goToMOjByt(){
        this.mojByt = !this.mojByt;
        this.terminy = !this.terminy;
    }

    renderedCallback() {
        this.getBytData();
        this.getEtapyTerminy();
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

    getEtapyTerminy(){
        console.log("etapa flat id: "+this.flatID)
        getEtapyTerminy({byt : this.flatID})
            .then(response => {
                this.etapyData = response;
            })
            .catch(error => {
                console.error(error);
            })
    }

}
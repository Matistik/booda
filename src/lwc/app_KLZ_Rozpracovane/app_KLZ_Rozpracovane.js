/**
 * Created by mgons on 8/11/2022.
 */

import {api, LightningElement, track} from 'lwc';
import getByt from '@salesforce/apex/DashboardController.getByt';
import getKLZRozpracovane from '@salesforce/apex/KLZController.getKLZRozpracovane';

export default class AppKlz extends LightningElement {
    @api flatID;
    @api caseID
    @track bytData;
    @track getRozpracovaneData = [];
    @track cennik = false

    @track mojByt = false;
    @track klz = true;
    @track klzOdoslane = false;
    @track klzRozpracovaneInside = false;

    goToCennik(){
        this.cennik = !this.cennik;
        this.klz = !this.klz;
    }

    goToMojByt(){
        this.mojByt = !this.mojByt;
        this.klz = !this.klz;
    }
    goToOdoslane(){
        this.klz = !this.klz;
        this.klzOdoslane = !this.klzOdoslane;

    }

    goToRozpracovaneInside(event){
        this.klz = !this.klz;
        this.klzRozpracovaneInside = !this.klzRozpracovaneInside;
        this.caseID = event.currentTarget.dataset.id;
    }

    connectedCallback() {
        this.getKLZRozpracovaneData();
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

    getKLZRozpracovaneData() {
        console.log("Case ID Filip:::"+this.flatID);

        getKLZRozpracovane({ caseId: this.flatID })
            .then(response => {
                this.getRozpracovaneData = response;

            })
            .catch(error => {
                console.error(error);
            })
    }


}
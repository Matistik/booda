/**
 * Created by mgons on 8/11/2022.
 */

import {api, LightningElement, track} from 'lwc';
import getByt from '@salesforce/apex/DashboardController.getByt';
import getKLZOdoslane from '@salesforce/apex/KLZController.getKLZOdoslane';

export default class AppKlzOdoslane extends LightningElement {

    @api flatID;
    @api caseID
    @track bytData;
    @track getOdoslaneData = [];

    @track mojByt = false;
    @track klz = false;
    @track klzOdoslane = true;
    @track klzOdoslaneInside = false;

    goToMojByt(){
        this.mojByt = !this.mojByt;
        this.klzOdoslane = !this.klzOdoslane;
    }
    goToRozpracovane(){
        this.klzOdoslane = !this.klzOdoslane;
        this.klz = !this.klz;
    }

    goToOdoslaneInside(event){
        this.klzOdoslaneInside = !this.klzOdoslaneInside
        this.klzOdoslane = !this.klzOdoslane;
        this.caseID = event.currentTarget.dataset.id;

    }

    connectedCallback() {
        this.getKLZOdoslaneData();
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

    getKLZOdoslaneData() {
        console.log("Case ID Filip:::"+this.flatID);

        getKLZOdoslane({ caseId: this.flatID })
            .then(response => {
                this.getOdoslaneData = response;

            })
            .catch(error => {
                console.error(error);
            })
    }


}
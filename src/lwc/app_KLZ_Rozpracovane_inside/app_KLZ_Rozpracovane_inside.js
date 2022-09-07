/**
 * Created by mgons on 8/11/2022.
 */

import {api, LightningElement, track} from 'lwc';
import getConcreteKLZ from '@salesforce/apex/KLZController.getConcreteKLZ';
import getByt from '@salesforce/apex/DashboardController.getByt';
import {ShowToastEvent} from "lightning/platformShowToastEvent";
import updateCaseRecord from '@salesforce/apex/NovaKLZController.updateAppCaseRecord';

export default class AppKlzRozpracovaneInside extends LightningElement {

    @api flatID
    @api caseID
    @track getConcreteData

    @track bytData
    @track klzData
    @track klz = false;
    @track klzRozpracovaneInside = true;
    @track spravy = false

    @track description
    @track IdCase

    goToSpravy(){
        this.klzRozpracovaneInside = !this.klzRozpracovaneInside;
        this.spravy = !this.spravy;
    }

    goToKlzRozpracovane(){
        this.klz = !this.klz;
        this.klzRozpracovaneInside = !this.klzRozpracovaneInside;
    }

    connectedCallback() {
        this.getBytData();
        this.getConcreteKLZ()
    }

    handleUpdateKlz() {
        this.IdCase = this.caseID
        console.log("tototo=>"+ JSON.stringify(this.template.querySelector('lightning-textarea').value) )

        updateCaseRecord({des: this.template.querySelector('lightning-textarea').value, Id: this.IdCase},)
            .then(result => {
                this.getConcreteKLZ()

            })
            .catch(error => {
                console.error(error);
            });
    }

    getBytData() {
        console.log("moje klz id je => "+this.caseID)
        console.log("flatid;;;;"+this.flatID);

        getByt({ bytId: this.flatID })
            .then(response => {
                this.bytData = response;

            })
            .catch(error => {
                console.error(error);
            })
    }

    getConcreteKLZ(){
        getConcreteKLZ({klzID: this.caseID})
            .then(response => {
                this.klzData = response;

            })
            .catch(error => {
                console.log(error);
            })
    }

}
/**
 * Created by mgons on 8/11/2022.
 */

import {api, LightningElement, track} from 'lwc';
import getByt from '@salesforce/apex/DashboardController.getByt';
import getConcreteKLZ from '@salesforce/apex/KLZController.getConcreteKLZ';

export default class AppKlzOdoslaneInside extends LightningElement {

    @api flatID
    @api caseID
    @track klzOdoslaneInside = true
    @track klzOdoslane = false
    @track bytData
    @track klzData
    @track spravy = false

    goToSpravy(){
        this.klzOdoslaneInside = !this.klzOdoslaneInside;
        this.spravy = !this.spravy;
    }

    goToOdoslane(){
        this.klzOdoslaneInside = !this.klzOdoslaneInside
        this.klzOdoslane = !this.klzOdoslane
    }

    renderedCallback() {
        this.getBytData();
        this.getConcreteKLZ()
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
/**
 * Created by matistikoff on 21. 7. 2022.
 */

import {api,track, LightningElement} from 'lwc';
import getKLZ from '@salesforce/apex/KLZController.getKLZ';
import getKLZOdoslane from '@salesforce/apex/KLZController.getKLZOdoslane';
import getKLZRozpracovane from '@salesforce/apex/KLZController.getKLZRozpracovane';
import getConcreteKLZ from '@salesforce/apex/KLZController.getConcreteKLZ';
import getByt from '@salesforce/apex/DashboardController.getByt';

export default class TabNavigationKlzPopLeft extends LightningElement {

    @api flatID;
    @track KLZData;
    @track ConcreteKLZData;
    @api klzID;
    @track bytData;
    @track odoslaneData;




    connectedCallback() {
        this.getKLZ();
        this.getBytData()
    }

    getBytData() {


        getByt({ bytId: this.flatID })
            .then(response => {
                this.bytData = response;

            })
            .catch(error => {
                console.error(error);
            })





    }

    rozpracovanyFilter(){
        this.getKLZRozpracovane();
    }

    odoslanyFilter(){

        this.getKLZOdoslane();

    }


    getKLZ(){

        getKLZ({caseId: this.flatID})
            .then(response => {
                this.KLZData = response;

            })
            .catch(error => {
                console.log(error);
            })
    }

    getKLZOdoslane(){

        console.log('odoslanyClick')

        getKLZOdoslane({caseId: this.flatID})
            .then(response => {
                this.KLZData = response;
            })
            .catch(error => {
                console.log(error);
            })
    }

    getKLZRozpracovane(){

        getKLZRozpracovane({caseId: this.flatID})
            .then(response => {
                this.KLZData = response;
            })
            .catch(error => {
                console.log(error);
            })
    }



    getConcreteKLZ(){

        getConcreteKLZ({klzID: this.klzID})
            .then(response => {
                this.ConcreteKLZData = response;
            })
            .catch(error => {
                console.log(error);
            })
    }

    renderPopRight(event){
        let caseId = event.currentTarget.dataset.id;
        console.log('id v pop LEFT: ' + caseId)
        //this.flatID = caseId;

        let eventToDispatch = new CustomEvent('klz', {
            detail: {
                id: caseId,

            }
        });
        this.dispatchEvent(eventToDispatch)

    }



}
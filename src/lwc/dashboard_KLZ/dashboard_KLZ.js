/**
 * Created by matistikoff on 21. 7. 2022.
 */

import {api, LightningElement, track} from 'lwc';
import getKlientskeZmeny from '@salesforce/apex/DashboardController.getKlientskeZmeny';
import getKLZCount from '@salesforce/apex/KLZController.getKLZCount';
import getKLZCountUzavrete from '@salesforce/apex/KLZController.getKLZCountUzavrete';


export default class DashboardKlz extends LightningElement {

    @track areButtonVisible = false;
    @api flatID;
    @track klientskeZmenyData = true;
    @track countData;
    @track countDataUzavrete;


    renderedCallback() {
        this.getKlientskeZmenyData();
        this.getKLZCount();
        this.getKLZCountUzavrete();
    }
    getKlientskeZmenyData(){
        getKlientskeZmeny({bytId: this.flatID})
            .then(response =>{this.klientskeZmenyData= response;})
            .catch(error => {
                console.error(error);
            })
    }

    handleChange(event) {
        this.areButtonVisible = event.target.checked;
    }

    renderToKLZ(){
        this.dispatchEvent(new CustomEvent('klz'));
    }

    @track openModal = false;

    openpdfModal() {
        this.openModal = true;
    }

    closepdfModal() {
        this.openModal = false;
    }

    getKLZCount(){
        getKLZCount({bytId: this.flatID})
            .then(response =>{this.countData = response;
            })
            .catch(error => {
                console.error(error);
            })

    }

    getKLZCountUzavrete(){
        getKLZCountUzavrete({bytId: this.flatID})
            .then(response =>{this.countDataUzavrete = response;
            })
            .catch(error => {
                console.error(error);
            })

    }

}
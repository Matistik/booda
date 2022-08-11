/**
 * Created by matistikoff on 21. 7. 2022.
 */

import {api, LightningElement, track} from 'lwc';
import getMainContact from '@salesforce/apex/DashboardController.getMainContact'
import getContacts from '@salesforce/apex/DashboardController.getContacts'

export default class DashboardKontakty extends LightningElement {

    @api flatID;

    @track openModal = false;
    @track openxModal = false;

    @track openieModal = false;
    @track mainContactData;
    @track flatContactsData = [];

    renderedCallback() {
        this.getMainContact();
        this.getContacts()
    }

    getMainContact(){
        console.log("flatid+++ "+this.flatID);

        getMainContact({bytId: this.flatID})
            .then(response => {

                this.mainContactData = response;
            })
            .catch(error => {
                console.error(error);
            })
    }

    getContacts(){
        console.log("flatid+++ "+this.flatID);
        getContacts({bytId: this.flatID})
            .then(response => {

                if (response.Name === undefined){return}
                this.flatContactsData = response;
            })
            .catch(error => {
                console.error(error);
            })
    }


    openNKModal() {
        this.openModal = true;
    }

    closeNKModal() {
        this.openModal = false;
    }

    openIEModal() {
        this.openieModal = true;
    }

    closeIEModal() {
        this.openieModal = false;
    }
    openNModal() {
        this.openxModal = true;
    }

    closeNModal() {
        this.openxModal = false;
    }

}
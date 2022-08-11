/**
 * Created by matistikoff on 21. 7. 2022.
 */

import {api, LightningElement, track, wire} from 'lwc';
import getKLZ from '@salesforce/apex/KLZController.getKLZ';

export default class TabNavigationKomunikacia extends LightningElement {

    @api flatID;

    @track openModal = false;
    @track caseCommentsData = [];
    @track caseData = [];

    connectedCallback() {
        this.getKLZ();
    }
    getKLZ(){
        getKLZ({caseId : this.flatID})

            .then(response => {
                console.log("ID bytu::: " +this.flatID)
                this.caseData = response;
            })
            .catch(error => {
                console.log(error);
            })
    }

    renderComments(event){
        let caseId = event.currentTarget.dataset.id;

        //this.flatID = caseId;

        let eventToDispatch = new CustomEvent('klz', {
            detail: {
                id: caseId,

            }
        });
        this.dispatchEvent(eventToDispatch)

    }


    openpvModal() {
        this.openModal = true;
    }

    closepvModal() {
        this.openModal = false;
    }
}
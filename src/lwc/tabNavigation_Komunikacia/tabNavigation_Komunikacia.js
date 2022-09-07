/**
 * Created by matistikoff on 21. 7. 2022.
 */

import {api, LightningElement, track, wire} from 'lwc';
import getKLZforComm from '@salesforce/apex/KLZController.getKLZforComm';
import saveCountClient from '@salesforce/apex/NovyCommentController.saveCommentCountClient';
import getVlakna from '@salesforce/apex/KomunikaciaController.getVlakna';
import saveMenezerSeenDateVlakno from '@salesforce/apex/NovyCommentController.saveMenezerSeenDateVlakno';


export default class TabNavigationKomunikacia extends LightningElement {

    @api flatID;
    @track caseID;
    @track vlaknoID;
    @track caseData = [];
    @track vlaknaData = [];
    @track bytName;
    @track count = 0;
    @track date = new Date();
    @track vlaknoDate;
    @track openVlakno = false;


    connectedCallback() {
        this.getKLZforComm();
        this.getVlakna();
    }


    @api getKLZforComm() {
        getKLZforComm({caseId: this.flatID})

            .then(response => {
                this.caseData = response;
            })
            .catch(error => {
                console.log(error);
            })
    }

    getVlakna() {
        getVlakna({flatId: this.flatID})
            .then(response => {
                this.vlaknaData = response;
            })
            .catch(error => {
                console.log(error);
            })
    }

    renderComments(event) {
        let caseId = event.currentTarget.dataset.id;
        this.caseID = caseId;
        let eventToDispatch = new CustomEvent('klz', {
            detail: {
                id: caseId,
            }
        });
        this.dispatchEvent(eventToDispatch)
        this.count = null;
        this.date = new Date().toJSON()
        saveCountClient({objCount: null, CaseId: this.caseID, objDate: this.date})
            .then(result => {
                this.count = {};
                this.getKLZforComm();
            })
            .catch(error => {
                this.error = error.message;
            });
    }

    renderVlaknaComments(event) {
        let vlaknoId = event.currentTarget.dataset.id;
        this.vlaknoID = vlaknoId;
        console.log("vlaknoId = " + this.vlaknoID)
        let eventToDispatch = new CustomEvent('vlakno', {
            detail: {
                id: vlaknoId,
            }
        });
        this.dispatchEvent(eventToDispatch)
        this.vlaknoDate = new Date().toJSON()
        saveMenezerSeenDateVlakno({objCount: null, komentId: this.vlaknoID, objDate: this.vlaknoDate})
            .then(result => {
                // this.count = {};
                this.getVlakna();
            })
            .catch(error => {
                this.error = error.message;
            });
    }

    openVlaknoModal() {
        this.openVlakno = true
    }

    closeVlaknoModal() {
        this.openVlakno = false;
        this.getVlakna(this.flatID);
    }
}
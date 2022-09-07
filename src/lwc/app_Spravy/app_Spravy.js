/**
 * Created by mgons on 8/11/2022.
 */

import {api, LightningElement, track} from 'lwc';
import getByt from '@salesforce/apex/DashboardController.getByt';
import getKLZforComm from '@salesforce/apex/KLZController.getKLZforComm';
import saveCount from '@salesforce/apex/NovyCommentController.saveCommentCount';
import getVlaknaApp from '@salesforce/apex/KomunikaciaController.getVlakna';
import saveClientSeenDateVlakno from '@salesforce/apex/NovyCommentController.saveClientSeenDateVlakno';

export default class AppSpravy extends LightningElement {
    @api flatID;
    @api caseID;
    @api vlaknoID;
    @track bytData;
    @track casesData = [];
    @track vlaknaDataApp = []
    @track count = 0;
    @track date;
    @track vlaknoDate;
    @track openVlakno = false;
    @track mojByt = false;
    @track spravy = true;
    @track concSprava = false;

    goToMojByt() {
        this.mojByt = !this.mojByt;
        this.spravy = !this.spravy;
    }

    connectedCallback() {
        this.getBytData();
        this.getKLZforComm();
        this.getVlaknaApp();
    }

    getBytData() {
        getByt({bytId: this.flatID})
            .then(response => {
                this.bytData = response;

            })
            .catch(error => {
                console.error(error);
            })
    }

    getKLZforComm() {
        getKLZforComm({caseId: this.flatID})

            .then(response => {
                this.casesData = response;
            })
            .catch(error => {
                console.log(error);
            })
    }

    getVlaknaApp(){
        getVlaknaApp({flatId: this.flatID})
            .then(response =>{
                this.vlaknaDataApp = response;
            })
            .catch(error =>{
                console.log(error);
            })
    }

    goToKonkretnaSprava(event) {
        this.spravy = !this.spravy;
        this.concSprava = !this.concSprava;
        this.caseID = event.currentTarget.dataset.id;
        this.count = null;
        this.date = new Date().toJSON();
        saveCount({objCount: null, caseId: this.caseID, objDate: this.date})
            .then(result => {
                this.count = {};
            })
            .catch(error => {
                this.error = error.message;
            });
    }
    goToVlakno(event){
        this.spravy = !this.spravy;
        this.concSprava = !this.concSprava;
        this.vlaknoID = event.currentTarget.dataset.id;
        this.vlaknoDate = new Date().toJSON();
        saveClientSeenDateVlakno({objCount: null, komentId: this.vlaknoID, objDate: this.vlaknoDate})
            .then(result => {
                // this.count = {};
            })
            .catch(error => {
                this.error = error.message;
            });
    }

    openVlaknoModalApp(){
        this.openVlakno= true
    }
    closeVlaknoModalApp(){
        this.openVlakno = false;
        this.getVlaknaApp(this.flatID)
    }

}
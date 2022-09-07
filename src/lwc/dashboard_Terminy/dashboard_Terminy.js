/**
 * Created by matistikoff on 21. 7. 2022.
 */

import {api, LightningElement, track} from 'lwc';
import getTerminy from '@salesforce/apex/DashboardController.getTerminy'
import getEtapy from '@salesforce/apex/DashboardController.getEtapy'
import updateTerminy from '@salesforce/apex/DashboardUpdate.updateTerminy'

export default class DashboardTerminy extends LightningElement {

    @api flatID;
    @track terminyData = true;
    @track etapyData
    @track dp
    @track pz
    @track zv
    @track dn
    @track tz
    @track us

    renderedCallback() {
        this.getTerminyData();
        this.getEtapyData();
    }

    getTerminyData(){
        //console.log('Byt ku kontaktu : '+this.flatID);
        getTerminy({bytId: this.flatID})
            .then(response =>{this.terminyData= response;})

            .catch(error => {
                console.error(error);
            })
    }

    getEtapyData(){
        console.log("etpdatta: "+JSON.stringify(this.etapyData))
        getEtapy({bytId: this.flatID})
            .then(response => {
                this.etapyData = response
            })
            .catch(error => {
                console.error(error);
            })
    }

    updateTerminy(){

        this.dp = this.template.querySelector('.date1').value
        this.pz = this.template.querySelector('.date2').value
        this.zv = this.template.querySelector('.date3').value
        this.dn = this.template.querySelector('.date4').value
        this.tz = this.template.querySelector('.date5').value
        this.us = this.template.querySelector('.date6').value

        updateTerminy({id: this.flatID, dp: this.dp, pz: this.pz, zv: this.zv, dn: this.dn, tz: this.tz, us: this.us}, )
            .then(result => {
                // Clear the user enter values
                this.dp = {};
                this.pz = {}
                this.zv = {}
                this.dn = {}
                this.tz = {}
                this.us = {}

            })
            .catch(error => {
                this.error = error.message;
            });
    }


}
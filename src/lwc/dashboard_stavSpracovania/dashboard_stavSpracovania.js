/**
 * Created by matistikoff on 21. 7. 2022.
 */

import {api, LightningElement, track} from 'lwc';
import {updateRecord} from "lightning/uiRecordApi";
import getStavy from '@salesforce/apex/StavSpracovaniaController.getStavy'

export default class DashboardStavSpracovania extends LightningElement {

    styleDisp1 = "red";
    styleDisp2 = `default`;
    styleDisp3 = `default`;


    @api recordId = 'a027R00000tHnXc';
    @track stavSpracovania = true;
    @track dvere;
    @api flatID;
    @track stavyData;
    @track clicked = false;

    connectedCallback() {

        console.log('flatID' + this.flatID)

        getStavy({flatID: this.flatID})
            .then(response => {
                this.stavyData = response;
                console.log('stav ' + JSON.stringify(this.stavyData))
            })
            .catch(error => {
                console.error(error);
            })
    }



    changeStyleDisp1(event){

        this.styleDisp1 = "red"
        this.styleDisp2="default"
        this.styleDisp3="default"

        //let stavID = event.currentTarget.dataset.id;
        //const theDiv = this.template.querySelector('[data-id="' +stavID+ '"]');
        //theDiv.style.backgroundColor = "#FFFFFF";

    }
    changeStyleDisp2(event){

        this.styleDisp1 = "orange"
        this.styleDisp2="orange"
        this.styleDisp3="default"
    }
    changeStyleDisp3(){
        this.styleDisp1="green"
        this.styleDisp2="green"
        this.styleDisp3="green"

    }


    /* handleLoad() {
            getDvere()
                .then(result => {
                    this.stavSpracovania = result;

                    console.log('dvere::: ' + this.stavSpracovania.Dvere__c);


                })
                .catch(error => {
                    this.error = error;
                });
        }*/

    /*updateField(parameter1) {
        this.dvere = parameter1;
        const fields = {};

        fields[ID_FIELD.fieldApiName] = this.recordId;
        fields[DVERE_FIELD.fieldApiName] = parameter1;

        const recordInput = {
            fields: fields
        };

        updateRecord(recordInput).then((record) => {
            console.log(record);
        });
    }*/

}
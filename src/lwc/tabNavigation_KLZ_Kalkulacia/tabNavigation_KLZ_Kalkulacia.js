/**
 * Created by matistikoff on 21. 7. 2022.
 */

import {api, LightningElement, track} from 'lwc';
import saveKalkulacia  from '@salesforce/apex/NovaKalkulaciaController.saveKalkulaciaRecord';
import Nazov_Field from '@salesforce/schema/Kalkulacia__c.Name';
import Cena_Field from '@salesforce/schema/Kalkulacia__c.Cena__c';
import Stav_Field from '@salesforce/schema/Kalkulacia__c.Stav__c';
import {ShowToastEvent} from "lightning/platformShowToastEvent";

export default class TabNavigationKlzKalkulacia extends LightningElement {

    @api flatID;
    @track error;
    @api klzID;
    @track value;

    @track kalkulaciaRecord = {
        Name : Nazov_Field,
        Cena__c : Cena_Field,
        Stav__c: Stav_Field
    };

    get options() {
        return [
            { label: 'Naceniť', value: 'Naceniť' },
            { label: 'Nacenené', value: 'Nacenené' },
            { label: 'Neschválené', value: 'Neschválené' },
            { label: 'Schválené', value: 'Schválené' },

        ];
    }
    handleStavChange(event) {
        //ked sa change tak nech sa aj savne (mozno)

        this.kalkulaciaRecord.Stav__c = event.detail.value;
    }

    handleNameChange(event){
        this.kalkulaciaRecord.Name = event.target.value;
        window.console.log('Nazov ==> '+this.kalkulaciaRecord.Name);
    }

    handleCenaChange(event){
        this.kalkulaciaRecord.Cena__c = event.target.value;
        window.console.log('Cena ==> '+this.kalkulaciaRecord.Cena__c);
    }


    handleSaveKal() {
        console.log("byt kalkulacia "+this.flatID)
        saveKalkulacia({objKal: this.kalkulaciaRecord, klzmena: this.klzID}, )
            .then(result => {
                // Clear the user enter values
                this.kalkulaciaRecord = {};

                window.console.log('result ===> '+result);
                // Show success messsage
                this.dispatchEvent(new ShowToastEvent({
                    title: 'Success!!',
                    message: 'Cena Created Successfully!!',
                    variant: 'success'
                }),);
            })
            .catch(error => {
                this.error = error.message;
            });

        this.dispatchEvent(new CustomEvent('close'));
        this.dispatchEvent(new CustomEvent('renderkalkulacia'));
        //this.dispatchEvent(new CustomEvent('rerender'));
    }




}
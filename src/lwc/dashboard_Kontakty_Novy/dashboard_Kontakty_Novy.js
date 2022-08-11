/**
 * Created by matistikoff on 21. 7. 2022.
 */

import {api, track, LightningElement} from 'lwc';
import saveAccount  from '@salesforce/apex/NovyKontaktController.saveAccountRecord';

import {ShowToastEvent} from 'lightning/platformShowToastEvent';

import PersonTitle_FIELD from '@salesforce/schema/Account.PersonTitle';
import FirstName_FIELD from '@salesforce/schema/Account.FirstName';
import LastName_FIELD from '@salesforce/schema/Account.LastName';
import Phone_FIELD from '@salesforce/schema/Account.Phone';
import Person_Email_FIELD from '@salesforce/schema/Account.PersonEmail';

export default class DashboardKontaktyNovy extends LightningElement {

    @api flatID;
    @track error;



    // this object have record information
    @track accRecord = {
        Title : PersonTitle_FIELD,
        FirstName : FirstName_FIELD,
        LastName : LastName_FIELD,
        Phone : Phone_FIELD,
        Email : Person_Email_FIELD

    };

    handleTitleChange(event) {
        this.accRecord.Title = event.target.value;
        console.log("novy kontakt flatid "+this.flatID);
        window.console.log('Title ==> '+this.accRecord.Title);
    }

    handleFirstNameChange(event) {
        this.accRecord.FirstName = event.target.value;
        window.console.log('FirstName ==> '+this.accRecord.FirstName);
    }

    handleLastNameChange(event) {
        this.accRecord.LastName = event.target.value;
        window.console.log('LastName ==> '+this.accRecord.LastName);
    }

    handlePhoneChange(event) {
        this.accRecord.Phone = event.target.value;
        window.console.log('Phone ==> '+this.accRecord.Phone);
    }

    handleEmailChange(event) {
        this.accRecord.Email = event.target.value;
        window.console.log('Email ==> '+this.accRecord.Email);
    }



    handleSave() {
        saveAccount({objAcc: this.accRecord, bytId: this.flatID}, )
            .then(result => {
                // Clear the user enter values
                this.accRecord = {};

                window.console.log('result ===> '+result);
                // Show success messsage
                this.dispatchEvent(new ShowToastEvent({
                    title: 'Success!!',
                    message: 'Account Created Successfully!!',
                    variant: 'success'
                }),);
            })
            .catch(error => {
                this.error = error.message;
            });
        this.dispatchEvent(new CustomEvent('closekontakt'));
    }

}
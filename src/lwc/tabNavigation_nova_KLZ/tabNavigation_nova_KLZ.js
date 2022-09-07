/**
 * Created by juraj on 01/08/2022.
 */

import {api, LightningElement, track} from 'lwc';
import saveCase  from '@salesforce/apex/NovaKLZController.saveCaseRecord';
import Description_Field from '@salesforce/schema/Case.Description';
import Subject_Field from '@salesforce/schema/Case.Subject';

import ShowToastEvent from 'lightning/platformShowToastEvent';

export default class TabNavigationNovaKlz extends LightningElement {

    @api flatID;
    @track error;

    @track caseRecord = {
        Description : Description_Field,
        Subject : Subject_Field
    };

    handleDescriptionChange(event){
        this.caseRecord.Description = event.target.value;
        window.console.log('Description ==> '+this.caseRecord.Description);
    }

    handleSubjectChange(event){
        this.caseRecord.Subject = event.target.value;
        window.console.log('Subject ==> '+this.caseRecord.Subject);
    }

    handleSave() {
        saveCase({objCas: this.caseRecord, bytId: this.flatID}, )
            .then(result => {
                // Clear the user enter values
                this.caseRecord = {};
                this.dispatchEvent(new CustomEvent('close'));
                window.console.log('result ===> '+result);
                // Show success messsage
                this.dispatchEvent(new ShowToastEvent({
                    title: 'Success!!',
                    message: 'Case Created Successfully!!',
                    variant: 'success'
                }),);
            })
            .catch(error => {
                this.error = error.message;
            });

        this.dispatchEvent(new CustomEvent('render'));


    }


}
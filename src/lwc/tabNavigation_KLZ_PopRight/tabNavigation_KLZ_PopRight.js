/**
 * Created by matistikoff on 21. 7. 2022.
 */

import {api, LightningElement, track} from 'lwc';
import getConcreteKLZ from '@salesforce/apex/KLZController.getConcreteKLZ';
import getKalkulacia from '@salesforce/apex/KalkulaciaController.getKalkulacia';
import getSumaKalkulacia from '@salesforce/apex/KalkulaciaController.getSumaKalkulacia';
import CaseStatus_Field from '@salesforce/schema/Case.Status';
import Description_Field from '@salesforce/schema/Case.Description';
import Subject_Field from '@salesforce/schema/Case.Subject';
import Id_Field from '@salesforce/schema/Case.Id';

import updateCaseRecord from '@salesforce/apex/NovaKLZController.updateCaseRecord';
import {ShowToastEvent} from "lightning/platformShowToastEvent";



export default class TabNavigationKlzPopRight extends LightningElement {

    @api flatID;
    @api klzID;
    @track ConcreteKLZData;
    @track sumaKalkulacia;

    @track value;
    @track kalkulaciaData;
    @track openModal = false;

    @track klzRecord = {
        Status : CaseStatus_Field,
        Id : Id_Field,
        Description : Description_Field,
        Subject : Subject_Field
    };

    openKalModal() {
        this.openModal = true;
    }

    closeKalModal() {
        this.openModal = false;
    }




    connectedCallback() {
        this.getConcreteKLZInit();
    }




    get options() {
        return [
            { label: 'Rozpracovaná', value: 'new' },
            { label: 'Zadaná klientom', value: 'inProgress' },
            { label: 'Nacenená', value: 'finished' },
            { label: 'Odsúhlasená klientom', value: 'odsuhlasenaKlientom' },
            { label: 'Zamietnutá stavbou', value: 'odsuhlasenaStavbou' },
            { label: 'Zamietnutá klientom', value: 'zamietnutaKlientom' },
            { label: 'Odovzdané k realizácii', value: 'realizacia' },
        ];
    }




     getConcreteKLZInit(){



        getConcreteKLZ({klzID: this.klzID})
            .then(response => {
                this.ConcreteKLZData = response;
                this.value = this.ConcreteKLZData.Status
                console.log('conn')

            })
            .catch(error => {
                console.log(error);
            })
    }

    @api getConcreteKLZ(ahoj){

        this.klzID = ahoj
        getConcreteKLZ({klzID: this.klzID})
            .then(response => {
                this.ConcreteKLZData = response;
                this.value = this.ConcreteKLZData.Status


            })
            .catch(error => {
                console.log(error);
            })
    }

    renderedCallback() {
        this.getKalkulacia();
        this.getSumKalkulacia();
    }


    getKalkulacia(){
        getKalkulacia({zmena: this.klzID})
            .then(response => {
                this.kalkulaciaData = response;

            })
            .catch(error => {
                console.error(error);
            })
    }

    getSumKalkulacia(){
        getSumaKalkulacia({zmena: this.klzID})
            .then(response => {
                this.sumaKalkulacia = response;

            })
            .catch(error => {
                console.error(error);
            })
    }

    handleeChange(event) {
        //ked sa change tak nech sa aj savne (mozno)
        this.value = event.detail.value;
        this.klzRecord.Status = event.detail.value;
        this.klzRecord.Id = this.klzID;
    }
    handleeDescriptionChange(event) {
        //ked sa change tak nech sa aj savne (mozno)
        this.klzRecord.Description = event.target.value;
        window.console.log('Description ==> '+this.klzRecord.Description);
        this.klzRecord.Id = this.klzID;
    }
    handleeSubjectChange(event) {
        //ked sa change tak nech sa aj savne (mozno)
        this.klzRecord.Subject = event.target.value;
        window.console.log('Subject ==> '+this.klzRecord.Subject);
        this.klzRecord.Id = this.klzID;
    }


    handleUpdateKlz() {
        console.log('nastal update')
        updateCaseRecord({objCase: this.klzRecord},)
            .then(result => {
                this.klzRecord.Status = this.template.querySelector("lightning-combobox");
                this.klzRecord.Description = this.template.querySelector(".poznamky-od1");
                this.klzRecord.Subject = this.template.querySelector(".poznamky-od3");

                {}

                this.dispatchEvent(new ShowToastEvent({
                    title: 'Success!!',
                    message: 'Case Updated Successfully!!',
                    variant: 'success'
                }),);
            })
            .catch(error => {
                console.error(error);
            });
    }

}
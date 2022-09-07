/**
 * Created by matistikoff on 21. 7. 2022.
 */

import {api, LightningElement, track, wire} from 'lwc';
import getKlientskeZmeny from '@salesforce/apex/DashboardController.getKlientskeZmeny';
import getByt from '@salesforce/apex/DashboardController.getByt';
import updateKLZByt from '@salesforce/apex/DashboardUpdate.updateKLZByt';
import getKLZCount from '@salesforce/apex/KLZController.getKLZCount';
import getKLZCountUzavrete from '@salesforce/apex/KLZController.getKLZCountUzavrete';
import getNhNadRamec from '@salesforce/apex/DashboardUpdate.getNhNadRamec';
import { fireEvent } from 'c/pubsub';
import { CurrentPageReference } from 'lightning/navigation';
import setFlatIdForPdf from '@salesforce/apex/PdfController.setFlatIdForPdf';
import updatePredcasneZatvoreneKLZ from '@salesforce/apex/DashboardUpdate.updatePredcasneZatvoreneKLZ';


export default class DashboardKlz extends LightningElement {

    @api areButtonVisible = false;
    @api flatID;
    @track klientskeZmenyData = true;
    @track countData;
    @track countDataUzavrete;
    @track bytData
    @track typBalika
    @track vycerpane
    @track n
    @track v
    @track nadRamec
    @track butt






    connectedCallback() {
        this.getKlientskeZmenyData();
        this.getKLZCount();
        this.getKLZCountUzavrete();
        this.getByt()
       // this.handleNhNadRamec()

    }
    getKlientskeZmenyData(){
        getKlientskeZmeny({bytId: this.flatID})
            .then(response =>{this.klientskeZmenyData= response;})
            .catch(error => {
                console.error(error);
            })
    }

    get options() {
        return [
            { label: 'Holobyt', value: 'Holobyt' },
            { label: 'Malé zmeny', value: 'Malé zmeny' },
            { label: 'Veľké zmeny', value: 'Veľké zmeny' },
        ];
    }

    getByt(){

        getByt({bytId: this.flatID})
            .then(response =>{this.bytData= response;})
            .catch(error => {
                console.error(error);
            })
    }

    handleChange(event) {
        this.areButtonVisible = this.template.querySelector('.form-control').checked;

        console.log("something "+this.areButtonVisible)
        updatePredcasneZatvoreneKLZ({predcasneZatvorene: this.areButtonVisible, id: this.flatID},)
            .then(result => {
                this.getByt();
                console.log("sent" + result)
                // Clear the user enter values


            })
            .catch(error => {
                this.error = error.message;
                console.log("wasntsent" + error)
            });
       
    }

    renderToKLZ(){
        this.dispatchEvent(new CustomEvent('klz'));
    }

    @track openModal = false;

    openpdfModal() {
        this.openModal = true;
        this.generateFlatIdForPdf();
    }

    closepdfModal() {
        this.openModal = false;
    }

    getKLZCount(){
        getKLZCount({bytId: this.flatID})
            .then(response =>{this.countData = response;
            })
            .catch(error => {
                console.error(error);
            })

    }

    getKLZCountUzavrete(){
        getKLZCountUzavrete({bytId: this.flatID})
            .then(response =>{this.countDataUzavrete = response;
            })
            .catch(error => {
                console.error(error);
            })

    }

    updateKLZByt(){
        console.log("klzbyt update: "+this.template.querySelector('.area4').value)
        this.typBalika = this.template.querySelector('.area1').value
        this.vycerpane = this.template.querySelector('.area4').value

        updateKLZByt({id: this.flatID, balik: this.typBalika, vycerpane: this.vycerpane})
            .then(result => {
                this.getKlientskeZmenyData();
                this.getKLZCount();
                this.getKLZCountUzavrete();
                this.getByt()
            })
            .catch(error => {
                this.error = error.message;
            });
    }
    generateFlatIdForPdf(){
        setFlatIdForPdf({flatID: this.flatID})
            .then(response => {console.log(response)})
            .catch(error => {console.log(error)})



    }

}
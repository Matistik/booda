/**
 * Created by matistikoff on 21. 7. 2022.
 */

import {api, LightningElement, track} from 'lwc';
import getKLZ from '@salesforce/apex/KLZController.getKLZ';
import getByt from '@salesforce/apex/DashboardController.getByt';
import deleteKlz from '@salesforce/apex/NovaKLZController.deleteKlz';
import setFlatIdForPdf from '@salesforce/apex/PdfController.setFlatIdForPdf';

export default class TabNavigationKlz extends LightningElement {

    @api flatID;
    @track KLZData = [];
    @track openModal = false;
    @track klzID;
    @track bytData
    @track openModalPdf=false;
    vfRoot = "https://redprxportal--dev1red--c.sandbox.vf.force.com/apex/Pin";

    handleClick() {
        var vfWindow = this.template.querySelector("iframe").contentWindow;
        vfWindow.postMessage('ahoj', this.vfRoot);
    }

    getByt(){
        console.log("id bytu na klz je: "+this.flatID)
        getByt({bytId: this.flatID})
            .then(response =>{this.bytData= response;})
            .catch(error => {
                console.error(error);
            })
    }

    renderToKlzWrapper(event){
        let caseId = event.currentTarget.dataset.id;
        this.flatID = caseId;
        console.log("klzID jurko " + caseId)

        let eventToDispatch = new CustomEvent('newklz', {
            detail: {
                id: caseId,

            }
        });
        this.dispatchEvent(eventToDispatch)

    }

    connectedCallback() {
        this.getKLZ();
        this.getByt()
    }

    getKLZ(){
        console.log("ID "+this.flatID);
        getKLZ({caseId: this.flatID})
            .then(response => {
                this.KLZData = response;
            })
            .catch(error => {
                console.log(error);
            })
    }

    openNZModal() {
        this.openModal = true;
    }

    closeNZModal() {
        this.openModal = false;
        this.getKLZ();
        this.getByt()
    }

    deleteKlz(event){
        this.klzID = event.currentTarget.dataset.id

        deleteKlz({Id: this.klzID})
            .then(result => {
                this.getKLZ();
                this.getByt()
            })
            .catch(error => {
                console.error(error);
            });

    }
    openpdfModal() {
        this.openModalPdf=true;
        this.generateFlatIdForPdf();
    }

    closepdfModal() {
        this.openModalPdf = false;

    }
    generateFlatIdForPdf(){
        setFlatIdForPdf({flatID: this.flatID})
            .then(response => {console.log(response)})
            .catch(error => {console.log(error)})



    }



}
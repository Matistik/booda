import {api, LightningElement, track, wire} from 'lwc';
import getLineItem from '@salesforce/apex/StandardyController.getLineItems';
import getJednotlivePrvky from '@salesforce/apex/StandardyController.getJednotlivePrvky';
import setFlatIdForPdf from '@salesforce/apex/PdfController.setFlatIdForPdf';

export default class TabNavigationStandardPrvky extends LightningElement {

    @api flatID;
    @track StandardyData = [];

    @track renderPrvky = true;
    @track renderDruhy = false;
    button2 = "blue"
    button1 = "gray"

    renderedCallback() {
        this.getLineItem();
    }
    getLineItem(){
        getJednotlivePrvky({flatID: this.flatID})
            .then(response => {
                this.StandardyData = response;
        })
            .catch(error => {
                console.log(error);
            })
    }


    goTo(){
        this.flatID;
        this.renderPrvky = !this.renderPrvky;
        this.renderDruhy = !this.renderDruhy;
    }
    generateFlatIdForPdf(){
        setFlatIdForPdf({flatID: this.flatID})
            .then(response => {console.log(response)})
            .catch(error => {console.log(error)})


    }
    @track openModal = false;

    openpdfModal() {
        this.openModal=true;
        this.generateFlatIdForPdf();
    }

    closepdfModal() {
        this.openModal = false;

    }

}
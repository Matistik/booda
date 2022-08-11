/**
 * Created by mgons on 8/2/2022.
 */

import { LightningElement, wire } from 'lwc';
import { loadScript } from 'lightning/platformResourceLoader';
import downloadjs from '@salesforce/resourceUrl/downloadjs';
import downloadPDF from '@salesforce/apex/PrintJobPDFController.getPdfFileAsBase64String';

export default class PrintJobsContainer extends LightningElement {
    boolShowSpinner = false;
    pdfString;
    generatePdf(){
        this.boolShowSpinner = true;
        downloadPDF({}).then(response => {
            console.log(response);
            this.boolShowSpinner = false;
            var strFile = "data:application/pdf;base64,"+response;
            window.download1(strFile, "sample.pdf", "application/pdf");

        });
    }
    renderedCallback() {
        loadScript(this, downloadjs)
            .then(() => console.log('Loaded downloadjs.js'))
            .catch(error => console.log(error));
    }
}
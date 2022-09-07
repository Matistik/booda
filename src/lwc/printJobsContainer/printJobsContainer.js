/**
 * Created by mgons on 8/2/2022.
 */

import {api, LightningElement, wire} from 'lwc';
import { loadScript } from 'lightning/platformResourceLoader';
import downloadjs from '@salesforce/resourceUrl/downloadjs';
import downloadPDF from '@salesforce/apex/PrintJobPDFController.getPdfFileAsBase64String';
import {NavigationMixin} from "lightning/navigation";

export default class PrintJobsContainer extends NavigationMixin (LightningElement) {
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

    @api recordId;
    actionToVFNav() {
        this[NavigationMixin.GenerateUrl]({
            type: 'standard__webPage',
            attributes: {
                url: 'apex/PdfKlzPage'
            }
        }).then(generatedUrl => {
            window.open(generatedUrl);
            console.log(generatedUrl);
        });
    }
    handleNavigate() {
        const config = {
            type: 'standard__webPage',
            attributes: {
                url: 'http://salesforcecasts.com'
            }
        };
        this[NavigationMixin.Navigate](config);
    }
}
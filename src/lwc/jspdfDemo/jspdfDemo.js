/**
 * Created by gerry on 2/23/2021.
 */

import {LightningElement, track} from 'lwc';
import {loadScript} from "lightning/platformResourceLoader";
import JSPDF from '@salesforce/resourceUrl/jspdf2';
import getContacts from '@salesforce/apex/PdfGenerator.getContactsController';

export default class JspdfDemo extends LightningElement {
    @track contactList = [];
    headers = this.createHeaders([
        "Id",
        "FirstName",
        "LastName"
     ]);

    renderedCallback() {
        Promise.all([
            loadScript(this, JSPDF)
        ]);
    }

    generatePdf(){
        console.log('generatePDF')
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF({
        });

        doc.text("Hi This Is a Test", 20, 20);
        doc.table(30, 30, this.contactList, this.headers, { autosize:true });
        console.log('chcel som to stiahnut')
        console.log(JSON.stringify(this.contactList))
        console.log(JSON.stringify(this.headers))
        doc.save("demo.pdf");
    }

    generateData(){
        console.log('generateData')
        getContacts().then(result=>{
            this.contactList = result;
            this.generatePdf();
        });
    }

    createHeaders(keys) {
        console.log('headers')
        let result = [];
        for (let i = 0; i < keys.length; i += 1) {
            result.push({
                id: keys[i],
                name: keys[i],
                prompt: keys[i],
                width: 65,
                align: "center",
                padding: 0
            });
        }
        return result;
    }

}
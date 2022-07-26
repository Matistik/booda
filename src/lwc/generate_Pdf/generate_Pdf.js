/**
 * Created by mgons on 7/28/2022.
 */

import {LightningElement} from 'lwc';
import {loadScript} from "lightning/platformResourceLoader";
import JSPDF from '@salesforce/resourceUrl/jspdf2';
import getContacts from '@salesforce/apex/PdfGenerator.getContactsController';
window.jsPDF = window.jspdf.jsPDF;
export default class generate_Pdf extends LightningElement {
    contactList = [];
    headers = this.createHeaders([
        "Id",
        "FirstName",
        "LastName"
    ]);

    renderedCallback() {
        Promise.all([
            loadScript(this, jspdf+'/jspdf/jspdf.umd.min.js'),
        ]);
    }

    generatePdf(){
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF({
            encryption: {
                userPassword: "user",
                ownerPassword: "owner",
                userPermissions: ["print", "modify", "copy", "annot-forms"]
                // try changing the user permissions granted
            }
        });

        doc.text("Hi I'm Matt", 20, 20);
        doc.table(30, 30, this.contactList, this.headers, { autosize:true });
        doc.save("demo.pdf");
    }

    generateData(){
        getContacts().then(result=>{
            this.contactList = result;
            this.generatePdf();
        });
    }

    createHeaders(keys) {
        var result = [];
        for (var i = 0; i < keys.length; i += 1) {
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
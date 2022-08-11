/**
 * Created by matistikoff on 21. 7. 2022.
 */

import {api, LightningElement, track } from "lwc";
import sendEmailController from "@salesforce/apex/EmailClass.sendEmailController";
import getMainContact from '@salesforce/apex/DashboardController.getMainContact'

export default class EmailLwc extends LightningElement {
    @api flatID;
    toAddress = [];
    ccAddress = [];
    subject = "Váš nový byt v aplikácii";
    body = "Dobrý deň p. MENO <br> <br>" +
        "Vážime si, že ste sa rozhodli kúpiť byt práve v našom projekte Nová Vajnorská <br> <br>" +
    "Naším cieľom je odovzdat Váš byt tak, aby do maximálnej možnej miery spĺňal aj Vaše špecifické požiadavky. <br> <br>" +
    "Preto sme pre Vás pipravili tento link, kde nájdete všetky aktuálne informácie o Vašom byte: <br> <br>" +
    "LINK <br> <br>" +
    "Cez tento link si môžete vybrať zo štandarov, ktoré sú  v cene Vášho bytu a tiež zaznačiť všetky dodatočné zmeny " +
        "a nadštandartné požiadavky, ktoré by ste radi zapracovali ešte pred odovzdaním bytu do vášho užívania." +
        "Tieto požiadavky budú automaticky zaznamenané a následne spracované. Na uvedenom linku nájdete všetky" +
        "potrebné pôdorysy do ktorých viete zaznamenať Vaše prípadné požiadavky, ako aj dodatočné kalkulácie, ktorí Vám" +
        "následne pripravíme a ktoré budú vyplývať z Vašich nadštandartných požiadavok. <br> <br>" +
    "V prípade, akýchkoľvek dotazov je Vám k dispozícii náš manažér klientských zmien: <br> <br> " +
    "Ing. Meno Manažéra <br>" +
    "mobil: ";
    @track files = [];

    wantToUploadFile = false;
    noEmailError = false;
    invalidEmails = false;

    // renderedCallback() {
    //     this.getMainContact();
    // }

    // getMainContact(){
    //     console.log("kontakt pre email "+this.flatID);
    //     getMainContact({bytId: this.flatID})
    //         .then(response => {
    //             this.toAddress = response;
    //         })
    //         .catch(error => {
    //             console.error(error);
    //         })
    // }

    toggleFileUpload() {
        this.wantToUploadFile = !this.wantToUploadFile;
    }

    handleUploadFinished(event) {
        const uploadedFiles = event.detail.files;
        this.files = [...this.files, ...uploadedFiles];
        this.wantToUploadFile = false;
    }

    handleRemove(event) {
        const index = event.target.dataset.index;
        this.files.splice(index, 1);
    }

    handleToAddressChange(event) {
        this.toAddress = event.detail.selectedValues;
    }

    handleCcAddressChange(event) {
        this.ccAddress = event.detail.selectedValues;
    }

    handleSubjectChange(event) {
        this.subject = event.target.value;
    }

    handleBodyChange(event) {
        this.body = event.target.value;
    }

    validateEmails(emailAddressList) {
        let areEmailsValid;
        if(emailAddressList.length > 1) {
            areEmailsValid = emailAddressList.reduce((accumulator, next) => {
                const isValid = this.validateEmail(next);
                return accumulator && isValid;
            });
        }
        else if(emailAddressList.length > 0) {
            areEmailsValid = this.validateEmail(emailAddressList[0]);
        }
        return areEmailsValid;
    }

    validateEmail(email) {
        console.log("In VE");
        const res = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()s[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        console.log("res", res);
        return res.test(String(email).toLowerCase());
    }

    handleReset() {
        this.toAddress = [];
        this.ccAddress = [];
        this.subject = "";
        this.body = "";
        this.files = [];
        this.template.querySelectorAll("c-email-input").forEach((input) => input.reset());
    }

    handleSendEmail() {
        this.noEmailError = false;
        this.invalidEmails = false;
        if (![...this.toAddress, ...this.ccAddress].length > 0) {
            this.noEmailError = true;
            return;
        }

        if (!this.validateEmails([...this.toAddress, ...this.ccAddress])) {
            this.invalidEmails = true;
            return;
        }
        let emailDetails = {
            toAddress: this.toAddress,
            ccAddress: this.ccAddress,
            subject: this.subject,
            body: this.body
        };
        sendEmailController({ emailDetailStr: JSON.stringify(emailDetails) })
            .then(() => {
                console.log("Email Sent");
            })
            .catch((error) => {
                console.error("Error in sendEmailController:", error);
            });
    }
}
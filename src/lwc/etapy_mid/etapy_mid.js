/**
 * Created by matistikoff on 21. 7. 2022.
 */

import {api, LightningElement, track} from 'lwc';
import getBytyEtapy from '@salesforce/apex/EtapyATerminyController.getEtapyNazovList';
import updateEtapa from '@salesforce/apex/EtapyUpdate.updateEtapa';


export default class EtapyMid extends LightningElement {

    @api etapaID
    @track etapy
    @track us
    @track uklz
    @track fp
    @track fs
    @track fm
    @track du
    @track name




   connectedCallback() {
        this.getEtapyNazovData()
    }

    @api getEtapyNazovData(Id){
        console.log("idem do etapy")
        console.log("etapa pod "+ Id)
        getBytyEtapy({etapa : Id})
            .then(response => {
                this.etapy = response;

            })
            .catch(error => {
                console.error(error);
            })
    }

    handleSave() {
        console.log("update etapa"+" "+ this.template.querySelector('.textbox').value +" "+this.etapaID)

        this.us = this.template.querySelector('.select1').value
        this.uklz = this.template.querySelector('.select2').value
        this.fp = this.template.querySelector('.select3').value
        this.fs = this.template.querySelector('.select4').value
        this.fm = this.template.querySelector('.select5').value
        this.du = this.template.querySelector('.select6').value
        this.name = this.template.querySelector('.textbox').value

        updateEtapa({us: this.us, id: this.etapaID, uklz: this.uklz, fp: this.fp, fs: this.fs, fm: this.fm, du: this.du, name: this.name}, )
            .then(result => {
                // Clear the user enter values
                this.us = {};
                this.id = {};
                this.uklz = {};
                this.fp = {};
                this.fs = {};
                this.fm = {};
                this.du = {};
                this.name = {};

            })
            .catch(error => {
                this.error = error.message;
            });
    }

}
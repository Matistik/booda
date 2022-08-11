/**
 * Created by matistikoff on 21. 7. 2022.
 */

import {api, LightningElement, track} from 'lwc';
import getBytyEtapy from '@salesforce/apex/EtapyATerminyController.getEtapyNazovList';


export default class EtapyMid extends LightningElement {

    @track byty

    connectedCallback() {
        this.getEtapyNazovData()
    }

    @api getEtapyNazovData(Id){
        console.log("etapa pod "+ Id)
        getBytyEtapy({etapa : Id})
            .then(response => {
                this.byty = response;

            })
            .catch(error => {
                console.error(error);
            })
    }

}
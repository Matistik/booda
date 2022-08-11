/**
 * Created by matistikoff on 21. 7. 2022.
 */

import {LightningElement, track} from 'lwc';

export default class Etapy extends LightningElement {

    @track renderEtapy = true;

    handleRenderToHome(){
        this.dispatchEvent(new CustomEvent('home'));
    }

    handleEtapaValue(event){
        this.template.querySelector("c-etapy_right").getEtapyData(event.detail.id);
        this.template.querySelector("c-etapy_mid").getEtapyNazovData(event.detail.id);
    }



}
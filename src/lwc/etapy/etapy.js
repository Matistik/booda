/**
 * Created by matistikoff on 21. 7. 2022.
 */

import {api, LightningElement, track} from 'lwc';

export default class Etapy extends LightningElement {

    @api etapaID
    @track renderEtapy = true;
    @api flatID
    @track dashboardByt = false

    handleRenderToHome() {
        this.dispatchEvent(new CustomEvent('home'));
    }

    handleEtapaValue(event) {
        this.etapaID = event.detail.id
        this.template.querySelector("c-etapy_right").getEtapyData(event.detail.id);
        this.template.querySelector("c-etapy_mid").getEtapyNazovData(event.detail.id);

    }

    goToDashboardByt(event) {
        this.flatID = event.detail.id
        this.renderEtapy = false;
        this.dashboardByt = true
    }


}
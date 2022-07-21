/**
 * Created by matistikoff on 21. 7. 2022.
 */

import {LightningElement, track} from 'lwc';

export default class DashboardStandardy extends LightningElement {

    renderToStandards(){
        this.dispatchEvent(new CustomEvent('standards'));
    }

    @track openModal = false;

    openpdfModal() {
        this.openModal = true;
    }

    closepdfModal() {
        this.openModal = false;
    }
}
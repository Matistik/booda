/**
 * Created by matistikoff on 21. 7. 2022.
 */

import {LightningElement, track} from 'lwc';

export default class DashboardKontakty extends LightningElement {

    @track openModal = false;
    @track openieModal = false;

    openNKModal() {
        this.openModal = true;
    }

    closeNKModal() {
        this.openModal = false;
    }

    openIEModal() {
        this.openieModal = true;
    }

    closeIEModal() {
        this.openieModal = false;
    }

}
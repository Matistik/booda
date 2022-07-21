/**
 * Created by matistikoff on 21. 7. 2022.
 */

import {LightningElement, track} from 'lwc';

export default class DashboardKlz extends LightningElement {

    @track areButtonVisible = false;

    handleChange(event) {
        this.areButtonVisible = event.target.checked;
    }

    renderToKLZ(){
        this.dispatchEvent(new CustomEvent('klz'));
    }

    @track openModal = false;

    openpdfModal() {
        this.openModal = true;
    }

    closepdfModal() {
        this.openModal = false;
    }
}
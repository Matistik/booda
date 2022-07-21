/**
 * Created by matistikoff on 21. 7. 2022.
 */

import {LightningElement, track} from 'lwc';

export default class TabNavigationSuboryRight extends LightningElement {

    @track openModal = false;
    @track openppModal = false;

    openpsModal() {
        this.openModal = true;
    }

    closepsModal() {
        this.openModal = false;
    }

    openppmModal() {
        this.openppModal = true;
    }

    closeppmModal() {
        this.openppModal = false;
    }

}
/**
 * Created by matistikoff on 21. 7. 2022.
 */

import {LightningElement, track} from 'lwc';

export default class TabNavigationKomunikacia extends LightningElement {

    @track openModal = false;

    openpvModal() {
        this.openModal = true;
    }

    closepvModal() {
        this.openModal = false;
    }
}
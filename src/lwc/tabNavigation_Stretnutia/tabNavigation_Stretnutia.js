/**
 * Created by matistikoff on 21. 7. 2022.
 */

import {LightningElement, track} from 'lwc';

export default class TabNavigationStretnutia extends LightningElement {

    @track openModal = false;

    opennsModal() {
        this.openModal = true;
    }

    closensModal() {
        this.openModal = false;
    }

}
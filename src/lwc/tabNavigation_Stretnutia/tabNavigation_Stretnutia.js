/**
 * Created by matistikoff on 21. 7. 2022.
 */

import {api, LightningElement, track} from 'lwc';

export default class TabNavigationStretnutia extends LightningElement {

    @track openModal = false;
    @api flatID;

    opennsModal() {
        this.openModal = true;
    }

    closensModal() {
        this.openModal = false;
    }

}
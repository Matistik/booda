/**
 * Created by matistikoff on 21. 7. 2022.
 */

import {api, LightningElement} from 'lwc';

export default class CustomModal extends LightningElement {

    @api header;
    test = 'test';

    closeModal() {
        this.dispatchEvent(new CustomEvent('close'));

    }
    saveModal() {
        this.dispatchEvent(new CustomEvent('save'));
    }

}
/**
 * Created by matistikoff on 1. 9. 2022.
 */

import {LightningElement} from 'lwc';

export default class MisoVfInsideLwc extends LightningElement {


    siteURL;


    connectedCallback() {

        this.siteURL = '/apex/Example';

    }

}
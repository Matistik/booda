/**
 * Created by matistikoff on 21. 7. 2022.
 */

import {api, LightningElement, track} from 'lwc';

export default class Dashboard extends LightningElement {

    @api flatID;

    @track showSearchComponent = false;
    showSearch(){
        this.showSearchComponent = true;
    }

    renderToStandards(){

        this.dispatchEvent(new CustomEvent('standard'));


    }

    renderToKLZ(){
        this.dispatchEvent(new CustomEvent('klz'));
    }

}
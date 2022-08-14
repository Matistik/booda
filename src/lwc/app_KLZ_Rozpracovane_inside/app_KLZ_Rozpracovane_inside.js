/**
 * Created by mgons on 8/11/2022.
 */

import {api, LightningElement, track} from 'lwc';

export default class AppKlzRozpracovaneInside extends LightningElement {

    @api flatID;
    @track getConcreteData;

    @track klz = false;
    @track klzRozpracovaneInside = true;

    goToKlzRozpracovane(){
        this.klz = !this.klz;
        this.klzRozpracovaneInside = !this.klzRozpracovaneInside;
    }

}
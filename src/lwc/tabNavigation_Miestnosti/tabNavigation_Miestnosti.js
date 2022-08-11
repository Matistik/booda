/**
 * Created by matistikoff on 21. 7. 2022.
 */

import {api, LightningElement, track} from 'lwc';
import getMiestnosti from '@salesforce/apex/MiestnostiController.getMiestnosti';

export default class TabNavigationMiestnosti extends LightningElement {

    @api flatID;
    @track MiestnostiData;

    connectedCallback() {
        this.getMiestnosti()
    }

    getMiestnosti(){
        console.log("miestnosti"+this.MiestnostiData)
        getMiestnosti({lineId: this.flatID})
            .then(response => {
                this.MiestnostiData = response;
            })
            .catch(error => {
                console.log(error);
            })
    }
}
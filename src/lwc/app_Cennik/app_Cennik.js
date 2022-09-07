/**
 * Created by Maind on 16. 8. 2022.
 */

import {api, LightningElement, track} from 'lwc';
import getByt from '@salesforce/apex/DashboardController.getByt';


export default class AppCennik extends LightningElement {
    @api flatID
    @track cennik = true
    @track klzRozpracovane = false
    @track bytData;

    goToKlzRozpracovane(){
        this.cennik = !this.cennik;
        this.klzRozpracovane = !this.klzRozpracovane;
    }

    renderedCallback() {

        this.getBytData();
    }

    getBytData() {
        console.log("flatid;;;;"+this.flatID);

        getByt({ bytId: this.flatID })
            .then(response => {
                this.bytData = response;

            })
            .catch(error => {
                console.error(error);
            })
    }

}
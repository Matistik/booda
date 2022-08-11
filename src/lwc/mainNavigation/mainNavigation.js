/**
 * Created by matistikoff on 21. 7. 2022.
 */

import {api, track, LightningElement} from 'lwc';
import getByt from '@salesforce/apex/DashboardController.getByt';


export default class MainNavigation extends LightningElement {

    @api flatID;
    @track bytData;


    connectedCallback() {
        this.getBytData();
    }

    handleRenderToKlz(){
        this.dispatchEvent(new CustomEvent('klz'));
    }

    handleRenderToFlats(){
        this.dispatchEvent(new CustomEvent('flat'));
    }

    handleRenderToHome(){
        this.dispatchEvent(new CustomEvent('home'));
    }

    getBytData() {


        getByt({ bytId: this.flatID })
            .then(response => {
                this.bytData = response;

            })
            .catch(error => {
                console.error(error);
            })

    }


}
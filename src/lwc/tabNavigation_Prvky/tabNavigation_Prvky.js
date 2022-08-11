/**
 * Created by matistikoff on 21. 7. 2022.
 */

import {LightningElement, api, track} from 'lwc';
import getPrvky from '@salesforce/apex/PrvkyController.getPrvky';


export default class TabNavigationPrvky extends LightningElement {

    @api flatID;
    @track PrvkyData;

    connectedCallback() {
        this.getPrvky()
    }


    getPrvky(){
        getPrvky({lineId: this.flatID})
            .then(response => {
                this.PrvkyData = response;
            })
            .catch(error => {
                console.log(error);
            })
    }



}
/**
 * Created by matistikoff on 21. 7. 2022.
 */

import {LightningElement, api, track} from 'lwc';
import getPrvky from '@salesforce/apex/PrvkyController.getPrvky';


export default class TabNavigationPrvky extends LightningElement {

    @api flatID;
    @api prvokID;
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

    getPrvokId(event){
        let caseId = event.currentTarget.dataset.id;
        this.prvokID = caseId;
        console.log("prvok ID: " + caseId)

        let eventToDispatch = new CustomEvent('prvok', {
            detail: {
                id: caseId,

            }
        });
        this.dispatchEvent(eventToDispatch)

    }



}
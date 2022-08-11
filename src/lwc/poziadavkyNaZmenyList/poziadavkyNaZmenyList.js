/**
 * Created by matistikoff on 21. 7. 2022.
 */

import {api, LightningElement, track, wire} from 'lwc';
import getKLZList from '@salesforce/apex/KLZController.getKLZList'
import getCaseStav from '@salesforce/apex/PoziadavkyNaZmenyController.getCaseStav'

export default class PoziadavkyNaZmenyList extends LightningElement {

    @api flatID;
    @track klzData

    connectedCallback() {
        this.getKLZList()
    }

   @api getKLZList(){
        console.log("nah ide to")
        getKLZList()
            .then(response => {
                 this.klzData = response
            })
            .catch(error => {
                console.error(error);
            })
    }

    @api getCaseStav(Id){
        getCaseStav({stav : Id})
            .then(response => {
                this.klzData = response
            })
            .catch(error => {
                console.error(error);
            })
    }

    renderToKlz(event){
        let caseId = event.currentTarget.dataset.id;
        this.flatID = caseId;
        console.log("klzID " + caseId)

        let eventToDispatch = new CustomEvent('newklz', {
            detail: {
                id: caseId,

            }
        });
        this.dispatchEvent(eventToDispatch)
    }


}
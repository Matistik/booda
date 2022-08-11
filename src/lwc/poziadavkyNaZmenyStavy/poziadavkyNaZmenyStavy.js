/**
 * Created by matistikoff on 21. 7. 2022.
 */

import {api, LightningElement, track} from 'lwc';

import getStavyList from '@salesforce/apex/PoziadavkyNaZmenyController.getStavyList'
import getCaseStav from '@salesforce/apex/PoziadavkyNaZmenyController.getCaseStav'

export default class PoziadavkyNaZmenyStavy extends LightningElement {

    @api flatID;
    @track stavyData

    renderedCallback() {
        this.getStavyList();
    }

    getStavyList(){
        getStavyList()
            .then(response => {
                this.stavyData = response
            })
            .catch(error => {
                console.error(error);
            })
    }

     handleRenderVsetkyKLZ(event){
        let caseId = event.currentTarget.dataset.id;

        let eventToDispatch = new CustomEvent('vsetkyklz', {
            detail: {
                id: caseId,
            }
        });
        this.dispatchEvent(eventToDispatch)
    }

    handleRenderSpecStav(event){
        let caseId = event.currentTarget.dataset.id;
        let eventToDispatch = new CustomEvent('stav', {
            detail: {
                id: caseId,
            }
        });
        this.dispatchEvent(eventToDispatch)
    }

}
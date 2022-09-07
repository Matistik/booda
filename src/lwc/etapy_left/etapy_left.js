/**
 * Created by matistikoff on 21. 7. 2022.
 */

import {LightningElement, track} from 'lwc';
import getEtapyList from '@salesforce/apex/EtapyATerminyController.getEtapyList'

export default class EtapyLeft extends LightningElement {

    @track etapyData
    @track etapaID

    renderedCallback() {
        this.getEtapyList();
    }

    getEtapyList(){
        getEtapyList()
            .then(response => {
                this.etapyData = response;
            })
            .catch(error => {
                console.error(error);
            })
    }

    handleRenderSpecEtapy(event){
        let caseId = event.currentTarget.dataset.id;
        this.etapaID = caseId;
        let eventToDispatch = new CustomEvent('etapa', {
            detail: {
                id: caseId,
            }
        });
        this.dispatchEvent(eventToDispatch)
    }
}
/**
 * Created by matistikoff on 22. 7. 2022.
 */

import {api, LightningElement, track, wire} from 'lwc';
import getVchodyList from '@salesforce/apex/PrehladBytovMenuController.getVchodyList'
import getEtapyList from '@salesforce/apex/PrehladBytovMenuController.getEtapyList'


export default class PrehladBytovVchody extends LightningElement {

    @track vchodyData;
    @track etapyData;

    @api bytVchod;

    renderedCallback() {
        this.getVchodyList();
        this.getEtapyList();
    }

    getVchodyList(){
        getVchodyList()
            .then(response => {
                this.vchodyData = response;
            })
            .catch(error => {
                console.error(error);
            })
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


    @api handleRenderSpecVchod(event){

        let caseId = event.currentTarget.dataset.id;
        this.bytVchod = caseId;

        console.log('CHild1 vchod ' + caseId);

        let eventToDispatch = new CustomEvent('vchod', {
            detail: {
                id: caseId,
            }
        });
        this.dispatchEvent(eventToDispatch)
    }

    @api handleRenderVsetkyVchody(event){

        let caseId = event.currentTarget.dataset.id;
        console.log('CHild1 vchod ' + caseId);

        let eventToDispatch = new CustomEvent('vsetkyvchody', {
            detail: {
                id: caseId,
            }
        });
        this.dispatchEvent(eventToDispatch)
    }

    @api handleRenderVsetkyEtapy(event){

        let caseId = event.currentTarget.dataset.id;
        this.bytVchod = caseId;

        console.log('CHild1 vchod ' + caseId);

        let eventToDispatch = new CustomEvent('vsetkyetapy', {
            detail: {
                id: caseId,
            }
        });
        this.dispatchEvent(eventToDispatch)
    }



}
/**
 * Created by matistikoff on 21. 7. 2022.
 */

import {api, LightningElement, track, wire} from 'lwc';
import getKLZList from '@salesforce/apex/KLZController.getKLZList'
import getCaseStav from '@salesforce/apex/PoziadavkyNaZmenyController.getCaseStav'

export default class PoziadavkyNaZmenyList extends LightningElement {

    @api flatID
    @api klzID
    @track klzData


    goToKlzWrapper(event){
        console.log("idem z pnzl do pnz")
        let caseId = event.currentTarget.dataset.id
        let flatId = event.currentTarget.dataset.flat
        this.flatID = flatId
        this.klzID = caseId
        console.log("byt na pnz: "+ this.flatID)
        let eventToDispatch = new CustomEvent('gotoklz', {
            detail: {
                id: caseId,
                flat: flatId,
            }
        });
        this.dispatchEvent(eventToDispatch)
    }



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
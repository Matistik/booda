/**
 * Created by matistikoff on 21. 7. 2022.
 */

import {api, LightningElement, track} from 'lwc';
import getKLZ from '@salesforce/apex/KLZController.getKLZ';

export default class TabNavigationKlz extends LightningElement {

    @api flatID;
    @track KLZData = [];
    @track openModal = false;
    @track klzID;


    renderToKlzWrapper(event){
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

    renderedCallback() {
        this.getKLZ();
    }
    getKLZ(){
        console.log("ID "+this.flatID);
        getKLZ({caseId: this.flatID})
            .then(response => {
                this.KLZData = response;
            })
            .catch(error => {
                console.log(error);
            })
    }

    openNZModal() {
        this.openModal = true;
    }

    closeNZModal() {
        this.openModal = false;
    }

    handleRenderToKLZ(event){
        let caseId = event.currentTarget.dataset.id;
        this.flatID = caseId;

        console.log('IDcko z Listu::: ' + caseId);

        let eventToDispatch = new CustomEvent('flat', {
            detail: {
                id: caseId,

            }
        });
        this.dispatchEvent(eventToDispatch)


      //  this.renderFlats=!this.renderFlats;
       // this.renderDashboard=!this.renderDashboard;
    }

}
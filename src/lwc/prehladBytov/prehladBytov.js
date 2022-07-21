/**
 * Created by matistikoff on 21. 7. 2022.
 */

import {LightningElement, track, wire} from 'lwc';
import getBytyList from '@salesforce/apex/PrehladBytovController.getBytyList';


export default class PrehladBytov extends LightningElement {

    @wire(getBytyList) byty;

    @track renderFlats = true;
    @track renderDashboard = false;
    @track data;
    @track flatID;


    renderedCallback() {

        console.log(this.renderFlats);
        console.log(this.renderDashboard);
    }


    handleRenderToDashboardOrFlats(event){

        let caseId = event.currentTarget.dataset.id;
        this.flatID = caseId;

        console.log('IDcko::: ' + caseId);

        let eventToDispatch = new CustomEvent('gotorecord', {
            detail: {
                id: caseId,

            }
        });
        this.dispatchEvent(eventToDispatch)


        this.renderFlats=!this.renderFlats;
        this.renderDashboard=!this.renderDashboard;
    }

    handleRenderToHome(){
        this.dispatchEvent(new CustomEvent('home'));
        this.renderFlats=false;
        this.renderDashboard=false;
    }

}
/**
 * Created by matistikoff on 22. 7. 2022.
 */

import {LightningElement, api, wire, track} from 'lwc';
import getBytyList from '@salesforce/apex/PrehladBytovController.getBytyList';
import getBytyListVchod from '@salesforce/apex/PrehladBytovController.getBytyListVchod';
import getBytyEtapy from '@salesforce/apex/PrehladBytovController.getBytyListEtapy';



export default class PrehladBytovList extends LightningElement {

    @api flatID;
    @track byty;
    @api bytVchod;
    @api etapaID


    connectedCallback() {
        this. getBytyList();
    }





    @api getVchodData(Id){
        this.bytVchod = Id;
        console.log("child2 vchod  "+this.bytVchod);
        getBytyListVchod({vchod: this.bytVchod})
            .then(response => {
                this.byty = response;
                console.log(JSON.stringify(this.byty))
            })
            .catch(error => {
                console.error(error);
            })
    }

    @api getEtapyData(Id){
        this.etapaID = Id;

        getBytyEtapy({etapy : this.etapaID})
            .then(response => {
                this.byty = response;
               // console.log(JSON.stringify(this.byty))
            })
            .catch(error => {
                console.error(error);
            })
    }



    @api getBytyList(){
        getBytyList()
            .then(response => {
                this.byty = response;

            })
            .catch(error => {
                console.error(error);
            })




    }





    handleRenderToFlats(event){

        let caseId = event.currentTarget.dataset.id;
        this.flatID = caseId;

        console.log('IDcko z Listu::: ' + caseId);

        let eventToDispatch = new CustomEvent('flat', {
            detail: {
                id: caseId,

            }
        });
        this.dispatchEvent(eventToDispatch)


        this.renderFlats=!this.renderFlats;
        this.renderDashboard=!this.renderDashboard;


    }




}
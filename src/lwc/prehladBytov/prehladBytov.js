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
    @track bytA;
    @track bytVchod;

    renderaparent(event){
        this.bytA = event.detail;
        console.log("BYT A" + this.bytA);
    }


    renderedCallback() {

        console.log(this.renderFlats);
        console.log(this.renderDashboard);
    }

    handleRenderToDashboardOrFlats(event){
        let caseId = event.detail.id;
        if(caseId == null){
            this.renderFlats=true;
            this.renderDashboard=false;
        }
        else{
            this.flatID = caseId;
            console.log('IDcko::: ' + caseId);
            this.renderFlats=!this.renderFlats;
            this.renderDashboard=!this.renderDashboard;
        }
    }

    handleRenderToHome(){
        this.dispatchEvent(new CustomEvent('home'));
        this.renderFlats=false;
        this.renderDashboard=false;
    }
    handleRenderToFlats(){
        this.dispatchEvent(new CustomEvent('flat'));
        this.renderFlats=true;
        this.renderDashboard=false;
    }
    handleRenderToKlz(){
        this.dispatchEvent(new CustomEvent('flat'));
        this.renderFlats=false;
        this.renderDashboard=false;
    }

    handleVchodValue(event){
        this.bytVchod = event.detail.id;
        console.log("Parent vchod "+this.bytVchod);
        this.template.querySelector("c-prehlad-bytov-list").getVchodData(this.bytVchod);
    }

    handleVsetkyVchodyValue(event){
        this.template.querySelector("c-prehlad-bytov-list").getBytyList();
    }
    handleVsetkyEtapyValue(event){
        this.bytVchod = event.detail.id;
        this.template.querySelector("c-prehlad-bytov-list").getEtapyData(this.bytVchod);
    }

}
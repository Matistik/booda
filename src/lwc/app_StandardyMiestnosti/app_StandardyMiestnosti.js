/**
 * Created by mgons on 8/22/2022.
 */

import {api, LightningElement, track} from 'lwc';
import getByt from '@salesforce/apex/DashboardController.getByt';
import getMiestnosti from '@salesforce/apex/StandardyController.getMiestnosti';
import getUzavretieStandarduTermin from '@salesforce/apex/EtapyATerminyController.getUzavretieStandarduTermin';

export default class AppStandardyMiestnosti extends LightningElement {
    @api flatID;
    @api miesnotstID;
    @track bytData;
    @track rooms;
    @track mojByt = false;
    @track standardy = true;
    @track prvky = false;
    @track stringDate;

    goToMojByt(){
        this.mojByt = !this.mojByt;
        this.standardy = !this.standardy;
    }


    goToPrvky(event){
        this.miesnotstID = event.currentTarget.dataset.id;

            let eventToDispatch = new CustomEvent('druh', {
            detail: {
                id: this.miesnotstID,

            }
        });
        this.dispatchEvent(eventToDispatch)

    }

    connectedCallback() {
        this.getBytData()
        this.getUzavretieStandarduTermin()
        this.getMiestnosti()

    }

    getBytData() {
        console.log("flatid;;;;"+this.flatID);

        getByt({ bytId: this.flatID })
            .then(response => {
                this.bytData = response;

            })
            .catch(error => {
                console.error(error);
            })
    }

    getMiestnosti(){
        getMiestnosti({flatID: this.flatID})
            .then(response => {this.rooms = response
            console.log(JSON.stringify(this.rooms))
            })
            .catch(error => (console.log(error)))
    }

    getUzavretieStandarduTermin(){
        getUzavretieStandarduTermin({ byt: this.flatID })
            .then(response => {
                this.uzavretieStandardov = response;
                this.stringDate = (JSON.stringify(this.uzavretieStandardov))
                this.stringDate = this.stringDate.substring(28,38);

            })
            .catch(error => {
                console.error(error);
            })
    }




}
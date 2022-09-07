/**
 * Created by mgons on 8/22/2022.
 */

import {api, LightningElement, track} from 'lwc';
import getByt from '@salesforce/apex/DashboardController.getByt';
import getPrvky from '@salesforce/apex/StandardyController.getPrvky';
import getMiestnostName from '@salesforce/apex/StandardyController.getMiestnostName';
import getUzavretieStandarduTermin from '@salesforce/apex/EtapyATerminyController.getUzavretieStandarduTermin';
export default class AppStandardyPrvkyPreMiestnost extends LightningElement {
    @api flatID;
    @api miestnostID;
    @track bytData;
    @track miestnosti = false;
    @track mojByt = false;
    @track standardy = true;
    @track prvok = false;
    @track prvky;
    @track miestnostName;
    @api prvokID;
    @track stringDate;


    goToMojByt(){
        this.mojByt = !this.mojByt;
        this.standardy = !this.standardy;
    }
    goToMiestnosti(){
        this.miestnosti = !this.miestnosti;
        this.standardy = !this.standardy;
        let eventToDispatch = new CustomEvent('miestnost', {
            detail: {
                id: this.miesnotstID,

            }
        });
        this.dispatchEvent(eventToDispatch)
    }
    goToPrvok(){
        this.prvok = !this.prvok;
        this.standardy = !this.standardy;
    }

    connectedCallback() {
        this.getBytData();
        this.getUzavretieStandarduTermin()
        this.getPrvky(this.miestnostID)
    }

    renderedCallback() {

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

    @api getPrvky(miestnost){

        console.log(miestnost)
        getMiestnostName({prvokID: miestnost})
            .then(response => {
                this.miestnostName = response;
            })
            .catch(error => {
                console.log(error);
            })





        getPrvky({MiestnostID: miestnost})
            .then(response => {

                this.prvky = response;
                console.log(JSON.stringify(this.prvky))
            })
            .catch(error => {
                console.log(error);
            })
    }
    renderProdukty(event){
        let prvokID = event.currentTarget.dataset.id;

        let eventToDispatch = new CustomEvent('prvky', {
            detail: {
                id: prvokID,

            }
        });
        this.dispatchEvent(eventToDispatch)

    }

}
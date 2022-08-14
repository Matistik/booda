/**
 * Created by Maind on 10. 8. 2022.
 */

import {api, LightningElement, track} from 'lwc';
import getMiestnosti from '@salesforce/apex/MiestnostiController.getMiestnosti';
import getByt from '@salesforce/apex/DashboardController.getByt';


export default class AppZoznamMiestnosti extends LightningElement {
    @api flatID;
    @track miestnostiData;
    @track bytData;

    @track mojByt = false;
    @track miestnosti = true;

    goToMojByt(){
        this.mojByt = !this.mojByt;
        this.miestnosti = !this.miestnosti;
    }

    connectedCallback() {
        this.getMiestnosti()
    }

    getMiestnosti(){
        console.log("miestnosti"+this.miestnostiData)
        getMiestnosti({lineId: this.flatID})
            .then(response => {
                this.miestnostiData = response;
            })
            .catch(error => {
                console.log(error);
            })
    }

    renderedCallback() {
        this.getBytData();
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

}
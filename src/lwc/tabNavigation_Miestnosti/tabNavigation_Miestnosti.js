/**
 * Created by matistikoff on 21. 7. 2022.
 */

import {api, LightningElement, track} from 'lwc';
import getMiestnosti from '@salesforce/apex/MiestnostiController.getMiestnosti';
import updateMiestnosti from '@salesforce/apex/MiestnostiUpdate.updateMiestnosti';

export default class TabNavigationMiestnosti extends LightningElement {

    @api flatID;
    @track MiestnostiData;
    @track poznamkyMiestnost
    @track miestnostId = 'a1U1q000000vg9hEAA'

    connectedCallback() {
        this.getMiestnosti()
    }

    getMiestnosti(){
        getMiestnosti({lineId: this.flatID})
            .then(response => {
                this.MiestnostiData = response;
            })
            .catch(error => {
                console.log(error);
            })
    }
    handleSavePoznamka(event){
        let miestnostId = event.currentTarget.dataset.id;
        let miestnostPoznamka = event.target.value;
        this.poznamkyMiestnost = this.template.querySelector('.text5').value

        updateMiestnosti({Poznamky: miestnostPoznamka, Id: miestnostId},)
            .then(result =>{
                //clear the user enter values
                this.id = {};
                this.poznamkyMiestnost = {};
            })
            .catch(error =>{
                this.error = error.message;
            });
    }
}
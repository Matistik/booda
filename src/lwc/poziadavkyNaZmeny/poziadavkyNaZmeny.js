/**
 * Created by matistikoff on 21. 7. 2022.
 */

import {api, LightningElement, track} from 'lwc';
import getConcreteKLZ from '@salesforce/apex/KLZController.getConcreteKLZ';

export default class PoziadavkyNaZmeny extends LightningElement {

    @track flatID;
    @track renderPoziadavkyNaZmeny = true
    @track renderToKlzNew = false
    @api klzID;


    handleRenderToHome(){
        this.dispatchEvent(new CustomEvent('home'));
    }

    renderToKlz(event){
        console.log("som v pnz")
        this.klzID = event.detail.id
        this.flatID = event.detail.flat
        console.log("som v pnz klzID "+ this.klzID)
        this.renderPoziadavkyNaZmeny = false
        this.renderToKlzNew = true
    }

    getConcreteKLZ(){

        getConcreteKLZ({klzID: this.klzID})
            .then(response => {
                this.flatID = response.Byt__r.Id;
                console.log('rere' + this.flatID)

            })
            .catch(error => {
                console.log(error);
            })
    }

    handleVsetkyStavyValue(){
        this.template.querySelector("c-poziadavky-na-zmeny-list").getKLZList();
    }

    handleStavValue(event){
        this.template.querySelector("c-poziadavky-na-zmeny-list").getCaseStav(event.detail.id);
    }
}
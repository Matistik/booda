/**
 * Created by matistikoff on 21. 7. 2022.
 */

import {api, LightningElement, track} from 'lwc';
import getConcreteKLZ from '@salesforce/apex/KLZController.getConcreteKLZ';

export default class PoziadavkyNaZmeny extends LightningElement {

    @track flatID;
    @track renderPoziadavkyNaZmeny=true;
    @track renderToKlzNew;
    @api klzID;


    handleRenderToHome(){
        this.dispatchEvent(new CustomEvent('home'));
    }

    renderToKlz(event){
        this.klzID = event.detail.id;
        this.getConcreteKLZ
        this.renderPoziadavkyNaZmeny=false;
        this.renderToKlzNew=true;
        console.log( this.renderPoziadavkyNaZmeny);
        console.log('but')
        console.log( this.renderToKlzNew);
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
/**
 * Created by matistikoff on 21. 7. 2022.
 */

import {LightningElement, track} from 'lwc';

export default class DomovskaStranka extends LightningElement {

    @track renderFlats = false;
    @track renderHomePage = true;
    @track renderEtapy = false;
    @track renderPoziadavkyNaZmeny = false;
    @track renderNewKlz = false;

    handleRenderToFlatsOrHome(){
        this.renderHomePage=!this.renderHomePage;
        this.renderFlats=!this.renderFlats;
    }

    navigateToEtapy(){
        this.renderHomePage=!this.renderHomePage;
        this.renderEtapy=!this.renderEtapy;

    }

    navigateToPoziadavky(){
        this.renderPoziadavkyNaZmeny =!this.renderPoziadavkyNaZmeny;
        this.renderHomePage=!this.renderHomePage;

    }




}
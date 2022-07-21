/**
 * Created by matistikoff on 21. 7. 2022.
 */

import {api, LightningElement, track} from 'lwc';

export default class TabNavigation extends LightningElement {

    @api flatID;
    @track template = true;
    @track standard = true;
    @track subory = true;
    @track klz = true;

    @track showTabs = true;
    @track showNewKlz = false;

    renderedCallback() {
        this.template=true;
        this.subory=true;
        this.standard=true;
    }


    handleRenderToHome(){
        console.log("chcem ist domov");
        this.dispatchEvent(new CustomEvent('home'));
    }

    handleRenderToKlz(){
        this.dispatchEvent(new CustomEvent('klz'));
    }


    handleRenderToFlats(){
        this.dispatchEvent(new CustomEvent('flat'));
    }

    showTemplateOrStandard(){
        this.template=false;
        this.standard=true;
        this.subory=false;
    }

    showTemplateOrKLZ(){
        console.log("asd")
        this.template=false;
        this.subory=false;
        this.klz=true;
        this.standard=false;


    }

    renderToNewKLZ(){

        this.showTabs = false;
        this.showNewKlz = true;

    }

}
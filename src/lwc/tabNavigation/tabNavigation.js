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
    @api klzID

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
        console.log("chcem ist na klz");
        this.dispatchEvent(new CustomEvent('klz'));
    }


    handleRenderToFlats(){
        console.log("chcem ist na byty");
        this.dispatchEvent(new CustomEvent('flat'));

    }

    showTemplateOrStandard(){
        console.log('prosiel som')
        this.template=false;
        this.standard=true;
        this.subory=false;
    }

    showTemplateOrKLZ(){
        console.log("asd")
        this.showTabs= true
        this.showNewKlz = false
        this.template=false;
        this.subory=false;
        this.standard = false
        this.klz=true;
    }

    renderToNewKLZ(event){
        this.showTabs = false;
        this.showNewKlz = true;
        this.klzID = event.detail.id
    }

    showTabOrKLZ(){
        this.showNewKlz = false
        this.klz = true
        this.showTabs = true

    }

    renderToFlat(){
        this.showNewKlz = false
        this.showTabs = true
    }

    renderKom(){
        this.template.querySelector("c-tab-navigation_-komunikacia").getKLZforComm();
    }

}
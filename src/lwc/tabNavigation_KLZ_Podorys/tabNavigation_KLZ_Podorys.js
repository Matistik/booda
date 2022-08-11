/**
 * Created by Maind on 9. 8. 2022.
 */

import {api, LightningElement, track} from 'lwc';
import getPodorys from '@salesforce/apex/PodorysController.getPodorys';
import image from '@salesforce/resourceUrl/DvaIzbovyPodorys'
import getConcreteKLZ from '@salesforce/apex/KLZController.getConcreteKLZ';

export default class TabNavigationKlzPodorys extends LightningElement {

    img=image;
    @api flatID;
    @track renderPodorys = true;
    @track renderKLZ = false;
    @track KLZData;
    @api klzID;
    @track ConcreteKLZData;
    @track bytData;

    @track podorysData = [];

    connectedCallback() {
        this.getPodorys();
        this.getConcreteKLZ()
    }

    getPodorys(){
        getPodorys()
            .then(response => {
                this.podorysData = response;
            })
            .catch(error => {
                console.log(error);
            })
    }

    goTo(){
        this.flatID;
        this.klzID;
        this.renderKLZ = !this.renderKLZ;
        this.renderPodorys = !this.renderPodorys;
    }

    getConcreteKLZ(){

        getConcreteKLZ({klzID: this.klzID})
            .then(response => {
                this.ConcreteKLZData = response;
            })
            .catch(error => {
                console.log(error);
            })
    }

    renderPopRight(event){

        this.klzID = event.detail.id;
        this.getConcreteKLZ();

        this.template.querySelector("c-tab-navigation_-k-l-z_-pop-right").getConcreteKLZ(event.detail.id);

    }

}
/**
 * Created by matistikoff on 21. 7. 2022.
 */

import {api, LightningElement, track} from 'lwc';
import getKLZ from '@salesforce/apex/KLZController.getKLZ';
import getConcreteKLZ from '@salesforce/apex/KLZController.getConcreteKLZ';
import getByt from '@salesforce/apex/DashboardController.getByt';
import image from '@salesforce/resourceUrl/DvaIzbovyPodorys'

export default class TabNavigation_KLZ_TabNavigation extends LightningElement {

    @api flatID;
    @track KLZData;
    @api klzID;
    @track ConcreteKLZData;
    @track bytData;
    img=image;

    connectedCallback() {
        this.getConcreteKLZ()
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
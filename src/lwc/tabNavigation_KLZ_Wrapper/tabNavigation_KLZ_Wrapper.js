/**
 * Created by matistikoff on 21. 7. 2022.
 */

import {api, LightningElement, track} from 'lwc';
import getKLZ from '@salesforce/apex/KLZController.getKLZ';
import getConcreteKLZ from '@salesforce/apex/KLZController.getConcreteKLZ';
import getByt from '@salesforce/apex/DashboardController.getByt';
import image from '@salesforce/resourceUrl/DvaIzbovyPodorys'

export default class TabNavigationKlzWrapper extends LightningElement {

    img=image;
    @api flatID;
    @track KLZData;
    @api klzID;
    @track ConcreteKLZData;
    @track bytData;


    connectedCallback() {
        this.getKLZ();
        this.getConcreteKLZ()
        this.getBytData()
    }

    getBytData() {


        getByt({ bytId: this.flatID })
            .then(response => {
                this.bytData = response;

            })
            .catch(error => {
                console.error(error);
            })





    }

    getKLZ(){

        getKLZ({caseId: this.flatID})
            .then(response => {
                this.KLZData = response;

            })
            .catch(error => {
                console.log(error);
            })
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




    handleRenderToHome(){
        this.dispatchEvent(new CustomEvent('home'))
    }

    handleRenderToKlz(){
        this.dispatchEvent(new CustomEvent('klz'))
    }

    handleRenderToFlat(){
        this.dispatchEvent(new CustomEvent('flat'))
    }

}
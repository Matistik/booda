/**
 * Created by matistikoff on 5. 9. 2022.
 */

import {api, LightningElement, track, wire} from 'lwc';
import getByt from '@salesforce/apex/DashboardController.getByt';
import saveCordinates from '@salesforce/apex/KLZController.saveCordinates';
import getCordinateX from '@salesforce/apex/KLZController.getCordinateX';
import getCordinateY from '@salesforce/apex/KLZController.getCordinateY';
import getPodorys from '@salesforce/apex/PodorysController.getPodorys';
import jQuery from '@salesforce/resourceUrl/JQuery'
import JQueryUI2 from '@salesforce/resourceUrl/JQueryUI2'
import imgPin from '@salesforce/resourceUrl/pin2'
import wheelZoom from '@salesforce/resourceUrl/wheelZoom'
import simulate from '@salesforce/resourceUrl/simulate'
import { CurrentPageReference } from 'lightning/navigation';
import { registerListener, unregisterAllListeners } from 'c/pubsub';
import {loadScript} from "lightning/platformResourceLoader";

export default class TabNavigationKlzZobrazeniePodorysu extends LightningElement {

    @api flatID
    @track bytData;
    @track konkretnypodorys = true
    @track podorysy = false;
    @track podorysData
    @track novaklz = false
    @track novaklzbutton = false
    @track klzrozpracovane = false
    @track checked;
    @track leftPos = 0;
    @track topPos = 0;
    @api objectApiName;
    pinImage = imgPin;
    @api klzID;



    renderedCallback() {



        Promise.all([
            loadScript(this, JQueryUI2),
            loadScript(this, wheelZoom),
            loadScript(this, simulate)

        ]).then(() => {
            this.draggableMiso();


        });

    }



    connectedCallback() {
        this.getBytData(this.flatID);
        this.getPodorys();



    }

    draggableMiso(){



        let x;
        let y;
        let ahoj = this.klzID

        getCordinateX({ klz: ahoj })
            .then(response => {
                x = response;


            })
            .catch(error => {
                console.error(error);
            })

        getCordinateY({ klz: ahoj })
            .then(response => {
                y = response;

                $(this.template.querySelector('.draggable')).draggable({
                    containment: this.template.querySelector('.img')}
                );



                $(this.template.querySelector('.draggable')).simulate('drag');

                $(this.template.querySelector('.draggable')).draggable({
                    drag: function (event, ui) {

                        console.log('xxx ' + x)
                        console.log('yyy ' + y)

                        ui.position.top = y;
                        ui.position.left = x;

                    }
                });


            })
            .catch(error => {
                console.error(error);
            })













    }
    goToRozpracovane(){

        this.klzrozpracovane = !this.klzrozpracovane;
        this.novaklz = !this.novaklz;
        this.novaklzbutton = !this.novaklzbutton;

    }

    goToPodorysy(){
        this.podorysy = !this.podorysy;
        this.konkretnypodorys = !this.konkretnypodorys;
    }
    // goToNovaKlz(){
    //     this.novaklz = !this.novaklz;
    //     this.konkretnypodorys = !this.konkretnypodorys;
    //     this.novaklzbutton = !this.novaklzbutton;
    // }





    getBytData() {
        console.log("flatid;;;;"+this.flatID);

        getByt({ bytId: this.flatID })
            .then(response => {
                this.bytData = response;

                // let message= JSON.stringify(response)
                // console.log(message);
                // if (message.charAt(30) === 't'){
                //     this.checked = false
                //     console.log("checked "+this.checked)
                // }
                // if (message.charAt(30) === 'f'){
                //     this.checked = true
                //     console.log("checked "+this.checked)
                // }

            })
            .catch(error => {
                console.error(error);
            })

    }

    getPodorys() {

        console.log("podorys flatid;;;;"+this.flatID);

        getPodorys({ byt: this.flatID })
            .then(response => {
                this.podorysData = response;


            })
            .catch(error => {
                console.error(error);
            })
    }

}
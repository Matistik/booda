/**
 * Created by matistikoff on 1. 9. 2022.
 */

import {LightningElement, track} from 'lwc';
import {loadScript, loadStyle} from "lightning/platformResourceLoader";
import jQuery from '@salesforce/resourceUrl/JQuery'
import JQueryUI2 from '@salesforce/resourceUrl/JQueryUI2'
import wheelZoom from '@salesforce/resourceUrl/wheelZoom'
import PanZoom from '@salesforce/resourceUrl/PanZoom'

import pin from '@salesforce/resourceUrl/pinNew'
import imgPin from '@salesforce/resourceUrl/pin2'



export default class JqueryDemo extends LightningElement {

    img = pin;
    startPostion = 0;
    pinImage = imgPin;


    renderedCallback() {



        loadScript(this, PanZoom)
            .then(() => { this.draggableMiso() });
    }

    draggableMiso(){

        panzoom('#example', {
            bound:'outer'
        });

        //wheelzoom(this.template.querySelector('img.zoom'));
    }



}
/**
 * Created by mgons on 8/8/2022.
 */

import {LightningElement, track} from 'lwc';
import salesimage from '@salesforce/resourceUrl/salesimageicon'
import getImageItemsProdukt from '@salesforce/apex/ImageController.getImageItemsProdukt'

export default class ImageDemo extends LightningElement {

    img=salesimage;
    @track img;

    connectedCallback(){
        this.getImageItemsProdukt()
    }

    getImageItemsProdukt(){
        getImageItemsProdukt()
            .then(response => {

                this.img = response;
                console.log(JSON.stringify(this.img));

            })
            .catch(error => {
                console.log(error);
            })
    }

}
/**
 * Created by matistikoff on 8/3/2022.
 */

import {LightningElement, api, track} from 'lwc';
import getLineItem from '@salesforce/apex/StandardyController.getLineItems'

export default class StandardyWrapper extends LightningElement {

    @api flatID;
    @track standardyData
    @track standardID;





    getLineItem(){
        getLineItem({lineId: this.flatID})
            .then(response => {
                this.StandardyData = response;
            })
            .catch(error => {
                console.log(error);
            })
    }

    renderDruhyProduktov(event){

        this.standardID = event.detail.id;
        this.template.querySelector("c-standardy-produkty-left").getProductsFromStandard(event.detail.id);

    }

    renderProdukty(event){

        this.template.querySelector("c-standardy-produkty-right").getFeaturesFromProducts(event.detail.id)

    }

    handleOpacity(event){
        this.template.querySelector("c-standardy-produkty-right").handleOpacity();
    }

    renderMiestnosti(event){

        this.template.querySelector("c-standardy-miestnosti").getRooms(event.detail.id);

    }


}
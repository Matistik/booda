/**
 * Created by matistikoff on 8/3/2022.
 */

import {LightningElement, api, track} from 'lwc';
import getLineItem from '@salesforce/apex/StandardyController.getLineItems'

export default class StandardyWrapper extends LightningElement {

    @api flatID;
    @track standardyData
    @track standardID;
    @track selectedProducts = [];
    @track mainProductId;
    @track prvokID;





    getLineItem(){
        getLineItem({lineId: this.flatID})
            .then(response => {
                this.StandardyData = response;
            })
            .catch(error => {
                console.log(error);
            })
    }

    renderPrvky(event){

        this.standardID = event.detail.id;
        this.template.querySelector("c-standardy-produkty-left").getPrvky(event.detail.id);
        this.template.querySelector("c-standardy-produkty-right").resetData();
        this.template.querySelector("c-standardy-produkty-bottom").resetData()
        this.template.querySelector("c-standardy-produkty-bottom-right").resetData()


    }

    renderProdukty(event){
        this.prvokID = event.detail.id;
        this.template.querySelector("c-standardy-produkty-right").handleOpacity();
        this.template.querySelector("c-standardy-produkty-right").getFeaturesFromProducts(event.detail.id)
        this.template.querySelector("c-standardy-produkty-bottom").resetData()
        this.template.querySelector("c-standardy-produkty-bottom-right").resetData()


    }

    renderProductOptions(event){

        this.mainProductId = event.detail.id

        //this.selectedProducts.push(this.mainProductId)
        this.selectedProducts = [this.mainProductId, ...this.selectedProducts];

        this.template.querySelector("c-standardy-produkty-bottom").getProductOptions(event.detail.id, this.selectedProducts)

    }

    renderMiestnosti(event){

        this.template.querySelector("c-standardy-miestnosti").getRooms(event.detail.id);

    }

    renderConcreteOptions(event){


        this.template.querySelector("c-standardy-produkty-bottom-right").getProductOptions(event.detail.id, event.detail.productid, this.selectedProducts);


    }

    selectedProduct(event){

        //treba dalej mysliet aj na IDceka rovnakeho produkty
        if (event.detail.id != null){
            //this.selectedProducts.push(event.detail.id);




            this.selectedProducts = [event.detail.id, ...this.selectedProducts];
            this.template.querySelector("c-standardy-produkty-bottom").getProductOptions(this.mainProductId, this.selectedProducts)
        }

        console.log('selectedIDs::: ' + JSON.stringify(this.selectedProducts))

    }

    deleteSelected(){
        this.selectedProducts = [];
    }
}
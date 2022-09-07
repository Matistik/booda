/**
 * Created by matistikoff on 26. 8. 2022.
 */

import {api, LightningElement, track} from 'lwc';

export default class AppStandardyWrapper extends LightningElement {

    @api flatID
    @track miestnosti = true;
    @track prvky= false;
    @track vyberPrvku = false;
    @track castiPrvku = false;
    @track produkty = false;
    @track miestnostID;
    @track selectedProducts = [];
    @track mainProductId;
    @track prvokID;
    @track vyberPrvokID;
    @track castPrvkuID;
    @track productID;


    goToMiestnosti(){
        //this.vyberPrvku = !this.vyberPrvku;
        this.prvky = !this.prvky;
        this.miestnosti =!this.miestnosti;
    }



    goToPrvky(event){
        //this.vyberPrvku = !this.vyberPrvku;
        this.miestnostID = event.detail.id;
        this.miestnosti =!this.miestnosti;
        this.prvky = !this.prvky;
    }
    goToPrvkyFromPrvok(){
        this.produkty=false;
        this.castiPrvku = false;
        this.vyberPrvku = false;
        this.prvky = true;
    }
    goToMiestnostiFromPrvok(){
        this.produkty=false;
        this.castiPrvku = false;
        this.vyberPrvku = false;
        this.prvky = false;
        this.miestnosti =true;
    }
    goToPrvokFromTab(){
        this.produkty=false;
        this.castiPrvku = false;
        this.prvky = false;
        this.vyberPrvku = true;
    }
    goToCastiFromTab(){
        this.produkty=false;
        this.castiPrvku = false;
        this.prvky = false;
        this.castiPrvku = true;
    }

    goToVybranyPrvok(event){
        this.prvokID=event.detail.id
        this.prvky = !this.prvky;
        this.vyberPrvku = !this.vyberPrvku;

}

    goToCastiPrvku(event){
        this.vyberPrvokID=event.detail.id
        this.vyberPrvku = !this.vyberPrvku;
        this.castiPrvku =!this.castiPrvku;

       // this.template.querySelector("c-app_-standardy-casti-prvku").getProductOptions(this.vyberPrvku, this.vyberPrvku)

    }

    goToCastiPrvkuFromProduct(){
        console.log('vyberWrap ')
        this.produkty = !this.produkty;
        this.castiPrvku =!this.castiPrvku;

    }

    renderConcreteOptions(event){
        this.castPrvkuID = event.detail.id;
        this.productID = event.detail.productid;
        this.castiPrvku = !this.castiPrvku;
        this.produkty = !this.produkty;
    }




}
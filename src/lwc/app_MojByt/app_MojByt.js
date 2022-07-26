/**
 * Created by Maind on 10. 8. 2022.
 */

import {api, LightningElement, track} from 'lwc';
import getByt from '@salesforce/apex/DashboardController.getByt';
import getUnreadMenezer from '@salesforce/apex/KomunikaciaController.getCountOfUnreadMessagesFromMenezer';
import getUnreadMenezerApp from '@salesforce/apex/KomunikaciaController.getCountOfUnreadMessagesFromMenezerApp';

export default class AppMojByt extends LightningElement {
    @api flatID;
    @api caseID;

    @track unreadMenezer;
    @track unreadAll;
    @track bytData;
    @track mojByt = true;
    @track miestnosti = false;
    @track podorysy = false;
    @track standardy = false;
    @track klz = false;
    @track subory = false;
    @track terminy = false;
    @track spravy = false;

    goToPodorysy() {
        this.mojByt = !this.mojByt;
        this.podorysy = !this.podorysy;
    }

    goToZoznamMiestnosti() {
        this.mojByt = !this.mojByt;
        this.miestnosti = !this.miestnosti;
    }

    goToStandardy() {
        this.mojByt = !this.mojByt;
        this.standardy = !this.standardy;
    }

    goToKlz() {
        this.mojByt = !this.mojByt;
        this.klz = !this.klz;
    }

    goToSubory() {
        this.mojByt = !this.mojByt;
        this.subory = !this.subory;
    }

    goToTerminy() {
        this.mojByt = !this.mojByt;
        this.terminy = !this.terminy;
    }

    goToSpravy() {
        this.mojByt = !this.mojByt;
        this.spravy = !this.spravy;
    }

    renderedCallback() {
        this.getBytData();
        this.getUnreadMenezer();
    }

    getUnreadMenezer(){
        getUnreadMenezer({flatId: this.flatID})
            .then(response =>
            {this.unreadMenezer = response;
            })
            .catch(error => {
                console.error(error);
            })
    }

    getBytData() {
        getByt({bytId: this.flatID})
            .then(response => {
                this.bytData = response;

            })
            .catch(error => {
                console.error(error);
            })
    }
}
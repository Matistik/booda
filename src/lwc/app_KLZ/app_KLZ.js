/**
 * Created by mgons on 8/11/2022.
 */

import {api, LightningElement, track} from 'lwc';
import getByt from '@salesforce/apex/DashboardController.getByt';

export default class AppKlz extends LightningElement {
//     @api flatID;
//     @track bytData;
//
//     @track mojByt = false;
//     @track klz = true;
//
//     goToMojByt(){
//         this.mojByt = !this.mojByt;
//         this.klz = !this.klz;
//     }
//
//     renderedCallback() {
//         this.getBytData();
//     }
//
//     getBytData() {
//         console.log("flatid;;;;"+this.flatID);
//
//         getByt({ bytId: this.flatID })
//             .then(response => {
//                 this.bytData = response;
//
//             })
//             .catch(error => {
//                 console.error(error);
//             })
//     }
}
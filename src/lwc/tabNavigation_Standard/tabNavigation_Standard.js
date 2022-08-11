/**
 * Created by matistikoff on 21. 7. 2022.
 */

import {api, LightningElement, track} from 'lwc';
import getLineItem from '@salesforce/apex/StandardyController.getLineItems';

export default class TabNavigationStandard extends LightningElement {

    @api flatID;

    @track renderPrvky = false;
    @track renderDruhy = true;
    @track druhyData = [];
    button1 = "blue"
    button2 = "gray"

    renderedCallback() {
        this.getLineItem();
    }
    getLineItem(){
        getLineItem({lineId: this.flatID})
            .then(response => {
                this.druhyData = response;
            })
            .catch(error => {
                console.log(error);
            })
    }


    goTo(){
        this.flatID
        this.renderPrvky = !this.renderPrvky;
        this.renderDruhy = !this.renderDruhy;
    }

}
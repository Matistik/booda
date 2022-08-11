import {api, LightningElement, track, wire} from 'lwc';
import getLineItem from '@salesforce/apex/StandardyController.getLineItems';

export default class TabNavigationStandardPrvky extends LightningElement {

    @api flatID;
    @track StandardyData = [];

    @track renderPrvky = true;
    @track renderDruhy = false;
    button2 = "blue"
    button1 = "gray"

    renderedCallback() {
        this.getLineItem();
    }
    getLineItem(){
        getLineItem({lineId: this.flatID})
            .then(response => {
                this.StandardyData = response;
        })
            .catch(error => {
                console.log(error);
            })
    }


    goTo(){
        this.flatID;
        this.renderPrvky = !this.renderPrvky;
        this.renderDruhy = !this.renderDruhy;
    }

}
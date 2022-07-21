/**
 * Created by matistikoff on 21. 7. 2022.
 */

import {api, LightningElement, track} from 'lwc';
import {updateRecord} from "lightning/uiRecordApi";

export default class DashboardStavSpracovania extends LightningElement {

    styleName1 = "red";
    styleName2 = `default`;
    styleName3 = `default`;
    @api recordId = 'a027R00000tHnXc';
    @track stavSpracovania = true;
    @track dvere;


    /*connectedCallback() {
        this.handleLoadInit();
    }

    disconnectedCallback() {
        console.log(this.dvere)
    }*/


   /* handleLoadInit() {
        getDvere()
            .then(result => {
                this.stavSpracovania = result;

                console.log('dvere::: ' + this.stavSpracovania.Dvere__c);
                console.log('dvereTRACK::: ' + this.dvere);

                switch(this.stavSpracovania.Dvere__c) {
                    case '1':
                        console.log('zavolana 1');
                        this.changeStyle1();
                        break;
                    case '2':
                        console.log('zavolana 2');

                        this.changeStyle2();
                        break;
                    case '3':
                        console.log('zavolana 3');

                        this.changeStyle3();
                        break;
                }



            })
            .catch(error => {
                this.error = error;
            });
    }*/

   /* handleLoad() {
        getDvere()
            .then(result => {
                this.stavSpracovania = result;

                console.log('dvere::: ' + this.stavSpracovania.Dvere__c);


            })
            .catch(error => {
                this.error = error;
            });
    }*/

    changeStyle1(){

        //this.handleLoad();



        //this.updateField('1');

        this.styleName1 = "red";
        this.styleName2 = "default"
        this.styleName3 = "default"
}
    changeStyle2(){
        //this.handleLoad();
        this.styleName1 = "orange"
        this.styleName2="orange"
        this.styleName3="default"

       // this.updateField('2');
    }
    changeStyle3(){
        //this.handleLoad();
        this.styleName1="green"
        this.styleName2="green"
        this.styleName3="green"

       // this.updateField('3');
    }

    /*updateField(parameter1) {
        this.dvere = parameter1;
        const fields = {};

        fields[ID_FIELD.fieldApiName] = this.recordId;
        fields[DVERE_FIELD.fieldApiName] = parameter1;

        const recordInput = {
            fields: fields
        };

        updateRecord(recordInput).then((record) => {
            console.log(record);
        });
    }*/

}
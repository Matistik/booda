/**
 * Created by matistikoff on 21. 7. 2022.
 */

import {api, LightningElement, track} from 'lwc';
import {updateRecord} from "lightning/uiRecordApi";

export default class DashboardStavSpracovania extends LightningElement {

    styleDisp1 = "red";
    styleDisp2 = `default`;
    styleDisp3 = `default`;
    stylePodlahy1 = "red";
    stylePodlahy2 = `default`;
    stylePodlahy3 = `default`;
    styleDvere1 = "red";
    styleDvere2 = `default`;
    styleDvere3 = `default`;
    styleObklady1 = "red";
    styleObklady2 = `default`;
    styleObklady3 = `default`;
    styleSanita1 = "red";
    styleSanita2 = `default`;
    styleSanita3 = `default`;
    styleKuchyna1 = "red";
    styleKuchyna2 = `default`;
    styleKuchyna3 = `default`;
    styleNameSTA1 = "red";
    styleNameSTA2 = `default`;
    styleNameSTA3 = `default`;
    styleEI1 = "red";
    styleEI2 = `default`;
    styleEI3 = `default`;
    styleSLAB1 = "red";
    styleSLAB2 = `default`;
    styleSLAB3 = `default`;
    styleZTI1 = "red";
    styleZTI2 = `default`;
    styleZTI3 = `default`;
    styleVZT1 = "red";
    styleVZT2 = `default`;
    styleVZT3 = `default`;
    styleUKCHL1 = "red";
    styleUKCHL2 = `default`;
    styleUKCHL3 = `default`;
    styleKupStu1 = "red";
    styleKupStu2 = `default`;
    styleKupStu3 = `default`;
    styleTechSp1 = "red";
    styleTechSp2 = `default`;
    styleTechSp3 = `default`;
    styleZapPa1 = "red";
    styleZapPa2 = `default`;
    styleZapPa3 = `default`;

    @api recordId = 'a027R00000tHnXc';
    @track stavSpracovania = true;
    @track dvere;
    @api flatID;




    disconnectedCallback() {
        console.log(this.dvere)
    }




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

    changeStyleDisp1(){
        //this.handleLoad();
        //this.updateField('1');
        this.styleDisp1  = "red"
        this.styleDisp2 = "default"
        this.styleDisp3 = "default"

}
    changeStyleDisp2(){
        //this.handleLoad();
        this.styleDisp1 = "orange"
        this.styleDisp2="orange"
        this.styleDisp3="default"
       // this.updateField('2');
    }
    changeStyleDisp3(){
        //this.handleLoad();
        this.styleDisp1="green"
        this.styleDisp2="green"
        this.styleDisp3="green"
       // this.updateField('3');
    }

    changeStylePodlahy1(){
        //this.handleLoad();
        //this.updateField('1');
        this.stylePodlahy1  = "red"
        this.stylePodlahy2 = "default"
        this.stylePodlahy3 = "default"

    }
    changeStylePodlahy2(){
        //this.handleLoad();
        this.stylePodlahy1= "orange"
        this.stylePodlahy2="orange"
        this.stylePodlahy3="default"
        // this.updateField('2');
    }
    changeStylePodlahy3(){
        //this.handleLoad();
        this.stylePodlahy1="green"
        this.stylePodlahy2="green"
        this.stylePodlahy3="green"
        // this.updateField('3');
    }
    changeStyleDvere1(){
        //this.handleLoad();
        //this.updateField('1');
        this.styleDvere1= "red"
        this.styleDvere2= "default"
        this.styleDvere3 = "default"

    }
    changeStyleDvere2(){
        //this.handleLoad();
        this.styleDvere1 = "orange"
        this.styleDvere2="orange"
        this.styleDvere3="default"
        // this.updateField('2');
    }
    changeStyleDvere3(){
        //this.handleLoad();
        this.styleDvere1="green"
        this.styleDvere2="green"
        this.styleDvere3="green"
        // this.updateField('3');
    }

    changeStyleObklady1(){
        //this.handleLoad();
        //this.updateField('1');
        this.styleObklady1  = "red"
        this.styleObklady2 = "default"
        this.styleObklady3 = "default"

    }
    changeStyleObklady2(){
        //this.handleLoad();
        this.styleObklady1 = "orange"
        this.styleObklady2 ="orange"
        this.styleObklady3 ="default"
        // this.updateField('2');
    }
    changeStyleObklady3(){
        //this.handleLoad();
        this.styleObklady1 ="green"
        this.styleObklady2 ="green"
        this.styleObklady3 ="green"
        // this.updateField('3');
    }
    changeStyleSanita1(){
        //this.handleLoad();
        //this.updateField('1');
        this.styleSanita1  = "red"
        this.styleSanita2 = "default"
        this.styleSanita3 = "default"

    }
    changeStyleSanita2(){
        //this.handleLoad();
        this.styleSanita1 = "orange"
        this.styleSanita2="orange"
        this.styleSanita3="default"
        // this.updateField('2');
    }
    changeStyleSanita3(){
        //this.handleLoad();
        this.styleSanita1="green"
        this.styleSanita2="green"
        this.styleSanita3="green"
        // this.updateField('3');
    }

    changeStyleKuchyna1(){
        //this.handleLoad();
        //this.updateField('1');
        this.styleKuchyna1  = "red"
        this.styleKuchyna2 = "default"
        this.styleKuchyna3 = "default"

    }
    changeStyleKuchyna2(){
        //this.handleLoad();
        this.styleKuchyna1 = "orange"
        this.styleKuchyna2="orange"
        this.styleKuchyna3="default"
        // this.updateField('2');
    }
    changeStyleKuchyna3(){
        //this.handleLoad();
        this.styleKuchyna1="green"
        this.styleKuchyna2="green"
        this.styleKuchyna3="green"
        // this.updateField('3');
    }
    changeStyleSTA1(){
        //this.handleLoad();
        //this.updateField('1');
        this.styleNameSTA1  = "red"
        this.styleNameSTA2 = "default"
        this.styleNameSTA3 = "default"

    }
    changeStyleSTA2(){
        //this.handleLoad();
        this.styleNameSTA1 = "orange"
        this.styleNameSTA2="orange"
        this.styleNameSTA3="default"
        // this.updateField('2');
    }
    changeStyleSTA3(){
        //this.handleLoad();
        this.styleNameSTA1="green"
        this.styleNameSTA2="green"
        this.styleNameSTA3="green"
        // this.updateField('3');
    }
    changeStyleEI1(){
        //this.handleLoad();
        //this.updateField('1');
        this.styleEI1  = "red"
        this.styleEI2 = "default"
        this.styleEI3 = "default"

    }
    changeStyleEI2(){
        //this.handleLoad();
        this.styleEI1 = "orange"
        this.styleEI2="orange"
        this.styleEI3="default"
        // this.updateField('2');
    }
    changeStyleEI3(){
        //this.handleLoad();
        this.styleEI1="green"
        this.styleEI2="green"
        this.styleEI3="green"
        // this.updateField('3');
    }
    changeStyleSLAB1(){
        //this.handleLoad();
        //this.updateField('1');
        this.styleSLAB1  = "red"
        this.styleSLAB2 = "default"
        this.styleSLAB3 = "default"

    }
    changeStyleSLAB2(){
        //this.handleLoad();
        this.styleSLAB1 = "orange"
        this.styleSLAB2="orange"
        this.styleSLAB3="default"
        // this.updateField('2');
    }
    changeStyleSLAB3(){
        //this.handleLoad();
        this.styleSLAB1="green"
        this.styleSLAB2="green"
        this.styleSLAB3="green"
        // this.updateField('3');
    }
    changeStyleZTI1(){
        //this.handleLoad();
        //this.updateField('1');
        this.styleZTI1  = "red"
        this.styleZTI2 = "default"
        this.styleZTI3 = "default"

    }
    changeStyleZTI2(){
        //this.handleLoad();
        this.styleZTI1 = "orange"
        this.styleZTI2="orange"
        this.styleZTI3="default"
        // this.updateField('2');
    }
    changeStyleZTI3(){
        //this.handleLoad();
        this.styleZTI1="green"
        this.styleZTI2="green"
        this.styleZTI3="green"
        // this.updateField('3');
    }
    changeStyleVZT1(){
        //this.handleLoad();
        //this.updateField('1');
        this.styleVZT1  = "red"
        this.styleVZT2 = "default"
        this.styleVZT3 = "default"

    }
    changeStyleVZT2(){
        //this.handleLoad();
        this.styleVZT1 = "orange"
        this.styleVZT2="orange"
        this.styleVZT3="default"
        // this.updateField('2');
    }
    changeStyleVZT3(){
        //this.handleLoad();
        this.styleVZT1="green"
        this.styleVZT2="green"
        this.styleVZT3="green"
        // this.updateField('3');
    }
    changeStyleUKCHL1(){
        //this.handleLoad();
        //this.updateField('1');
        this.styleUKCHL1  = "red"
        this.styleUKCHL2 = "default"
        this.styleUKCHL3 = "default"

    }
    changeStyleUKCHL2(){
        //this.handleLoad();
        this.styleUKCHL1 = "orange"
        this.styleUKCHL2="orange"
        this.styleUKCHL3="default"
        // this.updateField('2');
    }
    changeStyleUKCHL3(){
        //this.handleLoad();
        this.styleUKCHL1="green"
        this.styleUKCHL2="green"
        this.styleUKCHL3="green"
        // this.updateField('3');
    }
    changeStyleKupStu1(){
        //this.handleLoad();
        //this.updateField('1');
        this.styleKupStu1  = "red"
        this.styleKupStu2 = "default"
        this.styleKupStu3 = "default"

    }
    changeStyleKupStu2(){
        //this.handleLoad();
        this.styleKupStu1 = "orange"
        this.styleKupStu2="orange"
        this.styleKupStu3="default"
        // this.updateField('2');
    }
    changeStyleKupStu3(){
        //this.handleLoad();
        this.styleKupStu1="green"
        this.styleKupStu2="green"
        this.styleKupStu3="green"
        // this.updateField('3');
    }
    changeStyleTechSp1(){
        //this.handleLoad();
        //this.updateField('1');
        this.styleTechSp1  = "red"
        this.styleTechSp2 = "default"
        this.styleTechSp3 = "default"

    }
    changeStyleTechSp2(){
        //this.handleLoad();
        this.styleTechSp1 = "orange"
        this.styleTechSp2="orange"
        this.styleTechSp3="default"
        // this.updateField('2');
    }
    changeStyleTechSp3(){
        //this.handleLoad();
        this.styleTechSp1="green"
        this.styleTechSp2="green"
        this.styleTechSp3="green"
        // this.updateField('3');
    }
    changeStyleZapPa1(){
        //this.handleLoad();
        //this.updateField('1');
        this.styleZapPa1  = "red"
        this.styleZapPa2 = "default"
        this.styleZapPa3 = "default"

    }
    changeStyleZapPa2(){
        //this.handleLoad();
        this.styleZapPa1 = "orange"
        this.styleZapPa2="orange"
        this.styleZapPa3="default"
        // this.updateField('2');
    }
    changeStyleZapPa3(){
        //this.handleLoad();
        this.styleZapPa1="green"
        this.styleZapPa2="green"
        this.styleZapPa3="green"
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
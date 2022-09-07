/**
 * Created by Maind on 26. 8. 2022.
 */

import {track, api, LightningElement} from 'lwc';
import noveVlakno from '@salesforce/apex/NovyCommentController.noveVlakno'

export default class NoveVlakno extends LightningElement {
    @api flatID
    @track nazovVlakna;

    handleSave(){
        console.log("id byt " +this.flatID)
        this.nazovVlakna = this.template.querySelector('.nazovVlakna').value
        noveVlakno({flatId: this.flatID, nazov: this.nazovVlakna })
            .then(result =>{
                this.nazovVlakna = {};
            })
            .catch(error =>{
                this.error = error.message;
        })
        this.dispatchEvent(new CustomEvent('closevlakno'));
        this.dispatchEvent(new CustomEvent('closevlaknoapp'));
        this.dispatchEvent(new CustomEvent('rendervlakno'));
        this.dispatchEvent(new CustomEvent('rendervlaknoapp'));
    }

}
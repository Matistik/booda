/**
 * Created by mgons on 9/4/2022.
 */

import {api,LightningElement,track} from 'lwc';

export default class TabNavigationKlzPopRightWrapper extends LightningElement {

    @api flatID;
    @api klzID;
    @track detail=true;
    @track oznacenie =false;

    goToDetail(){
        this.detail = !this.detail;

}
    goToOznacenie(){
        this.oznacenie =!this.oznacenie;
        this.detail = !this.detail;

    }
}
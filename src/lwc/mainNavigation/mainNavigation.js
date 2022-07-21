/**
 * Created by matistikoff on 21. 7. 2022.
 */

import {LightningElement} from 'lwc';

export default class MainNavigation extends LightningElement {

    handleRenderToKlz(){
        this.dispatchEvent(new CustomEvent('klz'));
    }

    handleRenderToFlats(){
        this.dispatchEvent(new CustomEvent('flat'));
    }

    handleRenderToHome(){
        this.dispatchEvent(new CustomEvent('home'));
    }

}
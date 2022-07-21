/**
 * Created by matistikoff on 21. 7. 2022.
 */

import {LightningElement} from 'lwc';

export default class TabNavigationKlzWrapper extends LightningElement {


    handleRenderToHome(){
        this.dispatchEvent(new CustomEvent('home'))
    }

    handleRenderToKlz(){
        this.dispatchEvent(new CustomEvent('klz'))
    }



    handleRenderToFlat(){
        this.dispatchEvent(new CustomEvent('flat'))
    }

}
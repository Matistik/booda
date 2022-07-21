/**
 * Created by matistikoff on 21. 7. 2022.
 */

import {LightningElement} from 'lwc';

export default class TabNavigationKlz extends LightningElement {

    renderToKlzWrapper(){
        this.dispatchEvent(new CustomEvent('newklz'))
    }

}
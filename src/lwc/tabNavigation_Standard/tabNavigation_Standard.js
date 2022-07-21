/**
 * Created by matistikoff on 21. 7. 2022.
 */

import {LightningElement, track} from 'lwc';

export default class TabNavigationStandard extends LightningElement {

    @track renderPrvky = false;
    @track renderDruhy = true;
    button1 = "blue"
    button2 = "gray"

    goTo(){
        this.renderPrvky = !this.renderPrvky;
        this.renderDruhy = !this.renderDruhy;
    }

}
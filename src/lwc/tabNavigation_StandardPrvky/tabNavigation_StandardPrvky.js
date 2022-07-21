/**
 * Created by matistikoff on 21. 7. 2022.
 */

import {LightningElement, track} from 'lwc';

export default class TabNavigationStandardPrvky extends LightningElement {

    @track renderprvky = true;
    @track renderdruhy = false;
    button2 = "blue"
    button1 = "gray"

    goTo(){
        this.renderprvky = !this.renderprvky;
        this.renderdruhy = !this.renderdruhy;
    }

}
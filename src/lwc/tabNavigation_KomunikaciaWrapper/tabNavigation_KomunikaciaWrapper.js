/**
 * Created by Maind on 3. 8. 2022.
 */

import {api, LightningElement} from 'lwc';

export default class TabNavigationKomunikaciaWrapper extends LightningElement {
    @api flatID;

    renderComments(event) {
        this.template.querySelector("c-tab-navigation_-komunikacia_-comments").getCaseCommentApi(event.detail.id);
        this.template.querySelector("c-tab-navigation_-komunikacia_-comments").getSeenDate(event.detail.id);
    }

    renderVlaknaComments(event){
        this.template.querySelector("c-tab-navigation_-komunikacia_-comments").getVlaknoCommentApi(event.detail.id);
        this.template.querySelector("c-tab-navigation_-komunikacia_-comments").getVlaknoSeenDate(event.detail.id);
    }

}
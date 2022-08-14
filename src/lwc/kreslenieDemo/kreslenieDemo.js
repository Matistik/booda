/**
 * Created by Maind on 11. 8. 2022.
 */

import {LightningElement} from 'lwc';
import image from '@salesforce/resourceUrl/DvaIzbovyPodorys'
import { loadScript, loadStyle } from 'lightning/platformResourceLoader';
import jQuery from '@salesforce/resourceUrl/jquey';
export default class KreslenieDemo extends LightningElement {
    img=image;

    renderedCallback(){
        loadScript(this, jQuery)
            .then(() => {
                console.log('JQuery loaded.');
            })
            .catch(error=>{
                console.log('Failed to load the JQuery : ' +error);
            });
    }


}

(function($){

    $(this.template).click(function (ev) {
        $(".marker").remove();
        $("body").append(
            $('<div class="marker"></div>').css({
                position: 'absolute',
                top: ev.pageY + 'px',
                left: ev.pageX + 'px',
                width: '10px',
                height: '10px',
                background: '#000000'
            })
        );
    });

})(jQuery);
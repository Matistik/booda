/**
 * Created by matistikoff on 8/15/2022.
 */

import {LightningElement,track, api} from 'lwc';
import getConcreteProductOptions from '@salesforce/apex/StandardyController.getConcreteProductOptions';
import checkIfConcreteIsSelected from '@salesforce/apex/StandardyController.checkIfConcreteIsSelected';
import getActivatedProductOptions from '@salesforce/apex/StandardyController.getActivatedProductOptions';
import getImage from '@salesforce/apex/StandardyController.getImageProdukt';

export default class StandardyProduktyBottomRight extends LightningElement {


    @api prvokID;
    @track products;
    @track selectedProductId = null
    @track activatedProductID = null;
    @track isActivated;

    renderedCallback() {



    }

    @api getProductOptions(Name, ProductID, SelectedIds){

        let eventToDispatch = new CustomEvent('selected', {
            detail: {
                id: this.selectedProductId,


            }
        });
        this.dispatchEvent(eventToDispatch)


        console.log('selec' + this.selectedProductId)
        console.log('act' + this.activatedProductID)


        this.selectedProductId = null



        getConcreteProductOptions({productID: ProductID, featureName: Name, selectedIds: SelectedIds, prvokID:  this.prvokID})
            .then(response => {this.products = response



            })

            .catch(error => {console.log(error)})


        // checkIfConcreteIsSelected({productID: ProductID, featureName: Name, selectedIds: SelectedIds, prvokID:  this.prvokID})
        //     .then(response => {this.isActivated = response
        //
        //         console.log(this.isActivated)
        //
        //
        //     })
        //     .catch(error => {console.log(error)})
        //
        //
        //  budem sa musiet naucit nejaky ASYNC na toto


            getActivatedProductOptions({productID: ProductID, featureName: Name, selectedIds: SelectedIds, prvokID:  this.prvokID})
                .then(response => {this.activatedProductID = response
                })
                .catch(error => {console.log(error)})





    }

    handleChange(event){


        if (this.activatedProductID != null && this.selectedProductId === null){
            this.selectedProductId = this.activatedProductID;
        }

        if (this.selectedProductId == null){
            this.selectedProductId = event.currentTarget.dataset.id;
        }

        else if (event.currentTarget.dataset.id === this.selectedProductId){
            this.selectedProductId = null;
        }

        else {
            let currentId = event.currentTarget.dataset.id
            const theDiv = this.template.querySelector('[data-id="' +this.selectedProductId+ '"]');
            theDiv.checked = false
            this.selectedProductId = currentId;
        }
    }

    @api resetData(){
        this.products = null;
    }
    @track imgModal =false;
    @track image ;

    openImgModal(event) {
        this.imgModal = true;
        let img=event.currentTarget.dataset.id;
        console.log('img '+img)
        getImage({imgId:img}).then(response => {this.image =response
            console.log('image '+JSON.stringify(this.image))

        })
            .catch(error => {
                console.log(error);

            })

    }


    closeImgModal() {
        this.imgModal = false;
    }

}
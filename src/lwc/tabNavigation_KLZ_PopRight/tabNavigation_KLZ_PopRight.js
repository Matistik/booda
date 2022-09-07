/**
 * Created by matistikoff on 21. 7. 2022.
 */

import {api, LightningElement, track} from 'lwc';
import getConcreteKLZ from '@salesforce/apex/KLZController.getConcreteKLZ';
import getKalkulacia from '@salesforce/apex/KalkulaciaController.getKalkulacia';
import getSumaKalkulacia from '@salesforce/apex/KalkulaciaController.getSumaKalkulacia';
import updateCaseRecord from '@salesforce/apex/NovaKLZController.updateCaseRecord';
import deleteKalkulacia from '@salesforce/apex/NovaKLZController.deleteKalkulacia';

export default class TabNavigationKlzPopRight extends LightningElement {

    @api flatID;
    @api prvokID
    @api klzID;
    @api kalkulaciaID

    @track ConcreteKLZData;
    @track sumaKalkulacia;
    @track internePoznamky
    @track poznamkyPreKlienta
    @track status
    @track value;
    @track kalkulaciaData;
    @track openModal = false;
    @track prvokModal = false;
    @track leftKlzID
    @track podorysModal = false;

    openPrvokModal(){
        console.log("som true")
        this.prvokModal = true;
    }
    closePrvokModal(){
        this.prvokModal = false
    }


    openKalModal() {
        this.openModal = true;
    }

    closeKalModal() {
        this.openModal = false;
        this.getConcreteKLZ(this.klzID)
    }
    openPodorysModal() {
        this.podorysModal = true;
    }

    closePodorysModal() {
        this.podorysModal = false;

    }



    connectedCallback() {
        this.getConcreteKLZInit();
        this.getKalkulacia()
        this.getSumKalkulacia()
    }




    get options() {
        return [
            { label: 'Rozpracovaná', value: 'new' },
            { label: 'Zadaná klientom', value: 'inProgress' },
            { label: 'Nacenená', value: 'finished' },
            { label: 'Odsúhlasená klientom', value: 'odsuhlasenaKlientom' },
            { label: 'Zamietnutá stavbou', value: 'odsuhlasenaStavbou' },
            { label: 'Zamietnutá klientom', value: 'zamietnutaKlientom' },
            { label: 'Odovzdané k realizácii', value: 'realizacia' },
        ];
    }




     getConcreteKLZInit(){

        console.log("mamamia "+this.klzID)
        getConcreteKLZ({klzID: this.klzID})
            .then(response => {
                this.ConcreteKLZData = response;
                console.log('conn' + JSON.stringify(this.ConcreteKLZData))

            })
            .catch(error => {
                console.log(error);
            })
    }

    @api getConcreteKLZ(ahoj){
        this.leftKlzID = ahoj
        this.klzID = ahoj
        getConcreteKLZ({klzID: this.klzID})
            .then(response => {
                this.ConcreteKLZData = response;
            })
            .catch(error => {
                console.log(error);
            })
        this.getKalkulacia()
        this.getSumKalkulacia()
    }

    // renderedCallback() {
    //
    // }


    getKalkulacia(){
        getKalkulacia({zmena: this.klzID})
            .then(response => {
                this.kalkulaciaData = response;

            })
            .catch(error => {
                console.error(error);
            })
    }

    getSumKalkulacia(){
        getSumaKalkulacia({zmena: this.klzID})
            .then(response => {
                this.sumaKalkulacia = response;

            })
            .catch(error => {
                console.error(error);
            })
    }


    handleUpdateKlz() {
        console.log('nastal update '+ this.klzID)
        this.internePoznamky = this.template.querySelector('.poznamky').value
        this.poznamkyPreKlienta = this.template.querySelector('.poznamky-pre1').value
        this.status = this.template.querySelector('.dropdown1').value

        updateCaseRecord({id: this.klzID, prvok: this.prvokID, internep: this.internePoznamky,
            poznamkypk: this.poznamkyPreKlienta, status: this.status},)
            .then(result => {
                this.getConcreteKLZInit()
            })
            .catch(error => {
                console.error(error);
            });
    }

    getPrvok(event){
        this.prvokID = event.detail.id
        console.log("prvok id uz tu "+this.prvokID)
        this.handleUpdateKlz()
        this.closePrvokModal()
    }

    deleteKalkulacia(event){
        let caseId = event.currentTarget.dataset.id
        this.kalkulaciaID = caseId


        deleteKalkulacia({Id: this.kalkulaciaID})
            .then(result => {
                this.getConcreteKLZ(this.klzID)
            })
            .catch(error => {
                console.error(error);
            });

    }


}
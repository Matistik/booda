/**
 * Created by Maind on 15. 8. 2022.
 */

import {api, LightningElement, track} from 'lwc';
import getByt from '@salesforce/apex/DashboardController.getByt';
import getCaseComment from '@salesforce/apex/KomunikaciaController.getCaseComments';
import getSeenDate from '@salesforce/apex/KomunikaciaController.getSeenDate';
import CommentBody_FIELD from '@salesforce/schema/CaseComment.CommentBody';
import saveCommentApp from '@salesforce/apex/NovyCommentController.saveCommentFromClient';
import getVlaknoCommentApp from '@salesforce/apex/KomunikaciaController.getVlaknaComments';
import saveVlaknoKomentar from '@salesforce/apex/NovyCommentController.saveVlakno';
import getVlaknoSeenDate from '@salesforce/apex/KomunikaciaController.getVlaknoSeenDate';


export default class AppSpravyKonkretna extends LightningElement {

    @api flatID;
    @api vlaknoID;
    @api caseID;
    @track bytData;
    @track caseCommentsData = [];
    @track vlaknoCommentsData = [];
    @track seenDate;
    @track commentID;
    @track count = 0;
    @track countVlakno = 0;
    @track klzKomentarApp = false;
    @track vlaknoKomentarApp = false;
    @track saveAppKomentVlakno = [];
    @track vlaknoKomentarDate;


    @track spravy = false;
    @track concreteSprava = true;

    goToSpravy(){
        this.concreteSprava = !this.concreteSprava;
        this.spravy = !this.spravy;
        this.vlaknoID = null;
        this.caseID = null;
        this.vlaknoKomentarApp = false;
        this.klzKomentarApp = false;
    }

    connectedCallback() {
        this.getBytData();
        this.getSeenDate();
        this.getVlaknoSeenDate()
    }
    renderedCallback() {
        if(this.caseID != null) {
            this.getCaseComment();
        }
        if(this.vlaknoID != null) {
            this.getVlaknoCommentApp();
        }

    }

    getBytData() {
        getByt({ bytId: this.flatID })
            .then(response => {
                this.bytData = response;

            })
            .catch(error => {
                console.error(error);
            })
    }

    getSeenDate() {
        getSeenDate({CaseId: this.caseID})
            .then(response => {
                this.seenDate = response;
            })
            .catch(error => {
                console.log(error);
            })
    }

    getVlaknoCommentApp(){
        this.vlaknoKomentarApp = true;
        this.seenDate = null;
        getVlaknoCommentApp({vlaknaCommId: this.vlaknoID})
            .then(response => {
                this.caseID = null;
                this.caseCommentsData = false;
                this.vlaknoCommentsData = response;
            })
            .catch(error => {
                console.log(error);
            })
    }

    getVlaknoSeenDate(){
        getVlaknoSeenDate({VlaknoId: this.vlaknoID})
            .then(response => {
                this.vlaknoKomentarDate = response;
            })
            .catch(error => {
                console.log(error);
            })
    }

    getCaseComment(){
        this.vlaknoKomentarDate = false;
        this.klzKomentarApp = true;
        getCaseComment({CaseId: this.caseID})
            .then(response => {
                this.vlaknoID = null;
                this.caseCommentsData = response;
                this.vlaknoCommentsData = false;
            })
            .catch(error => {
                console.log(error);
            })
    }

    // this object have record information
    @track comments = {
        CommentBody : CommentBody_FIELD,
    };

    handleCommentBodyChange(event) {
        this.comments.CommentBody = event.target.value;
    }


    handleSaveApp()
    {
        this.count=this.count + 1;
        saveCommentApp({objComment: this.comments , caseID: this.caseID,objStatus: this.count})
            .then(result => {
                // Clear the user enter values
                this.comments = {};
            })

            .catch(error => {
                this.error = error.message;
            });

    }

    handleSaveVlaknoApp() {
        this.countVlakno=this.countVlakno + 1;
        this.saveAppKomentVlakno = this.template.querySelector('.vlaknoApp').value;
        saveVlaknoKomentar({koment: this.saveAppKomentVlakno, komentId: this.vlaknoID, objCount: this.countVlakno})
            .then(result => {
                // Clear the user enter values
                this.template.querySelector('.vlaknoApp').value = {};
            })
            .catch(error => {
                this.error = error.message;
            });
    }

    key_event (component, event, helper) {
        if (component.which === 13) {
            this.handleSaveApp();
            this.handleSaveVlaknoApp();
        }
    }

}
/**
 * Created by Maind on 3. 8. 2022.
 */

import {LightningElement, track, api} from 'lwc';
import getCaseComment from '@salesforce/apex/KomunikaciaController.getCaseComments';
import CommentBody_FIELD from '@salesforce/schema/CaseComment.CommentBody';
import saveComment from '@salesforce/apex/NovyCommentController.saveCommentRecord';
import saveVlaknoMen from '@salesforce/apex/NovyCommentController.saveVlaknoMen';
import getSeenDate from '@salesforce/apex/KomunikaciaController.getSeenDate';
import getVlaknoComment from '@salesforce/apex/KomunikaciaController.getVlaknaComments';
import getVlaknoSeenDate from '@salesforce/apex/KomunikaciaController.getVlaknoSeenDate';


export default class TabNavigationKomunikaciaComments extends LightningElement {
    @track caseCommentsData = [];
    @track vlaknoComments = [];
    @track vlaknoID;
    @track count = 0;
    @track countVlakno = 0;
    @track seenDate;
    @track seenVlakno;
    @track commentId
    @track klzCommentar = false;
    @track vlaknoCommentar = false;
    @track Koment__c;
    @track date;

    connectedCallback() {
        this.getSeenDate()

    }
    renderedCallback() {
        if(this.commentId != null){
            this.getCaseCommentApi(this.commentId)
        }
        if(this.vlaknoID != null){
            this.getVlaknoCommentApi(this.vlaknoID)
        }

    }

    @api getVlaknoCommentApi(Id) {
        this.commentId = null;
        this.klzCommentar=false;
        this.vlaknoCommentar=true;
        this.seenDate = null;
        this.vlaknoID = Id;
        getVlaknoComment({vlaknaCommId: Id})

            .then(response => {

                this.caseCommentsData = false;
                this.vlaknoComments = response;
            })
            .catch(error => {
                console.log(error);
            })
    }

    @api getCaseCommentApi(comment) {
        this.vlaknoID = null;
        this.commentId = comment
        this.klzCommentar=true;
        this.vlaknoCommentar=false;
        this.seenVlakno = null;
        getCaseComment({CaseId: this.commentId})
            .then(response => {


                this.vlaknoComments = false
                this.caseCommentsData = response;
            })
            .catch(error => {
                console.log(error);
            })
    }

    @api getSeenDate(id) {
        this.commentId = id;
        getSeenDate({CaseId: this.commentId})
            .then(response => {
                this.seenDate = response;
            })
            .catch(error => {
                console.log(error);
            })
    }

    @api getVlaknoSeenDate(id){
        this.vlaknoID = id
        getVlaknoSeenDate({VlaknoId: this.vlaknoID})
            .then(response => {
                this.seenVlakno = response;
            })
            .catch(error => {
                console.log(error);
            })
    }


    // this object have record information
    @track comments = {
        CommentBody: CommentBody_FIELD,
    };

    handleCommentBodyChange(event) {
        this.comments.CommentBody = event.target.value;
    }


    handleSave() {
            this.count = this.count + 1;
            saveComment({objComment: this.comments, caseID: this.commentId, objStatus: this.count})
                .then(result => {
                    // Clear the user enter values
                    this.comments = {};
                    this.getCaseCommentApi(this.commentId)
                })

                .catch(error => {
                    this.error = error.message;
                });
    }

    handleSaveVlaknoMen() {
        this.Koment__c=this.template.querySelector('.vlakno').value
        this.countVlakno = this.countVlakno + 1;
        console.log("count vlakno men " + this.countVlakno)
        this.date = new Date().toJSON()
        saveVlaknoMen({koment: this.Koment__c, komentId: this.vlaknoID, objDate: this.date, objCount: this.countVlakno})
            .then(result => {
                // Clear the user enter values
                this.template.querySelector('.vlakno').value = {};
                this.getVlaknoCommentApi(this.vlaknoID)
            })

            .catch(error => {
                this.error = error.message;
            });
    }

}
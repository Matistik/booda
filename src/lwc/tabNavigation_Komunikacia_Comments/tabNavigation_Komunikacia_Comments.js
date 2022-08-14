/**
 * Created by Maind on 3. 8. 2022.
 */

import {LightningElement, track, api} from 'lwc';
import getCaseComment from '@salesforce/apex/KomunikaciaController.getCaseComments';
import CommentBody_FIELD from '@salesforce/schema/CaseComment.CommentBody';
import {ShowToastEvent} from "lightning/platformShowToastEvent";
import saveComment  from '@salesforce/apex/NovyCommentController.saveCommentRecord';


export default class TabNavigationKomunikaciaComments extends LightningElement {
    @track caseCommentsData = [];
    @track commentID;

    // connectedCallback() {
    //     this.getCaseComment();
    // }

    // getCaseComment(){
    //     getCaseComment()
    //         .then(response => {
    //             this.caseCommentsData = response;
    //         })
    //         .catch(error => {
    //             console.log(error);
    //         })
    // }


    @api getCaseCommentApi(Id){

        this.commentID = Id;


        getCaseComment({CaseId: Id})
            .then(response => {
                this.caseCommentsData = response;
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
        window.console.log('FirstName ==> '+this.comments.CommentBody);
    }


        handleSave()
        {
                saveComment({objComment: this.comments , caseID: this.commentID})
                    .then(result => {
                        // Clear the user enter values
                        this.comments = {};
                        window.console.log('result ===> ' + result);
                        // Show success messsage
                        this.dispatchEvent(new ShowToastEvent({
                            title: 'Success!!',
                            message: 'Account Created Successfully!!',
                            variant: 'success'
                        }),);
                        this.getCaseCommentApi(this.commentID); 
                    })

                    .catch(error => {
                        this.error = error.message;
                    });

        }

}
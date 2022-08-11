/**
 * Created by juraj on 25/07/2022.
 */

public without sharing class KomunikaciaController {

    @AuraEnabled
    public static List<CaseComment> getCaseComments(String CaseId){
        return [SELECT
                CommentBody,
                CreatedBy.FirstName,
                CreatedBy.LastName,
                CreatedDate,
                Parent.CaseNumber,
                Parent.Subject
        FROM CaseComment WHERE ParentId=: CaseId ORDER BY CreatedDate DESC ];
    }
}
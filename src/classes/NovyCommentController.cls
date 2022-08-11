/**
 * Created by Maind on 3. 8. 2022.
 */

public without sharing class NovyCommentController {

    @AuraEnabled
    public static void saveCommentRecord(CaseComment objComment, String caseID){
        try{

            objComment.ParentId = caseID;
            insert objComment;

        }
        catch(Exception ex) {
            throw new AuraHandledException(ex.getMessage());
        }
    }

}
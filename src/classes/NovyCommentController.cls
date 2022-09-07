/**
 * Created by Maind on 3. 8. 2022.
 */

public without sharing class NovyCommentController {

    @AuraEnabled
    public static void saveCommentRecord(CaseComment objComment, String caseID, Integer objStatus){
        try{

            objComment.ParentId = caseID;
            insert objComment;

            Case c = new Case();
            c.Id = caseID;
            c.Neprecitane_spravy_od_menezera__c = objStatus;
            update c;

        }
        catch(Exception ex) {
            throw new AuraHandledException(ex.getMessage());
        }
    }

    @AuraEnabled
    public static void saveCommentFromClient(CaseComment objComment, String caseID, Integer objStatus){
        try{

            objComment.ParentId = caseID;
            insert objComment;

            Case c = new Case();
            c.Id = caseID;
            c.Neprecitane_spravy_od_klienta__c = objStatus;
            update c;

        }
        catch(Exception ex) {
            throw new AuraHandledException(ex.getMessage());
        }
    }

    @AuraEnabled
    public static void saveCommentCount(String caseId, Integer objCount,Date objDate){
        try{
            Case c = new Case();
            c.Id = caseId;
            c.Neprecitane_spravy_od_menezera__c = objCount;
            c.Videne_od_klienta__c = objDate;
            update c;
        }
        catch (Exception ex){
            throw new AuraHandledException(ex.getMessage());
        }
    }

    @AuraEnabled
    public static void saveCommentCountClient(String CaseId, Integer objCount, Date objDate){
        try{
            Case c = new Case();
            c.Id = CaseId;
            c.Neprecitane_spravy_od_klienta__c = objCount;
            c.Videne_od_menezera__c = objDate;
            update c;
        }
        catch (Exception ex){
            throw new AuraHandledException(ex.getMessage());
        }
    }

}
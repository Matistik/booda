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

    @AuraEnabled
    public static Case getSeenDate(String CaseId){
        return [SELECT
                Videne_od_menezera__c,
                Videne_od_klienta__c
        FROM Case WHERE Id=: CaseId];
    }

    @AuraEnabled
    public static AggregateResult getCountOfUnreadMessagesFromClient(String flatId){
        AggregateResult aggregateResultClient =
        (AggregateResult) [SELECT SUM(Neprecitane_spravy_od_klienta__c)
        FROM Case WHERE Byt__r.Id =: flatId];
        return aggregateResultClient;
    }

    @AuraEnabled
    public static AggregateResult getCountOfUnreadMessagesFromMenezer(String flatId){
        AggregateResult aggregateResultMenezer =
                (AggregateResult) [SELECT SUM(Neprecitane_spravy_od_menezera__c)
                FROM Case WHERE Byt__r.Id =: flatId];
        return aggregateResultMenezer;
    }
}
/**
 * Created by juraj on 26/07/2022.
 */

public without sharing class NovyKontaktController {


    @AuraEnabled
    public static void saveAccountRecord(Account objAcc, String bytId){
        try{
            Id personAccountRecordTypeId = Schema.SObjectType.Account.getRecordTypeInfosByDeveloperName().get('PersonAccount').getRecordTypeId();
            objAcc.RecordTypeId = personAccountRecordTypeId;


            insert objAcc;

            List<Byt__c> acceptedEventRelations = [SELECT Id FROM Byt__c WHERE Id =: bytId];

            acceptedEventRelations[0].Account__c = objAcc.Id;
            update acceptedEventRelations;

        }
        catch(Exception ex) {
            throw new AuraHandledException(ex.getMessage());
        }
    }

    @AuraEnabled
    public static void saveContactRecord(Account objAcc, String bytId){

        try{
            Id personAccountRecordTypeId = Schema.SObjectType.Account.getRecordTypeInfosByDeveloperName().get('PersonAccount').getRecordTypeId();
            objAcc.RecordTypeId = personAccountRecordTypeId;
            insert objAcc;
            System.debug('ahoj');
            List<Account> acceptedEventRelations2 = [SELECT Id,PersonContactId FROM Account WHERE Id =: objAcc.Id];
            List<Byt__c> acceptedEventRelations = [SELECT Id, Account__c FROM Byt__c WHERE Id =: bytId];
            AccountContactRelation acr = new AccountContactRelation();
            acr.AccountId = acceptedEventRelations[0].Account__c;



            acr.ContactId = acceptedEventRelations2[0].PersonContactId;
            insert acr;


        }
        catch(Exception ex) {
            System.debug(ex);
                 throw new AuraHandledException(ex.getMessage());
        }
    }


}
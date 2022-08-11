/**
 * Created by juraj on 25/07/2022.
 */

public without sharing class DashboardController {

    @AuraEnabled(Cacheable=true)
    public static Byt__c getByt(String bytId) {
        return [SELECT Id, Name, Etapa__c, Vchod__c,slo_ZoBKZ_KZ__c, Ozna_enie__c, Typ__c, Izbovos__c, Account__c
        FROM Byt__c WHERE Id=: bytId LIMIT 1];
    }

    @AuraEnabled(Cacheable=true)
    public static List<SBQQ__Quote__c> getStandardy(String bytId){

        List<SBQQ__Quote__c> sb = new List<SBQQ__Quote__c>();

        try {
            sb =[SELECT Id,Name  FROM SBQQ__Quote__c WHERE Byt__c=: bytId];
        } catch (System.QueryException e) {

        }

        return sb;

    }

    @AuraEnabled(Cacheable=true)
    public static List<Case> getKlientskeZmeny(String bytId){

        List<Case> c = new List<Case>();
        try {
             c =  [SELECT Id,OwnerId FROM Case WHERE Byt__c=: bytId];
        } catch (System.QueryException e) {

        }


        return c;
    }

    @AuraEnabled(Cacheable=true)
    public static Byt__c getKontakts(String bytId){
        return [SELECT Id, Account__r.Name,Account__r.Type, Account__r.PersonEmail, Account__r.Phone
        FROM Byt__c
        WHERE Byt__c.Id=: bytId];
    }

    @AuraEnabled(Cacheable=true)
    public static List<Account> getMainContact(String bytId){

        List<Byt__c> acList = [SELECT Id, Account__r.Name, Account__r.Type, Account__r.PersonEmail, Account__r.Phone
        FROM Byt__c
        WHERE Id =: bytId];

        return [SELECT Id,Name, PersonEmail, Phone, Type
        FROM Account
        WHERE Id =: acList[0].Account__r.Id];
    }



    @AuraEnabled(Cacheable=true)

    public static List<Account> getContacts(String bytId){

        List<Account> accList = new List<Account>();
        try {


            List<Byt__c> acc = [SELECT Id,Account__c FROM Byt__c WHERE Id =: bytId];
            List<Account> a = [SELECT Id FROM Account WHERE Id =:acc[0].Account__c];


        List<AccountContactRelation> acr = [SELECT Id, ContactId  FROM AccountContactRelation WHERE AccountId =: a[0].Id];

            accList=  [SELECT Id, Name, PersonContactId
            FROM Account
            WHERE PersonContactId =: acr[0].ContactId];




    }
         catch (System.ListException e) {

        }
        return accList;

    }



    @AuraEnabled(Cacheable=true)
    public static Byt__c getTerminy(String bytId) {

        return [SELECT Id, D_tum_podpisu_ZoD_ZoBKZ__c, Prijat_zadanie_KLZ__c, Zaslanie_v_zvy_KLZ_najnesk_r_do__c, Term_n_zaslania_n_vrhu_na_stretnutie__c, Dan_na_rozpo_et__c, Uz_vierka_tandardov__c
        FROM Byt__c WHERE Id=: bytId];
    }

}
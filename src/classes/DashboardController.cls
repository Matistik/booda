/**
 * Created by juraj on 25/07/2022.
 */

public with sharing class DashboardController {

    @AuraEnabled
    public static Byt__c getByt(String bytId){

        try {
            Byt__c byt = [SELECT Id, Name,Zaslanie_v_zvy_KLZ_najnesk_r_do__c, Etapa2__c, Vchod__c, slo_ZoBKZ_KZ__c,
                    Ozna_enie__c, Typ__c, Izbovos__c, Account__c,
                    Poschodie__c, Pozn_mky__c, Typ_balika_KLZ__c, Nh_Narok__c, Nh_Vycerpane__c
            FROM Byt__c
            WHERE Id =: bytId
            LIMIT 1];
            return byt;
        } catch (QueryException e) {
            System.debug(e.getMessage());
        }

        return null;
    }

    @AuraEnabled(Cacheable=true)
    public static List<SBQQ__Quote__c> getStandardy(String bytId) {

        List<SBQQ__Quote__c> sb = new List<SBQQ__Quote__c>();

        try {
            sb = [SELECT Id, Name FROM SBQQ__Quote__c WHERE Byt__c = :bytId];
        } catch (System.QueryException e) {

        }

        return sb;

    }

    @AuraEnabled
    public static List<Case> getKlientskeZmeny(String bytId) {

        List<Case> c = new List<Case>();
        try {
            c = [SELECT Id, OwnerId FROM Case WHERE Byt__c = :bytId];
        } catch (System.QueryException e) {

        }


        return c;
    }

    @AuraEnabled(Cacheable=true)
    public static Byt__c getKontakts(String bytId) {
        return [
                SELECT Id, Account__r.Name, Account__r.Type, Account__r.PersonEmail, Account__r.Phone
                FROM Byt__c
                WHERE Byt__c.Id = :bytId
        ];
    }

    @AuraEnabled(Cacheable=true)
    public static List<Account> getMainContact(String bytId) {

        List<Byt__c> acList = [
                SELECT Id, Account__r.Name, Account__r.Type, Account__r.PersonEmail, Account__r.Phone
                FROM Byt__c
                WHERE Id = :bytId
        ];

        return [
                SELECT Id, Name, PersonEmail, Phone, Type
                FROM Account
                WHERE Id = :acList[0].Account__r.Id
        ];
    }


    @AuraEnabled(Cacheable=true)

    public static List<Account> getContacts(String bytId) {

        List<Account> accList = new List<Account>();
        try {


            Byt__c acc = [SELECT Id, Name, Account__r.Name, Account__r.Id FROM Byt__c WHERE Id =: bytId];
            List<AccountContactRelation> acr = [SELECT Account.Name, Contact.Id, Contact.Name FROM AccountContactRelation WHERE AccountId =: acc.Account__r.Id];


            for (AccountContactRelation contact: acr){
                Account account = [SELECT Id, Name FROM Account WHERE Name =: contact.Contact.Name];
                accList.add(account);
            }


        } catch (System.ListException e) {

        }
        return accList;

    }


    @AuraEnabled(Cacheable=true)
    public static Byt__c getTerminy(String bytId) {

        return [
                SELECT Id, D_tum_podpisu_ZoD_ZoBKZ__c, Prijat_zadanie_KLZ__c, Zaslanie_v_zvy_KLZ_najnesk_r_do__c, Term_n_zaslania_n_vrhu_na_stretnutie__c, Dan_na_rozpo_et__c, Uz_vierka_tandardov__c
                FROM Byt__c
                WHERE Id = :bytId
        ];
    }

    @AuraEnabled(Cacheable=true)
    public static List<Etapa__c> getEtapy(String bytId) {

        List<Byt__c> b = [SELECT Etapa2__c FROM Byt__c WHERE Id =: bytId];

      return [SELECT Id,Name , DefinitivnaUzavierka__c, FixnutieMurovaciek__c, FixnutieProfesii__c, FixnutieStatiky__c, UzavierkaKLZ__c, UzavierkaStandardov__c,
              OstavaDniDU__c, OstavaDniFM__c, OstavaDniFP__c, OstavaDniFS__c, OstavaDniUKLZ__c, OstavaDniUS__c FROM Etapa__c WHERE Id =: b[0].Etapa2__c];

    }


}
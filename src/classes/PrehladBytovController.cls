/**
 * Created by matistikoff on 21. 7. 2022.
 */

public with sharing class PrehladBytovController {

    @AuraEnabled(Cacheable=true)
    public static List<Byt__c> getBytyList() {
        return [SELECT Id, Etapa__c, Vchod__c, Ozna_enie__c,slo_ZoBKZ_KZ__c, Typ__c, Izbovos__c, Account__c
        FROM Byt__c LIMIT 10

        ];
    }


    @AuraEnabled(Cacheable=true)
    public static Byt__c getByt(String bytId) {
        return [SELECT Id, Name, Etapa__c, Vchod__c,slo_ZoBKZ_KZ__c, Ozna_enie__c, Typ__c, Izbovos__c, Account__c
        FROM Byt__c WHERE Id=: bytId LIMIT 1

        ];
    }

    @AuraEnabled(Cacheable=true)
    public static Byt__c getContactsFromByt(String bytId) {
        return [SELECT Id, Name, Etapa__c, Vchod__c,slo_ZoBKZ_KZ__c, Ozna_enie__c, Typ__c, Izbovos__c, Account__c
        FROM Byt__c WHERE Id=: bytId LIMIT 1

        ];
    }

}
/**
 * Created by matistikoff on 21. 7. 2022.
 */

public without sharing class PrehladBytovController {

    @AuraEnabled(Cacheable=true)
    public static List<Byt__c> getBytyList() {
        return [SELECT Id, Etapa__c, Vchod__c, Ozna_enie__c,slo_ZoBKZ_KZ__c, Typ__c, Izbovos__c, Account__c, Poschodie__c
        FROM Byt__c
        ];
    }

    @AuraEnabled(Cacheable=true)
    public static List<Byt__c> getBytyListVchod(String vchod) {
        return [SELECT Id, Etapa__c, Vchod__c, Ozna_enie__c,slo_ZoBKZ_KZ__c, Typ__c, Izbovos__c, Account__c
        FROM Byt__c WHERE Vchod__c =: vchod
        ];
    }

    @AuraEnabled(Cacheable=true)
    public static List<Byt__c> getBytyListEtapy(String etapy) {
        return [SELECT Id, Etapa__c, Vchod__c, Ozna_enie__c,slo_ZoBKZ_KZ__c, Typ__c, Izbovos__c, Account__c
        FROM Byt__c WHERE Etapa__c =: etapy
        ];
    }

    @AuraEnabled(Cacheable=true)
    public static List<Byt__c> getBytyListVchodEtapy(String vchod, String etapy) {
        return [SELECT Id, Etapa__c, Vchod__c, Ozna_enie__c,slo_ZoBKZ_KZ__c, Typ__c, Izbovos__c, Account__c
        FROM Byt__c WHERE Vchod__c =: vchod AND Etapa__c =: etapy
        ];
    }
}
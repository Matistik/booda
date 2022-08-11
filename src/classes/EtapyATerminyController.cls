/**
 * Created by juraj on 03/08/2022.
 */

public without sharing class EtapyATerminyController {

    @AuraEnabled(Cacheable=true)
    public static List<AggregateResult> getEtapyList() {

        return [SELECT Etapa__c
        FROM Byt__c GROUP BY Etapa__c ORDER BY Etapa__c
        ];
    }

    @AuraEnabled(Cacheable=true)
    public static List<AggregateResult> getEtapyNazovList(String etapa) {

        return [SELECT Etapa__c
        FROM Byt__c  WHERE Etapa__c =: etapa GROUP BY Etapa__c
        ];
    }

    @AuraEnabled(Cacheable=true)
    public static List<Byt__c> getBytyListEtapy(String etapa) {
        return [SELECT Id, Etapa__c, Vchod__c, Ozna_enie__c,slo_ZoBKZ_KZ__c, Typ__c, Izbovos__c, Account__c
        FROM Byt__c WHERE Etapa__c =: etapa
        ];
    }

}
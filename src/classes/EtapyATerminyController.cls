/**
 * Created by juraj on 03/08/2022.
 */

public with sharing class EtapyATerminyController {

    @AuraEnabled(Cacheable=true)
    public static List<AggregateResult> getEtapyList() {

        return [SELECT Name, Id
        FROM Etapa__c GROUP BY Name,Id ORDER BY Name
        ];
    }

    @AuraEnabled
    public static List<Etapa__c> getEtapyNazovList(String etapa) {

        return [SELECT Name, Id, DefinitivnaUzavierka__c, FixnutieMurovaciek__c, FixnutieProfesii__c, FixnutieStatiky__c, UzavierkaKLZ__c, UzavierkaStandardov__c,
                OstavaDniDU__c, OstavaDniFM__c, OstavaDniFP__c, OstavaDniFS__c, OstavaDniUKLZ__c, OstavaDniUS__c
        FROM Etapa__c  WHERE Id =: etapa LIMIT 1
        ];
    }

    @AuraEnabled(Cacheable=true)
    public static List<Byt__c> getBytyListEtapy(String etapa) {
        if (etapa == null) {
            etapa = 'ahpj';
        }
        return [SELECT Id, Etapa__c, Vchod__c, Ozna_enie__c,slo_ZoBKZ_KZ__c, Typ__c, Izbovos__c, Account__c
        FROM Byt__c WHERE Etapa2__c =: etapa
        ];
    }

    @AuraEnabled(Cacheable=true)
    public static List<Etapa__c> getEtapyTerminy(String byt) {

        List<Byt__c> flat = [SELECT Id, Etapa2__r.Id FROM Byt__c WHERE Id =: byt];
        String etapaId = flat[0].Etapa2__r.Id;


        return [SELECT Id, Name, DefinitivnaUzavierka__c, FixnutieMurovaciek__c, FixnutieProfesii__c, FixnutieStatiky__c, UzavierkaKLZ__c, UzavierkaStandardov__c,
                OstavaDniDU__c, OstavaDniFM__c, OstavaDniFP__c, OstavaDniFS__c, OstavaDniUKLZ__c, OstavaDniUS__c
        FROM Etapa__c WHERE Id =: etapaId
        ];
    }

    @AuraEnabled(Cacheable=true)
    public static List<Etapa__c> getUzavretieStandarduTermin(String byt) {

        List<Byt__c> flat = [SELECT Id, Etapa2__r.Id FROM Byt__c WHERE Id =: byt];
        String etapaId = flat[0].Etapa2__r.Id;


        return [SELECT Id,  UzavierkaStandardov__c
        FROM Etapa__c WHERE Id =: etapaId
        ];
    }

}
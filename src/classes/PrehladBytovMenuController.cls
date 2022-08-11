/**
 * Created by juraj on 28/07/2022.
 */

public without sharing class PrehladBytovMenuController {

    @AuraEnabled(Cacheable=true)
    public static List<AggregateResult> getVchodyList() {

        return [SELECT Vchod__c
        FROM Byt__c GROUP BY Vchod__c ORDER BY Vchod__c
        ];

    }

    @AuraEnabled(Cacheable=true)
    public static List<AggregateResult> getEtapyList() {

        return [SELECT Etapa__c
        FROM Byt__c GROUP BY Etapa__c ORDER BY Etapa__c
        ];

    }

}
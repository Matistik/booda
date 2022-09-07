/**
 * Created by juraj on 28/07/2022.
 */

public with sharing class PrehladBytovMenuController {

    @AuraEnabled(Cacheable=true)
    public static List<AggregateResult> getVchodyList() {

        return [SELECT Vchod__c
        FROM Byt__c GROUP BY Vchod__c ORDER BY Vchod__c
        ];

    }

    @AuraEnabled(Cacheable=true)
    public static List<AggregateResult> getEtapyList() {

        return [SELECT Name, Id
        FROM Etapa__c GROUP BY Name, Id ORDER BY Name
        ];

    }

}
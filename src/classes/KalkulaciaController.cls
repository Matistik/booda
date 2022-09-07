/**
 * Created by juraj on 04/08/2022.
 */

public with sharing class KalkulaciaController {

    @AuraEnabled(Cacheable=true)
    public static List<Kalkulacia__c> getKalkulacia(String zmena) {
        return [SELECT Id, Name, Cena__c, Stav__c
        FROM Kalkulacia__c WHERE Case__c =: zmena
        ];
    }


    @AuraEnabled(Cacheable=true)
    public static AggregateResult getSumaKalkulacia(String zmena) {
        AggregateResult ar =
                (AggregateResult) [SELECT SUM(Cena__c)
                FROM Kalkulacia__c WHERE Case__c =: zmena
                ];
        return ar;
    }

}
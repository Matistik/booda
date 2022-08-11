/**
 * Created by juraj on 25/07/2022.
 */

public without sharing class MiestnostiController {

    @AuraEnabled(Cacheable=true)
    public static List<Miestnost__c> getMiestnosti(String lineId) {
        return
        [SELECT Id, Name, NazovMiestnosti__c, Oznacenie__c, Plocha__c, Poznamka__c
        FROM Miestnost__c
        WHERE Byt__c =: lineId
        ];
    }

}
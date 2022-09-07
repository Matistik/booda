/**
 * Created by juraj on 25/07/2022.
 */

public with sharing class PrvkyController {

    @AuraEnabled(Cacheable=true)
    public static List<Prvok__c> getPrvky(String lineId) {
        return
        [SELECT Id, Name, Prvok__c, Miestnost__r.NazovMiestnosti__c, Miestnost__r.Name ,Miestnost__c, SpecifikaciaPreStavbu__c
        FROM Prvok__c
        WHERE Miestnost__r.Byt__r.Id =: lineId
        ];
    }
}
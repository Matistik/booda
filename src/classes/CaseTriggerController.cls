/**
 * Created by matistikoff on 19. 8. 2022.
 */

public with sharing class CaseTriggerController {

    public static void populateKlzIdField(List<Case> cases){

        Map<Id, Case> caseMap = new Map<Id, Case>();
        caseMap.putAll(cases);

        Integer caseCount = [SELECT COUNT() FROM Case WHERE Byt__c =: cases[0].Byt__c];
        Case flatLabel = [SELECT Byt__r.Ozna_enie__c FROM Case WHERE Byt__c =: cases[0].Byt__c LIMIT 1];

        for(Id key: caseMap.keySet()){
            caseMap.get(key).ID_KLZ__c = 'KLZ-'+flatLabel.Byt__r.Ozna_enie__c+'-'+(++caseCount);
            caseCount++;
        }
    }
}
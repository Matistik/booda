/**
 * Created by Maind on 9. 8. 2022.
 */

public with sharing class PodorysController {

    @AuraEnabled
    public static  List<Byt_P_dorys__c> getPodorys(String byt) {



        return [SELECT P_dorys__r.P_dorys__c, P_dorys__r.URL_p_dorysu__c, Id
        FROM Byt_P_dorys__c WHERE Byt__c =: byt];
    }

}
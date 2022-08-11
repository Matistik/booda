/**
 * Created by juraj on 01/08/2022.
 */

public without sharing class NovaKLZController {

    @AuraEnabled
    public static void saveCaseRecord(Case objCas, String bytId){
        try{
            objCas.Byt__c = bytId;
            insert objCas;
        }
        catch (Exception ex){
            throw new AuraHandledException(ex.getMessage());
        }
    }

    @AuraEnabled
    public static void updateCaseRecord(Case objCase){
        try{

//            if (objCase.Description == null) {
//
//            }
            System.debug(LoggingLevel.INFO,'abc4'+objCase);
            update objCase;


        }
        catch (Exception ex){
            throw new AuraHandledException(ex.getMessage());

        }
    }
}
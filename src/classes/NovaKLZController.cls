/**
 * Created by juraj on 01/08/2022.
 */

public with sharing class NovaKLZController {

    @AuraEnabled
    public static String saveCaseRecord(Case objCas, String bytId){
        try{
            objCas.Byt__c = bytId;
            objCas.Status = 'Rozpracovaná';
            insert objCas;
            return objCas.Id;
        }
        catch (Exception ex){
            throw new AuraHandledException(ex.getMessage());
        }
    }

    @AuraEnabled
    public static void updateCaseRecord(String id, String prvok, String internep, String poznamkypk, String status){
        try{

            Case c = new Case();
            c.Id = id;
            c.Prvok__c = prvok;
            c.Interne_poznamky__c = internep;
            c.Poznamka_pre_klienta__c = poznamkypk;
            c.Status = status;
            update c;


        }
        catch (Exception ex){
            throw new AuraHandledException(ex.getMessage());

        }
    }

    @AuraEnabled
    public static void updateAppCaseRecord(String des, String Id){
        try{

            Case c = new Case();
            c.Description = des;
            c.Id = Id;
            update c;

        }
        catch (Exception ex){
            throw new AuraHandledException(ex.getMessage());

        }
    }

    @AuraEnabled
    public static void deleteKalkulacia(String Id){
        try{

            Kalkulacia__c k = new Kalkulacia__c();
            k.Id = Id;
            delete k;

        }
        catch (Exception ex){
            throw new AuraHandledException(ex.getMessage());

        }
    }

    @AuraEnabled
    public static void deleteKlz(String Id){
        try{

            Case c = new Case();
            c.Id = Id;
            delete c;

        }
        catch (Exception ex){
            throw new AuraHandledException(ex.getMessage());

        }
    }

}
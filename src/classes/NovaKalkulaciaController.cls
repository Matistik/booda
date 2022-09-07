/**
 * Created by juraj on 04/08/2022.
 */

public with sharing class NovaKalkulaciaController {

    @AuraEnabled
    public static void saveKalkulaciaRecord(Kalkulacia__c objKal, String klzmena){
        try{
            objKal.Case__c = klzmena;
            insert objKal;
        }
        catch (Exception ex){
            throw new AuraHandledException(ex.getMessage());
        }
    }
}
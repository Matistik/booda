/**
 * Created by Maind on 18. 8. 2022.
 */

public with sharing class MiestnostiUpdate {

    @AuraEnabled
    public static void updateMiestnosti(String Id, String Poznamky){

        try{
            Miestnost__c miestnost = new Miestnost__c();
            miestnost.Id = Id;
            miestnost.Poznamka__c = Poznamky;
            update miestnost;
        }
        catch(Exception ex){
            throw new AuraHandledException(ex.getMessage());
        }
    }
}
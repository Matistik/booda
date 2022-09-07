/**
 * Created by juraj on 17/08/2022.
 */

public with sharing class EtapyUpdate {

    @AuraEnabled
    public static void updateEtapa(String id, Date us, Date uklz, Date fp, Date fs, Date fm, Date du, String name){

        try{
            Etapa__c e = new Etapa__c();
            e.Id = id;
            e.Name = name;
            e.UzavierkaStandardov__c = us;
            e.UzavierkaKLZ__c = uklz;
            e.FixnutieProfesii__c = fp;
            e.FixnutieStatiky__c = fs;
            e.FixnutieMurovaciek__c = fm;
            e.DefinitivnaUzavierka__c = du;
            update e;

        }
        catch (Exception ex){
            throw new AuraHandledException(ex.getMessage());

        }
    }
}
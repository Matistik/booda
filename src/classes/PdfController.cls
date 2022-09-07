/**
 * Created by mgons on 8/2/2022.
 */

public with sharing class PdfController {
    public Byt__c byt{get;set;}
    public String idecko{get;set;}
    public Account acc{get;set;}
    public List<Case> KlzList{get;set;}
    public List<SBQQ__QuoteLine__c> prvkyList{get;set;}

    public PdfController() {
        idecko = getFlatIdForPdf();
        KlzList = KLZController.getKLZ(idecko);
        prvkyList = StandardyController.getJednotlivePrvky(idecko);
        acc = [SELECT Name,Phone,PersonEmail FROM Account WHERE Byt__c =:idecko LIMIT 1];
        byt = [SELECT Projekt__c,Name,Ozna_enie__c FROM Byt__c WHERE Id =:idecko];
    }

    @AuraEnabled
    public static String getFlatIdForPdf(){

        String id;

        Opportunity flatID = [SELECT Id, Description FROM Opportunity WHERE Id = '0061q00000FAsuoAAD'];

        return flatID.Description;
    }

    @AuraEnabled
    public static void setFlatIdForPdf(String flatID){


        Opportunity opportunity = [SELECT Id, Description FROM Opportunity WHERE Id = '0061q00000FAsuoAAD'];
        opportunity.Description = flatID;
        update opportunity;

    }


}
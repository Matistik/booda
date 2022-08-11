/**
 * Created by mgons on 7/29/2022.
 */

public with sharing class PdfGenerator
{

    @AuraEnabled
    public static List<Contact> getContactsController(){
        return [SELECT Id, FirstName, LastName FROM Contact LIMIT 10];
    }
}
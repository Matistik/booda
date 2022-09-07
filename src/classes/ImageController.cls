/**
 * Created by mgons on 8/8/2022.
 */

public with sharing class ImageController {
    @AuraEnabled(Cacheable=true)
    public static Product2 getImageItemsProdukt() {
        return
        [SELECT Product_Image_Link__c FROM Product2 WHERE Id = '01t1q000007zECuAAM'];
    }

}
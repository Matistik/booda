/**
 * Created by matistikoff on 10. 8. 2022.
 */

public without sharing class StandardyController {

    @AuraEnabled
    public static List<SBQQ__QuoteLine__c> getLineItems(String lineId) {
        return
        [SELECT Id, Miestnos__c,SBQQ__ProductFamily__c,SBQQ__Product__r.Name
        FROM SBQQ__QuoteLine__c
                WHERE SBQQ__QuoteLine__c.SBQQ__Quote__r.Byt__r.Id=: lineId AND Miestnos__c != NULL
        ];
    }

    @AuraEnabled
    public static List<SBQQ__QuoteLine__c> getLineItemsMiestnost(String lineId, String miestnost) {
        return
        [SELECT Id, Miestnos__c,SBQQ__ProductFamily__c,SBQQ__Product__r.Name
        FROM SBQQ__QuoteLine__c
        WHERE SBQQ__QuoteLine__c.SBQQ__Quote__r.Byt__r.Id=: lineId AND Miestnos__c != NULL AND Miestnos__c =: miestnost
        ];
    }

    @AuraEnabled
    public static List<SBQQ__QuoteLine__c> getLineItemsProdukt(String lineId, String product) {
        return
        [SELECT Id, Miestnos__c,SBQQ__ProductFamily__c,SBQQ__Product__r.Name
        FROM SBQQ__QuoteLine__c
        WHERE SBQQ__QuoteLine__c.SBQQ__Quote__r.Byt__r.Id=: lineId AND Miestnos__c != NULL AND SBQQ__ProductFamily__c =: product
        ];
    }


    @AuraEnabled
    public static AggregateResult getLineCount(String lineId) {
        AggregateResult ar =
                (AggregateResult) [SELECT COUNT(Id)
                FROM SBQQ__QuoteLine__c
                WHERE SBQQ__QuoteLine__c.SBQQ__Quote__r.Byt__r.Id=: lineId
                ];
        return ar;
    }

    @AuraEnabled
    public static List<AggregateResult> getDistinctRooms(String lineId) {
        List<AggregateResult> ar =
                [SELECT COUNT(Id), Miestnos__c
                FROM SBQQ__QuoteLine__c
                WHERE SBQQ__QuoteLine__c.SBQQ__Quote__r.Byt__r.Id=: lineId
                        GROUP BY Miestnos__c
                ];
        return ar;
    }

    //soql queries po prekopani standardov

    @AuraEnabled
    public static Id getFlatIdAsProduct(String flatID) {
        SBQQ__QuoteLine__c quoteLine =
        [SELECT Id, Miestnos__c,SBQQ__ProductFamily__c,SBQQ__Product__r.Name, SBQQ__Product__r.Id
        FROM SBQQ__QuoteLine__c
        WHERE SBQQ__QuoteLine__c.SBQQ__Quote__r.Byt__r.Id=: flatID AND SBQQ__Number__c = 1 LIMIT 1
        ];

        return quoteLine.SBQQ__Product__r.Id;

    }

    @AuraEnabled
    public static List<SBQQ__ProductFeature__c> getFlatStandards(String flatID) {
        SBQQ__QuoteLine__c quoteLine =
        [SELECT Id, Miestnos__c,SBQQ__ProductFamily__c,SBQQ__Product__r.Name, SBQQ__Product__r.Id
        FROM SBQQ__QuoteLine__c
        WHERE SBQQ__QuoteLine__c.SBQQ__Quote__r.Byt__r.Id=: flatID AND SBQQ__Number__c = 1 LIMIT 1
        ];

        Id flatIdAsProduct = quoteLine.SBQQ__Product__r.Id;

        List<SBQQ__ProductFeature__c> standards = [SELECT Id, Name, SBQQ__ConfiguredSKU__r.Id FROM SBQQ__ProductFeature__c WHERE SBQQ__ConfiguredSKU__r.Id =: flatIdAsProduct];

        return standards;

    }

    @AuraEnabled
    public static List<SBQQ__ProductOption__c> getStandardsForRooms(String flatIdAsProduct, String featureID) {

        List<SBQQ__ProductOption__c> standardsForRooms =
        [SELECT Id, Name, SBQQ__ConfiguredSKU__r.Id, SBQQ__OptionalSKU__r.Name, SBQQ__Feature__r.Id, SBQQ__OptionalSKU__r.Id
        FROM SBQQ__ProductOption__c
        WHERE SBQQ__ConfiguredSKU__r.Id =: flatIdAsProduct AND SBQQ__Feature__r.Id =: featureID
        ];

        return standardsForRooms;

    }

    @AuraEnabled
    public static List<SBQQ__ProductFeature__c> getProductsFromStandard(String standardID) {

        List<SBQQ__ProductFeature__c> productTypes =

        [SELECT Id, Name, SBQQ__ConfiguredSKU__r.Id, SBQQ__MaxOptionCount__c, SBQQ__ConfiguredSKU__r.Name
        FROM SBQQ__ProductFeature__c
        WHERE SBQQ__ConfiguredSKU__r.Id =: standardID
        ];

        return productTypes;

    }



    @AuraEnabled
    public static List<wrapProduct> getFeaturesFromProducts(String standardID, String featureID,String flatID) {


        List<wrapProduct> wrapProducts = new List<wrapProduct>();
        SBQQ__ProductOption__c selectedProduct = new SBQQ__ProductOption__c();

        try {
            SBQQ__QuoteLine__c quoteLine = [SELECT Id, Name, SBQQ__Product__r.Name, SBQQ__ProductOption__r.SBQQ__ConfiguredSKU__r.Id, SBQQ__ProductOption__r.SBQQ__Feature__r.Id
            FROM SBQQ__QuoteLine__c
            WHERE SBQQ__Quote__r.Byt__c =: flatID AND SBQQ__ProductOption__r.SBQQ__ConfiguredSKU__r.Id =: standardID AND SBQQ__ProductOption__r.SBQQ__Feature__r.Id =: featureID LIMIT 1];

            selectedProduct = [SELECT Id, Name, SBQQ__ConfiguredSKU__r.Id, SBQQ__ConfiguredSKU__r.Name,  SBQQ__MaxQuantity__c, Product_Image__c, Product_Image_Link__c, SBQQ__OptionalSKU__r.Name, SBQQ__Feature__r.Name
            FROM SBQQ__ProductOption__c
            WHERE Id =: quoteLine.SBQQ__ProductOption__c];
            wrapProducts.add(new wrapProduct(selectedProduct,true));
        } catch (QueryException e) {
            System.debug(e.getMessage());
        }


        List<SBQQ__ProductOption__c> productFeatures =
        [SELECT Id, Name, SBQQ__ConfiguredSKU__r.Id, SBQQ__ConfiguredSKU__r.Name,  SBQQ__MaxQuantity__c, Product_Image__c, Product_Image_Link__c, SBQQ__OptionalSKU__r.Name, SBQQ__Feature__r.Name
        FROM SBQQ__ProductOption__c
        WHERE SBQQ__ConfiguredSKU__r.Id =: standardID
        AND SBQQ__Feature__r.Id =: featureID];

        for (Integer i = 0; i < productFeatures.size(); i++){
            if (productFeatures[i] == selectedProduct){
                productFeatures.remove(i);
            }
            else {
                wrapProducts.add(new wrapProduct(productFeatures[i],false));
            }

    }

        return wrapProducts;
    }

    //yet to be finished


    @AuraEnabled
    public static String insertProduct(String featureID, String flatID) {

        SBQQ__Quote__c quote = [SELECT Id, Byt__c FROM SBQQ__Quote__c WHERE Byt__c =: flatID];
        SBQQ__ProductOption__c option = [SELECT Id, Name, SBQQ__Quantity__c, SBQQ__ConfiguredSKU__r.Id, Product_Image__c, SBQQ__OptionalSKU__r.Name, SBQQ__Feature__r.Name, SBQQ__OptionalSKU__r.Id
        FROM SBQQ__ProductOption__c
        WHERE Id =: featureID];

        SBQQ__QuoteLine__c quoteLine = new SBQQ__QuoteLine__c();
        quoteLine.SBQQ__Bundle__c = false;
        quoteLine.SBQQ__Bundled__c = false;
        quoteLine.SBQQ__AllowAssetRefund__c = false;
        quoteLine.SBQQ__Quote__c = quote.Id;
        quoteLine.SBQQ__Product__c = option.SBQQ__OptionalSKU__r.Id;
        quoteLine.SBQQ__ProductOption__c = option.Id;
        quoteLine.SBQQ__Quantity__c = option.SBQQ__Quantity__c;
        quoteLine.SBQQ__Number__c = 500;

        List<SBQQ__QuoteLine__c> duplicate = [SELECT Id, SBQQ__Product__c, SBQQ__ProductOption__c
        FROM SBQQ__QuoteLine__c
        WHERE SBQQ__Quote__c =: quote.Id AND SBQQ__Product__c =: option.SBQQ__OptionalSKU__r.Id AND SBQQ__ProductOption__c =: option.Id];

        if (duplicate.size() == 0){
            insert quoteLine;
            return 'NeDuplikat';
        }
        return 'Duplikat';

    }


    public class wrapProduct {
        @AuraEnabled
        public SBQQ__ProductOption__c productOption {get; set;}
        @AuraEnabled
        public Boolean selected {get; set;}

        //This is the contructor method. When we create a new wrapAccount object we pass a Account that is set to the acc property. We also set the selected value to false
        public wrapProduct(SBQQ__ProductOption__c a, Boolean b) {
            productOption = a;
            selected = b;
        }
    }




}
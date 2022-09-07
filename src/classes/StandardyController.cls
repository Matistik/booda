/**
 * Created by matistikoff on 10. 8. 2022.
 */

public without sharing class StandardyController {


    @AuraEnabled
    public static List<SBQQ__QuoteLine__c> getLineItems(String lineId) {
        return [
                SELECT Id, Miestnos__c, SBQQ__ProductFamily__c, SBQQ__Product__r.Name
                FROM SBQQ__QuoteLine__c
                WHERE SBQQ__QuoteLine__c.SBQQ__Quote__r.Byt__r.Id = :lineId AND Miestnos__c != NULL
        ];
    }

    @AuraEnabled
    public static List<SBQQ__QuoteLine__c> getLineItemsMiestnost(String lineId, String miestnost) {
        return [
                SELECT Id, Miestnos__c, SBQQ__ProductFamily__c, SBQQ__Product__r.Name
                FROM SBQQ__QuoteLine__c
                WHERE SBQQ__QuoteLine__c.SBQQ__Quote__r.Byt__r.Id = :lineId AND Miestnos__c != NULL AND Miestnos__c = :miestnost
        ];
    }

    @AuraEnabled
    public static List<SBQQ__QuoteLine__c> getLineItemsProdukt(String lineId, String product) {
        return [
                SELECT Id, Miestnos__c, SBQQ__ProductFamily__c, SBQQ__Product__r.Name
                FROM SBQQ__QuoteLine__c
                WHERE SBQQ__QuoteLine__c.SBQQ__Quote__r.Byt__r.Id = :lineId AND Miestnos__c != NULL AND SBQQ__ProductFamily__c = :product
        ];
    }


    @AuraEnabled
    public static AggregateResult getLineCount(String lineId) {
        AggregateResult ar =
                (AggregateResult) [
                        SELECT COUNT(Id)
                        FROM SBQQ__QuoteLine__c
                        WHERE SBQQ__QuoteLine__c.SBQQ__Quote__r.Byt__r.Id = :lineId
                ];
        return ar;
    }

    @AuraEnabled
    public static List<AggregateResult> getDistinctRooms(String lineId) {
        List<AggregateResult> ar = [
                SELECT COUNT(Id), Miestnos__c
                FROM SBQQ__QuoteLine__c
                WHERE SBQQ__QuoteLine__c.SBQQ__Quote__r.Byt__r.Id = :lineId
                GROUP BY Miestnos__c
        ];
        return ar;
    }

    //soql queries po prekopani standardov

    @AuraEnabled
    public static Id getFlatIdAsProduct(String flatID) {
        SBQQ__QuoteLine__c quoteLine = [
                SELECT Id, Miestnos__c, SBQQ__ProductFamily__c, SBQQ__Product__r.Name, SBQQ__Product__r.Id
                FROM SBQQ__QuoteLine__c
                WHERE SBQQ__QuoteLine__c.SBQQ__Quote__r.Byt__r.Id = :flatID AND SBQQ__Number__c = 1
                LIMIT 1
        ];

        return quoteLine.SBQQ__Product__r.Id;

    }

    @AuraEnabled
    public static List<SBQQ__ProductFeature__c> getFlatStandards(String flatID) {
        SBQQ__QuoteLine__c quoteLine = [
                SELECT Id, Miestnos__c, SBQQ__ProductFamily__c, SBQQ__Product__r.Name, SBQQ__Product__r.Id
                FROM SBQQ__QuoteLine__c
                WHERE SBQQ__QuoteLine__c.SBQQ__Quote__r.Byt__r.Id = :flatID AND SBQQ__Number__c = 1
                LIMIT 1
        ];

        Id flatIdAsProduct = quoteLine.SBQQ__Product__r.Id;

        List<SBQQ__ProductFeature__c> standards = [SELECT Id, Name, SBQQ__ConfiguredSKU__r.Id FROM SBQQ__ProductFeature__c WHERE SBQQ__ConfiguredSKU__r.Id = :flatIdAsProduct];

        return standards;

    }

    @AuraEnabled
    public static List<SBQQ__ProductOption__c> getStandardsForRooms(String flatIdAsProduct, String featureID) {

        List<SBQQ__ProductOption__c> standardsForRooms = [
                SELECT Id, Name, SBQQ__ConfiguredSKU__r.Id, SBQQ__OptionalSKU__r.Name, SBQQ__Feature__r.Id, SBQQ__OptionalSKU__r.Id
                FROM SBQQ__ProductOption__c
                WHERE SBQQ__ConfiguredSKU__r.Id = :flatIdAsProduct AND SBQQ__Feature__r.Id = :featureID
        ];

        return standardsForRooms;

    }

    @AuraEnabled
    public static List<SBQQ__ProductFeature__c> getProductsFromStandard(String standardID) {

        List<SBQQ__ProductFeature__c> productTypes =

        [
                SELECT Id, Name, SBQQ__ConfiguredSKU__r.Id, SBQQ__MaxOptionCount__c, SBQQ__ConfiguredSKU__r.Name
                FROM SBQQ__ProductFeature__c
                WHERE SBQQ__ConfiguredSKU__r.Id = :standardID
        ];

        return productTypes;

    }


    @AuraEnabled
    public static List<wrapProduct> getFeaturesFromProducts(String standardID, String featureID, String flatID) {


        List<wrapProduct> wrapProducts = new List<wrapProduct>();
        SBQQ__ProductOption__c selectedProduct = new SBQQ__ProductOption__c();

        try {
            SBQQ__QuoteLine__c quoteLine = [
                    SELECT Id, Name, SBQQ__Product__r.Name, SBQQ__ProductOption__r.SBQQ__ConfiguredSKU__r.Id, SBQQ__ProductOption__r.SBQQ__Feature__r.Id
                    FROM SBQQ__QuoteLine__c
                    WHERE SBQQ__Quote__r.Byt__c = :flatID AND SBQQ__ProductOption__r.SBQQ__ConfiguredSKU__r.Id = :standardID AND SBQQ__ProductOption__r.SBQQ__Feature__r.Id = :featureID
                    LIMIT 1
            ];

            selectedProduct = [
                    SELECT Id, Name, SBQQ__ConfiguredSKU__r.Id, SBQQ__ConfiguredSKU__r.Name, SBQQ__MaxQuantity__c, Product_Image__c, Product_Image_Link__c, SBQQ__OptionalSKU__r.Name, SBQQ__Feature__r.Name
                    FROM SBQQ__ProductOption__c
                    WHERE Id = :quoteLine.SBQQ__ProductOption__c
            ];
            wrapProducts.add(new wrapProduct(selectedProduct, true));
        } catch (QueryException e) {
            System.debug(e.getMessage());
        }


        List<SBQQ__ProductOption__c> productFeatures = [
                SELECT Id, Name, SBQQ__ConfiguredSKU__r.Id, SBQQ__ConfiguredSKU__r.Name, SBQQ__MaxQuantity__c, Product_Image__c, Product_Image_Link__c, SBQQ__OptionalSKU__r.Name, SBQQ__Feature__r.Name
                FROM SBQQ__ProductOption__c
                WHERE SBQQ__ConfiguredSKU__r.Id = :standardID
                AND SBQQ__Feature__r.Id = :featureID
        ];

        for (Integer i = 0; i < productFeatures.size(); i++) {
            if (productFeatures[i] == selectedProduct) {
                productFeatures.remove(i);
            } else {
                wrapProducts.add(new wrapProduct(productFeatures[i], false));
            }

        }

        return wrapProducts;
    }


    @AuraEnabled
    public static String insertProduct(String flatID, List<String> selectedIds, String prvokID) {

        SBQQ__Quote__c quote = [SELECT Id, Byt__c FROM SBQQ__Quote__c WHERE Byt__c = :flatID];
        List<SBQQ__QuoteLine__c> quoteLines = new List<SBQQ__QuoteLine__c>();
        Product2 mainProduct2 = [SELECT Id, Name, SBQQ__DefaultQuantity__c FROM Product2 WHERE Id = :selectedIds.get(selectedIds.size() - 1)];
        Prvok__c prvok = [SELECT Id, Miestnost__r.NazovMiestnosti__c FROM Prvok__c WHERE Id = :prvokID];
        Produkt_Prvku__c produktPrvku = [SELECT Mnozstvo__c FROM Produkt_Prvku__c WHERE Prvok__c =: prvokID AND Product__c =: mainProduct2.Id];
        List<SBQQ__QuoteLine__c> checkForSamePart = new List<SBQQ__QuoteLine__c>();

        List<String> selectedIdsWithoutDuplicates = new List<String>();
        for (String id : selectedIds) {
            if (!selectedIdsWithoutDuplicates.contains(id)) {
                selectedIdsWithoutDuplicates.add(id);
            }
        }

        for(Integer i = 0; i < produktPrvku.Mnozstvo__c; i++){

        for (String id : selectedIdsWithoutDuplicates) {

            Id sId = id;
            String sobjectType = sId.getSobjectType().getDescribe().getName();

            if (sobjectType == 'SBQQ__ProductOption__c') {
                SBQQ__ProductOption__c option = [
                        SELECT Id, Name, SBQQ__Quantity__c, CastPrvku__c, SBQQ__ConfiguredSKU__r.Id, Product_Image__c, SBQQ__OptionalSKU__r.Name, SBQQ__Feature__r.Name, SBQQ__OptionalSKU__r.Id
                        FROM SBQQ__ProductOption__c
                        WHERE Id = :id
                ];


                try {
                    checkForSamePart = [SELECT Id, Name, SBQQ__Quote__r.Byt__c, Miestnos__c, CastPrvku__c, Prvok__r.Prvok__c, SBQQ__Product__r.Name
                    FROM SBQQ__QuoteLine__c
                    WHERE Prvok__c =: prvokID
                    AND CastPrvku__c =: option.CastPrvku__c];

                } catch (QueryException e) {

                }

                if (checkForSamePart.size() == 1){
                    delete checkForSamePart;
                }

                SBQQ__QuoteLine__c quoteLine = new SBQQ__QuoteLine__c();
                quoteLine.SBQQ__Quote__c = quote.Id;
                quoteLine.SBQQ__Product__c = option.SBQQ__OptionalSKU__r.Id;
                quoteLine.SBQQ__ProductOption__c = option.Id;
                quoteLine.SBQQ__Quantity__c = option.SBQQ__Quantity__c;
                quoteLine.Prvok__c = prvokID;
                quoteLine.Miestnos__c = prvok.Miestnost__r.NazovMiestnosti__c;
                quoteLines.add(quoteLine);
            } else {

                try {
                    List<SBQQ__QuoteLine__c> checkForDuplicate = [
                            SELECT Id, Name, SBQQ__Quote__r.Byt__c, Miestnos__c, CastPrvku__c, Prvok__r.Prvok__c, SBQQ__Product__r.Name
                            FROM SBQQ__QuoteLine__c
                            WHERE Prvok__c = :prvokID
                            AND SBQQ__Product__r.Id = :mainProduct2.Id
                    ];

                    if (checkForDuplicate.size() == 0) {
                        SBQQ__QuoteLine__c quoteLine = new SBQQ__QuoteLine__c();
                        quoteLine.SBQQ__Quote__c = quote.Id;
                        quoteLine.SBQQ__Product__c = mainProduct2.Id;
                        quoteLine.SBQQ__Quantity__c = mainProduct2.SBQQ__DefaultQuantity__c;
                        quoteLine.Prvok__c = prvokID;
                        quoteLine.Miestnos__c = prvok.Miestnost__r.NazovMiestnosti__c;
                        quoteLines.add(quoteLine);
                    }
                } catch (Exception e) {

                }
            }


        }
        }

        insert quoteLines;
        return 'Duplikat';

    }


    /**
  standardy po tretej prerabke
  @author miso
    */

    @AuraEnabled
    public static void deleteQuoteLines(String prvokID) {

        List<SBQQ__QuoteLine__c> quoteLinesToDelete = [SELECT Id, Name FROM SBQQ__QuoteLine__c WHERE Prvok__c = :prvokID];
        delete quoteLinesToDelete;
    }

    @AuraEnabled(Cacheable=true)
    public static List<Miestnost__c> getMiestnosti(String flatID) {
        return [SELECT Id, NazovMiestnosti__c, Byt__c FROM Miestnost__c WHERE Byt__c = :flatID];
    }

    @AuraEnabled(Cacheable=true)
    public static List<Prvok__c> getPrvky(String MiestnostID) {


        return [SELECT Id, Miestnost__c, Prvok__c, Name FROM Prvok__c WHERE Miestnost__c = :MiestnostID];
    }

    @AuraEnabled
    public static List<wrapProductPrvku> getProduktPrvky(String prvokID) {

        List<wrapProductPrvku> wraps = new List<wrapProductPrvku>();
        List<Produkt_Prvku__c> produktyPrvku = [SELECT Id, Prvok__c, Product__r.Name, Product__r.Id, Product__r.Product_Image_Link__c, Product__r.CastPrvku__c, Vybrany__c, Uroven__c FROM Produkt_Prvku__c WHERE Prvok__c = :prvokID ORDER BY Uroven__c];

        List<SBQQ__QuoteLine__c> quoteLines = [SELECT Name, Prvok__c, SBQQ__Product__r.Name FROM SBQQ__QuoteLine__c WHERE Prvok__c = :produktyPrvku[0].Prvok__c];

        Produkt_Prvku__c selectedPrvok;


        for (Produkt_Prvku__c prvok : produktyPrvku) {
            for (SBQQ__QuoteLine__c quoteLineL : quoteLines) {
                if (prvok.Product__r.Name == quoteLineL.SBQQ__Product__r.Name) {
                    selectedPrvok = prvok;
                    wraps.add(new wrapProductPrvku(prvok, true));
                    break;
                }

            }
        }

        for (Integer i = 0; i < produktyPrvku.size(); i++) {
            System.debug('halo ' + produktyPrvku);

            if (produktyPrvku[i] == selectedPrvok) {
                produktyPrvku.remove(i);
            }
         else {
        wraps.add(new wrapProductPrvku(produktyPrvku[i], false));
    }
        }




        return wraps;
    }

    @AuraEnabled(Cacheable=true)
    public static Miestnost__c getMiestnostName(String prvokID) {

        return [SELECT Id, NazovMiestnosti__c FROM Miestnost__c WHERE Id = :prvokID];

    }

    @AuraEnabled(Cacheable=true)
    public static Prvok__c getProduktPrvkuName(String prvokID) {

        return [SELECT Id, Prvok__c FROM Prvok__c WHERE Id = :prvokID];

    }

    @AuraEnabled
    public static String updateProduktPrvku(String prvokID) {


        Produkt_Prvku__c prvok = [SELECT Id, Vybrany__c, Prvok__c FROM Produkt_Prvku__c WHERE Id = :prvokID];
        try {
            Produkt_Prvku__c prvokToDeactivate = [SELECT Id, Vybrany__c, Prvok__c FROM Produkt_Prvku__c WHERE Prvok__c = :prvok.Prvok__c AND Vybrany__c = TRUE];
            prvokToDeactivate.Vybrany__c = false;
            update prvokToDeactivate;
        } catch (QueryException e) {
            System.debug(e.getMessage());
        }
        prvok.Vybrany__c = true;
        update prvok;
        return prvok.Id;

    }

    @AuraEnabled
    public static String getActivatedPrvokID(String prvokID) {


        try {
            Produkt_Prvku__c prvok = [SELECT Id, Vybrany__c, Prvok__c FROM Produkt_Prvku__c WHERE Prvok__c = :prvokID AND Vybrany__c = TRUE];
            return prvok.Id;
        } catch (QueryException e) {
            System.debug(e.getMessage());
        }

        return null;

    }

    @AuraEnabled
    public static Boolean checkForActivatedPrvok(String prvokID, String productID) {


        try {
            Produkt_Prvku__c prvok = [SELECT Id, Vybrany__c, Prvok__c FROM Produkt_Prvku__c WHERE Prvok__c = :prvokID AND Vybrany__c = TRUE];
            Produkt_Prvku__c selectedPrvok = [SELECT Id, Vybrany__c, Prvok__c, Product__r.Id FROM Produkt_Prvku__c WHERE Product__r.Id =: productID];

            if (selectedPrvok.Vybrany__c == false){
                return false;
            }
            else {
                return true;
            }
        } catch (QueryException e) {
            System.debug(e.getMessage());
        }

        return null;

    }


    @AuraEnabled
    public static List<wrapProductOptions> getProductOptions(String productID, List<String> selectedIds, String prvokID) {

        List<wrapProductOptions> wrapProductOptions = new List<wrapProductOptions>();
        List<SBQQ__ProductOption__c> productOptions2 = new List<SBQQ__ProductOption__c>();
        List<String> vybrane = new List<String>();


        try {
            List<SBQQ__QuoteLine__c> quoteLines = [SELECT Name, Prvok__c, SBQQ__ProductOption__c, SBQQ__ProductOption__r.SBQQ__OptionalSKU__r.Name FROM SBQQ__QuoteLine__c WHERE Prvok__c = :prvokID];

            for (SBQQ__QuoteLine__c quoteLine : quoteLines) {
                if (quoteLine.SBQQ__ProductOption__c != null) {
                    selectedIds.add(quoteLine.SBQQ__ProductOption__c);
                }
            }

            for (String id : selectedIds) {
                Id sId = id;
                String sobjectType = sId.getSobjectType().getDescribe().getName();
                if (id != null && sobjectType != 'Product2') {
                    SBQQ__ProductOption__c productOption = [SELECT SBQQ__Feature__r.Name FROM SBQQ__ProductOption__c WHERE Id = :id];
                    vybrane.add(productOption.SBQQ__Feature__r.Name);
                }

            }
        } catch (QueryException e) {

        }

        try {
            List<AggregateResult> productOptions = (List<AggregateResult>) [SELECT COUNT(Id), SBQQ__Feature__r.Name FROM SBQQ__ProductOption__c WHERE SBQQ__ConfiguredSKU__c = :productID GROUP BY SBQQ__Feature__r.Name];

            for (AggregateResult pro : productOptions) {


                if (vybrane.contains((String) pro.get('Name'))) {
                    wrapProductOptions.add(new wrapProductOptions(pro, 'VYBRANY'));
                } else {
                    wrapProductOptions.add(new wrapProductOptions(pro, 'NEVYBRANY'));
                }


            }


            return wrapProductOptions;
        } catch (QueryException e) {
            System.debug(e.getMessage());
        }

        return null;
    }

    @AuraEnabled(Cacheable=true)
    public static Integer getVybrany(String productID, List<String> selectedIds, String prvokID) {

        List<wrapProductOptions> wrapProductOptions = new List<wrapProductOptions>();
        List<SBQQ__ProductOption__c> productOptions2 = new List<SBQQ__ProductOption__c>();
        List<String> vybrane = new List<String>();
        Integer num = 0;


        try {
            List<SBQQ__QuoteLine__c> quoteLines = [SELECT Name, Prvok__c, SBQQ__ProductOption__c, SBQQ__ProductOption__r.SBQQ__OptionalSKU__r.Name FROM SBQQ__QuoteLine__c WHERE Prvok__c = :prvokID];

            for (SBQQ__QuoteLine__c quoteLine : quoteLines) {
                if (quoteLine.SBQQ__ProductOption__c != null) {
                    selectedIds.add(quoteLine.SBQQ__ProductOption__c);
                }
            }

            for (String id : selectedIds) {
                Id sId = id;
                String sobjectType = sId.getSobjectType().getDescribe().getName();
                if (id != null && sobjectType != 'Product2') {
                    SBQQ__ProductOption__c productOption = [SELECT SBQQ__Feature__r.Name FROM SBQQ__ProductOption__c WHERE Id = :id];
                    vybrane.add(productOption.SBQQ__Feature__r.Name);
                }

            }
        } catch (QueryException e) {

        }

        try {
            List<AggregateResult> productOptions = (List<AggregateResult>) [SELECT COUNT(Id), SBQQ__Feature__r.Name FROM SBQQ__ProductOption__c WHERE SBQQ__ConfiguredSKU__c = :productID GROUP BY SBQQ__Feature__r.Name];

            for (AggregateResult pro : productOptions) {


                if (vybrane.contains((String) pro.get('Name'))) {
                    wrapProductOptions.add(new wrapProductOptions(pro, 'VYBRANY'));
                    num++;
                } else {
                    wrapProductOptions.add(new wrapProductOptions(pro, 'NEVYBRANY'));
                }


            }


            return num;
        } catch (QueryException e) {
            System.debug(e.getMessage());
        }

        return null;
    }


    @AuraEnabled
    public static List<wrapProduct> getConcreteProductOptions(String productID, String featureName, List<String> selectedIds, String prvokID) {

        List<wrapProduct> wrapProducts = new List<wrapProduct>();
        List<SBQQ__QuoteLine__c> quoteLines = [SELECT Name, Prvok__c, SBQQ__ProductOption__c, SBQQ__ProductOption__r.SBQQ__OptionalSKU__r.Name FROM SBQQ__QuoteLine__c WHERE Prvok__c = :prvokID];

        for (SBQQ__QuoteLine__c quoteLine : quoteLines) {
            selectedIds.add(quoteLine.SBQQ__ProductOption__c);
        }



        try {
            List<SBQQ__ProductOption__c> productOptions = [SELECT Name, SBQQ__ConfiguredSKU__c, CastPrvku__c, SBQQ__OptionalSKU__r.Id, SBQQ__OptionalSKU__r.Name, SBQQ__Feature__r.Name, Product_Image_Link__c FROM SBQQ__ProductOption__c WHERE SBQQ__ConfiguredSKU__c = :productID AND SBQQ__Feature__r.Name = :featureName];


            for (Integer i = 0; i < productOptions.size(); i++) {

                if (selectedIds.contains(productOptions[i].Id)) {




                    wrapProducts.add(new wrapProduct(productOptions[i], true));
                } else {
                    wrapProducts.add(new wrapProduct(productOptions[i], false));
                }

            }

            return wrapProducts;
        } catch (QueryException e) {
            System.debug(e.getMessage());
        }

        return null;
    }

    @AuraEnabled
    public static String checkIfConcreteIsSelected(String productID, String featureName, List<String> selectedIds, String prvokID) {

        List<wrapProduct> wrapProducts = new List<wrapProduct>();
        List<SBQQ__QuoteLine__c> quoteLines = [SELECT Name, Prvok__c, SBQQ__ProductOption__c, SBQQ__ProductOption__r.SBQQ__OptionalSKU__r.Name FROM SBQQ__QuoteLine__c WHERE Prvok__c = :prvokID];

        for (SBQQ__QuoteLine__c quoteLine : quoteLines) {
            selectedIds.add(quoteLine.SBQQ__ProductOption__c);
        }



        try {
            List<SBQQ__ProductOption__c> productOptions = [SELECT Name, SBQQ__ConfiguredSKU__c, CastPrvku__c, SBQQ__OptionalSKU__r.Id, SBQQ__OptionalSKU__r.Name, SBQQ__Feature__r.Name, Product_Image_Link__c FROM SBQQ__ProductOption__c WHERE SBQQ__ConfiguredSKU__c = :productID AND SBQQ__Feature__r.Name = :featureName];


            for (Integer i = 0; i < productOptions.size(); i++) {

                if (selectedIds.contains(productOptions[i].Id)) {
                    return 'vybrany';




                } else {
                    wrapProducts.add(new wrapProduct(productOptions[i], false));
                }

            }

            return 'nevybrany';
        } catch (QueryException e) {
            System.debug(e.getMessage());
        }

        return null;
    }

    @AuraEnabled
    public static String getActivatedProductOptions(String productID, String featureName, List<String> selectedIds, String prvokID) {

        List<wrapProduct> wrapProducts = new List<wrapProduct>();
        List<SBQQ__QuoteLine__c> quoteLines = [SELECT Name, Prvok__c, SBQQ__ProductOption__c, SBQQ__ProductOption__r.SBQQ__OptionalSKU__r.Name FROM SBQQ__QuoteLine__c WHERE Prvok__c = :prvokID];

        for (SBQQ__QuoteLine__c quoteLine : quoteLines) {
            selectedIds.add(quoteLine.SBQQ__ProductOption__c);
        }



        try {
            List<SBQQ__ProductOption__c> productOptions = [SELECT Name, SBQQ__ConfiguredSKU__c, CastPrvku__c, SBQQ__OptionalSKU__r.Id, SBQQ__OptionalSKU__r.Name, SBQQ__Feature__r.Name, Product_Image_Link__c FROM SBQQ__ProductOption__c WHERE SBQQ__ConfiguredSKU__c = :productID AND SBQQ__Feature__r.Name = :featureName];


            for (Integer i = 0; i < productOptions.size(); i++) {

                if (selectedIds.contains(productOptions[i].Id)) {
                    return productOptions[i].Id;


                } else {
                    wrapProducts.add(new wrapProduct(productOptions[i], false));
                }

            }

            return null;
        } catch (QueryException e) {
            System.debug(e.getMessage());
        }

        return null;


    }


    @AuraEnabled
    public static Integer getNumberOfPrvky(String mainProductId) {

        List<AggregateResult> productOptions = (List<AggregateResult>) [SELECT COUNT(Id), Name FROM SBQQ__ProductFeature__c WHERE SBQQ__ConfiguredSKU__c = :mainProductId GROUP BY Name];

        Integer num = 0;
        for (AggregateResult arr : productOptions) {
            num += (Integer) arr.get('expr0');
        }
        return num;
    }


    @AuraEnabled
    public static List<Product2> getSelectedProducts(List<String> selectedIds) {

        List<Product2> products = new List<Product2>();

        List<String> selectedIdsWithoutDuplicates = new List<String>();
        for (String id : selectedIds) {
            if (!selectedIdsWithoutDuplicates.contains(id)) {
                selectedIdsWithoutDuplicates.add(id);
            }
        }

        for (String id : selectedIdsWithoutDuplicates) {

            Id sId = id;
            String sobjectType = sId.getSobjectType().getDescribe().getName();

            if (sobjectType == 'SBQQ__ProductOption__c') {
                SBQQ__ProductOption__c productOption = [SELECT Name, SBQQ__ConfiguredSKU__c, SBQQ__OptionalSKU__r.Name, SBQQ__Feature__r.Name, Product_Image_Link__c, SBQQ__OptionalSKU__r.Id FROM SBQQ__ProductOption__c WHERE Id = :id];
                Product2 product2 = [SELECT Id, Name, Product_Image_Link__c FROM Product2 WHERE Id = :productOption.SBQQ__OptionalSKU__c];
                products.add(product2);
            } else {
                Product2 product2 = [SELECT Id, Name, Product_Image_Link__c FROM Product2 WHERE Id = :id];
                products.add(product2);
            }
        }

        return products;
    }

    @AuraEnabled
    public static List<SBQQ__QuoteLine__c> getJednotlivePrvky(String flatID) {

        return [
                SELECT Id, Name, SBQQ__Quote__r.Byt__c, Miestnos__c, CastPrvku__c,Prvok__r.Name, Prvok__r.Prvok__c, SBQQ__Product__r.Name,SBQQ__ListPrice__c
                FROM SBQQ__QuoteLine__c
                WHERE SBQQ__Quote__r.Byt__c = :flatID
        ];

    }


    public class wrapProduct {

        @AuraEnabled
        public SBQQ__ProductOption__c productOption { get; set; }
        @AuraEnabled
        public Boolean selected { get; set; }

        //This is the contructor method. When we create a new wrapAccount object we pass a Account that is set to the acc property. We also set the selected value to false
        public wrapProduct(SBQQ__ProductOption__c a, Boolean b) {
            productOption = a;
            selected = b;
        }
    }

    public class wrapProductOptions {

        @AuraEnabled
        public AggregateResult aggregateResult { get; set; }
        @AuraEnabled
        public String vybrane { get; set; }

        //This is the contructor method. When we create a new wrapAccount object we pass a Account that is set to the acc property. We also set the selected value to false
        public wrapProductOptions(AggregateResult a, String b) {
            aggregateResult = a;
            vybrane = b;
        }
    }
    public class wrapProductPrvku {

        @AuraEnabled
        public Produkt_Prvku__c produktPrvku { get; set; }
        @AuraEnabled
        public Boolean vybrane { get; set; }

        public wrapProductPrvku(Produkt_Prvku__c a, Boolean b) {
            produktPrvku = a;
            vybrane = b;
        }
    }

}
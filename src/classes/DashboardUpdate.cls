/**
 * Created by juraj on 18/08/2022.
 */

public with sharing class DashboardUpdate {

    @AuraEnabled
    public static void updateByt(String id, String poznamky, String cislo){

        try{
            Byt__c b = new Byt__c();
            b.Id = id;
            b.Pozn_mky__c = poznamky;
            b.slo_ZoBKZ_KZ__c = cislo;
            update b;

        }
        catch (Exception ex){
            throw new AuraHandledException(ex.getMessage());

        }
    }

    @AuraEnabled
    public static void updateTerminy(String id, Date dp, Date pz, Date zv, Date dn, Date tz, Date us){

        try{
            Byt__c b = new Byt__c();
            b.Id = id;
           b.D_tum_podpisu_ZoD_ZoBKZ__c = dp;
            b.Prijat_zadanie_KLZ__c = pz;
            b.Zaslanie_v_zvy_KLZ_najnesk_r_do__c = zv;
            b.Dan_na_rozpo_et__c = dn;
            b.Term_n_zaslania_n_vrhu_na_stretnutie__c = tz;
            b.Uz_vierka_tandardov__c = us;
            update b;

        }
        catch (Exception ex){
            throw new AuraHandledException(ex.getMessage());

        }
    }

    @AuraEnabled
    public static void updateKLZByt(String id, String balik, Decimal vycerpane){

        try{
            Byt__c b = new Byt__c();
            b.Id = id;
            b.Typ_balika_KLZ__c = balik;
            b.Nh_Vycerpane__c = vycerpane;
            update b;

        }
        catch (Exception ex){
            throw new AuraHandledException(ex.getMessage());

        }
    }

    @AuraEnabled
    public static Decimal  getNhNadRamec(Decimal n, Decimal v){
        Decimal ramec;
        try{
           ramec = v - n;

        }
        catch (Exception ex){
            throw new AuraHandledException(ex.getMessage());

        }
        return ramec;
    }
}
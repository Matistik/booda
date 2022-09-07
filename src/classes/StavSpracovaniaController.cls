/**
 * Created by matistikoff on 1. 8. 2022.
 */

public with sharing class StavSpracovaniaController {


    @AuraEnabled
    public static List<wrapStavSpracovania> getStavy(String flatID){

        List<wrapStavSpracovania> wrapStavy = new List<wrapStavSpracovania>();
        List<Stav_spracovania__c> stavy = [SELECT Id, Stav_spracovania__c, Name FROM Stav_spracovania__c WHERE Byt__c =: flatID];

        for(Stav_spracovania__c stav: stavy){
            if (stav.Stav_spracovania__c == 'Nezačaté'){
                wrapStavy.add(new wrapStavSpracovania(stav,'clicked','unclicked','unclicked'));
            }
            if (stav.Stav_spracovania__c == 'Rozpracované'){
                wrapStavy.add(new wrapStavSpracovania(stav,'unclicked','clicked','unclicked'));
            }
            if (stav.Stav_spracovania__c == 'Hotové'){
                wrapStavy.add(new wrapStavSpracovania(stav,'unclicked','unclicked','clicked'));
            }
        }

        return wrapStavy;


    }


    public class wrapStavSpracovania {

        @AuraEnabled
        public Stav_spracovania__c stavSpracovania { get; set; }
        @AuraEnabled
        public String nezacate { get; set; }
        @AuraEnabled
        public String rozpracovane { get; set; }
        @AuraEnabled
        public String hotove { get; set; }

        //This is the contructor method. When we create a new wrapAccount object we pass a Account that is set to the acc property. We also set the selected value to false
        public wrapStavSpracovania(Stav_spracovania__c a, String b, String c, String d) {
            stavSpracovania = a;
            nezacate = b;
            rozpracovane = c;
            hotove = d;
        }
    }


    


}
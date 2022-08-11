/**
 * Created by juraj on 03/08/2022.
 */

public without sharing class PoziadavkyNaZmenyController {


    @AuraEnabled(Cacheable=true)
    public static List<AggregateResult> getStavyList() {

        return [SELECT Status
        FROM Case GROUP BY Status
        ];

    }

    @AuraEnabled(Cacheable=true)
    public static List<Case> getKLZList() {
        return [SELECT Id, Byt__r.Name
        FROM Case
        ];
    }

    @AuraEnabled(Cacheable=true)
    public static List<Case> getCaseStav(String stav){
        return [SELECT Id, Byt__r.Name, Status
        FROM Case WHERE Status =: stav
        ];
    }


}
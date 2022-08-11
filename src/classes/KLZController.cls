/**
 * Created by juraj on 25/07/2022.
 */

public without sharing class KLZController {

    @AuraEnabled(Cacheable=true)
    public static List<Case> getKLZ(String caseId) {
        return
        [SELECT Id, CaseNumber, Status, Subject, Description, CreatedDate, ClosedDate, Cena__c, Schv_len__c
        FROM Case
        WHERE Case.Byt__r.Id=: caseId
        ];
    }

    @AuraEnabled(Cacheable=true)
    public static List<Case> getConcreteKLZ(String klzID) {
        List<Case> ca = new List<Case>();
        try {
            ca = [SELECT Id, CaseNumber, Status, Description, CreatedDate, ClosedDate, Cena__c, Schv_len__c, Byt__r.Name, Subject
            FROM Case
            WHERE Id =: klzID LIMIT 1
            ];
        } catch (System.QueryException e) {

        }

        return ca;

    }

    @AuraEnabled(Cacheable=true)
    public static List<Case> getKLZList() {
        return [SELECT Id, Byt__r.Name
        FROM Case
        ];
    }

    @AuraEnabled(Cacheable=true)
    public static List<Case> getKLZOdoslane(String caseId) {
        return
        [SELECT Id, CaseNumber, Status, Description, CreatedDate, ClosedDate, Cena__c, Schv_len__c, Byt__r.Name
        FROM Case
        WHERE Case.Byt__r.Id=: caseId AND Status = 'Zadaná klientom'
        ];
    }

    @AuraEnabled(Cacheable=true)
    public static List<Case> getKLZRozpracovane(String caseId) {
        return
        [SELECT Id, CaseNumber, Status, Description, CreatedDate, ClosedDate, Cena__c, Schv_len__c, Byt__r.Name
        FROM Case
        WHERE Case.Byt__r.Id=: caseId AND Status = 'Rozpracovaná'
        ];
    }

    @AuraEnabled(Cacheable=true)
    public static AggregateResult getKLZCount(String bytId){
        AggregateResult ar =
                (AggregateResult) [SELECT COUNT(Id)
                FROM Case
                WHERE Case.Byt__c =: bytId AND Case.Status LIKE 'Rozpracovaná'
                ];
        return ar;
    }

    @AuraEnabled(Cacheable=true)
    public static AggregateResult getKLZCountUzavrete(String bytId){
        AggregateResult ar =
                (AggregateResult) [SELECT COUNT(Id)
                FROM Case
                WHERE Case.Byt__c =: bytId AND Case.Status LIKE 'Odsúhlasená klientom'
                ];
        return ar;
    }


}
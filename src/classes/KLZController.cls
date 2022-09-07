/**
 * Created by juraj on 25/07/2022.
 */

public with sharing class KLZController {

    public String name;
    public Integer posX;
    public Integer posY;
    public String contIdChosen {get; set;}

    public string getName()
    {
        return name;
    }

    public void setName(string name)
    {
        this.name = name;
    }

    public Integer getPosX()
    {
        return posX;
    }

    public void setPosX(Integer posX)
    {
        this.posX = posX;
    }

    public Integer getPosY()
    {
        return posX;
    }

    public void setPosY(Integer posY)
    {
        this.posY = posY;
    }

    @AuraEnabled
    public static List<Case> getKLZ(String caseId) {
        return
        [SELECT Id, CaseNumber, Status, Subject, Description, CreatedDate, ClosedDate, Cena__c, Schv_len__c, ID_KLZ__c
        FROM Case
        WHERE Case.Byt__r.Id=: caseId
        ];
    }

    @AuraEnabled
    public static List<Case> getKLZforComm(String caseId) {
        return
        [SELECT Id, CaseNumber, Status, Subject, Description, CreatedDate, ClosedDate, Neprecitane_spravy_od_klienta__c, Neprecitane_spravy_od_menezera__c
        FROM Case
        WHERE Case.Byt__r.Id=: caseId
        ];
    }

    @AuraEnabled
    public static List<Case> getConcreteKLZ(String klzID) {
        List<Case> ca = new List<Case>();
        try {
            ca = [SELECT Id, Prvok__c,Prvok__r.Prvok__c,Nazov_Prvku__c, ID_KLZ__c, CaseNumber, Status, Description, CreatedDate,
                    ClosedDate, Cena__c, Schv_len__c, Byt__r.Name, Subject, Interne_poznamky__c, Poznamka_pre_klienta__c

            FROM Case
            WHERE Id =: klzID LIMIT 1
            ];
        } catch (System.QueryException e) {

        }

        return ca;

    }

    @AuraEnabled
    public static Prvok__c getConcretePrvok(String prvokID) {
        List<Case> c = [SELECT Id,Prvok__c FROM Case WHERE Id =: prvokID];
        List<Prvok__c> p = new List<Prvok__c>();
        try {
            p = [SELECT Id, Prvok__c
            FROM Prvok__c
            WHERE Id =: c[0].Prvok__c LIMIT 1
            ];

        } catch (System.QueryException e) {
        }
        return p[0];
    }

    @AuraEnabled
    public static List<Case> getKLZList() {
        return [SELECT Id, Byt__r.Name
        FROM Case
        ];
    }

    @AuraEnabled
    public static List<Case> getKLZOdoslane(String caseId) {
        return
        [SELECT Id, CaseNumber, Status, Description, CreatedDate, ClosedDate, Cena__c, Schv_len__c, Byt__r.Name, ID_KLZ__c
        FROM Case
        WHERE Case.Byt__r.Id=: caseId AND Status != 'Rozpracovaná'
        ];
    }

    @AuraEnabled
    public static List<Case> getKLZRozpracovane(String caseId) {
        return
        [SELECT Id, CaseNumber, Status, Description, CreatedDate, ClosedDate, Cena__c, Schv_len__c, Byt__r.Name, ID_KLZ__c
        FROM Case
        WHERE Case.Byt__r.Id=: caseId AND Status = 'Rozpracovaná'
        ];
    }

    @AuraEnabled(Cacheable=true)
    public static AggregateResult getKLZCount(String bytId){
       AggregateResult ar = (AggregateResult) [SELECT COUNT(Id)
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

    public PageReference show()
    {
        Case cs = [SELECT Id, Cena__c FROM Case WHERE Id = '5001q00000KD6MhAAL'];
        cs.Cena__c = 55;
        update cs;
        this.name = 'pufpuf';
        return null;
    }

    @RemoteAction
    public static void setCordinates(Integer posX, Integer posY) {
        Case cs = [SELECT Id, Cena__c FROM Case WHERE Id = '5001q00000KD6MhAAL'];
        cs.Cena__c = 57;
        cs.PosX__c = posX;
        cs.PosY__c = posY;

        update cs;


    }

    @AuraEnabled
    public static Case saveCordinates(Integer posX, Integer posY, String klz) {
        Case cs = [SELECT Id, Cena__c FROM Case WHERE Id =: klz];
        cs.PosX__c = posX;
        cs.PosY__c = posY;

        update cs;
        return cs;

    }

    @AuraEnabled
    public static Decimal getCordinateX(String klz) {
        Case cs = [SELECT PosX__c  FROM Case WHERE Id =: klz];
        Decimal posX = cs.PosX__c;
        return posX;
    }
    @AuraEnabled
    public static Decimal getCordinateY(String klz) {
        Case cs = [SELECT  PosY__c  FROM Case WHERE Id =: klz];
        Decimal posY = cs.PosY__c;
        return posY;
    }

    @RemoteAction
    public static List<Decimal> checkForCordinates() {
        List<Decimal> integers = new List<Decimal>();
        Case cs = [SELECT Id, Cena__c,PosX__c,PosY__c FROM Case WHERE Id = '5001q00000KD6MhAAL'];
        integers.add(cs.PosX__c);
        integers.add(cs.PosY__c);

        return integers;

    }


}
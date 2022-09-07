/**
 * Created by matistikoff on 19. 8. 2022.
 */

trigger CaseTrigger on Case (before insert) {

    if (Trigger.isInsert){
        if (Trigger.isBefore){
            CaseTriggerController.populateKlzIdField(Trigger.new);
        }
    }

}
global without sharing class AccountMerge_TDTM extends npsp.TDTM_RunnableMutable {
    global override void run(List<SObject> listNew, List<SObject> listOld,
            npsp.TDTM_Runnable.Action triggerAction, Schema.DescribeSObjectResult objResult,
            npsp.TDTM_Runnable.DmlWrapper dmlWrapper) {
        if(triggerAction == npsp.TDTM_Runnable.Action.AfterDelete && objResult.getSObjectType() == Account.getSObjectType()) process(listOld);
    }
 
    private static void process(list<SObject> records) {
        for(Account account : (list<Account>) records) {
            if(String.isNotBlank(account.MasterRecordID)) callFlow(account);
        }
    }

    @TestVisible
    private static void callFlow(Account oldAccount) {
        Map<String, Object> mergeFlowInputMap = new Map<String, Object>();
        mergeFlowInputMap.put('oldAccount', oldAccount);
        mergeFlowInputMap.put('MasterRecordId', oldAccount.MasterRecordId);
        Flow.Interview.Account_Merge_Duplicate_Merge_Audit_Trail mergeFlow = new Flow.Interview.Account_Merge_Duplicate_Merge_Audit_Trail(mergeFlowInputMap);
        mergeFlow.start();
    }

}
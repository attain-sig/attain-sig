/**
 * Created by alisonbenes on 3/23/23.
 */

@IsTest
private class AccountMerge_TDTM_Test {
    @IsTest
    static void run() {
        AccountMerge_TDTM cls = new AccountMerge_TDTM();
        cls.run(new list<Account>(),new list<Account>{new Account(Id='0013K00000xcnVFQAY')},npsp.TDTM_Runnable.Action.AfterDelete,Account.getSObjectType().getDescribe(),new npsp.TDTM_Runnable.DmlWrapper());
        AccountMerge_TDTM.callFlow(new Account(Id='0013K00000xcnVFQAY'));
    }
}
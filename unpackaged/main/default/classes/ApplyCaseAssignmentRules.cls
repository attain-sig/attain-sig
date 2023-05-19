public class ApplyCaseAssignmentRules{

  @Invocablemethod
  public static void assignCases(List<Case> Cases){
    //Active assignment rules for case

    AssignmentRule activeAssign = [
            SELECT Id
            FROM AssignmentRule
            WHERE SobjectType = 'Case'
            AND Active = TRUE
            LIMIT 1
    ];

    Database.DMLOptions dmlOpts = new Database.DMLOptions();
    dmlOpts.assignmentRuleHeader.assignmentRuleId = activeAssign.Id;

    if(Cases.size() > 0) Database.update(Cases,dmlOpts);

  }

}
/**
 * Created by robertwright on 1/4/23.
 */

@IsTest
private class ApplyCaseAssignmentRules_Test {
    @IsTest
    static void assignCases() {
        List<Case> cases = new List<Case>();
        ApplyCaseAssignmentRules.assignCases(cases);
    }
}
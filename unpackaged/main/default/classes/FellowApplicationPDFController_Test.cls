@isTest
public class FellowApplicationPDFController_Test {
    @testsetup
    public static void createTestData() {
        createCustomSettingData();
    }
    public static void createCustomSettingData() {
        List<RecordId__c> recordIdCustomSetting = new List<RecordId__c>();
        if(RecordId__c.getAll().get('DefaultOwnerId') == NULL){
            recordIdCustomSetting.add(new RecordId__c(name = 'DefaultOwnerId',IdValue__c = string.valueOf(UserInfo.getUserId())));
        }
        if(recordIdCustomSetting.size()>0){
            insert recordIdCustomSetting;
        }
    }
    static testMethod void initialiseTest() {
        // String fellowshipYear = EDF02_CustomMetadata_Helper.getEDFCCGlobalValue('CurrentFellowshipYear');
        // Account a = new Account(Name='Test Account', OwnerId=CustomSettings_Helper.getRecordIdsValue('DefaultOwnerId')); insert a;
        // Contact c = new Contact(FirstName='TestFN', LastName='TestLN', Email='someone@abc.bix', Phone='9876543210', MailingStreet='Street', MailingCity='New Delhi', MailingState='Delhi', MailingCountry='India', MailingPostalCode='110060'); insert c;
        // Fellow_Application__c fa = new Fellow_Application__c(Applicant__c=c.Id,Status__c='Engagement Confirmed',Fellowship_Applying_for__c='U.S. Fellowship', CC_Year__c=fellowshipYear); insert fa;

        User u = createTestFellowApplicantData();
        System.runAs(u) {
            FellowApplicationPDFController fapc = new FellowApplicationPDFController();
        }
    }

    static User createTestFellowApplicantData() {
        Account a = new Account(
            Name='Test Account',
            OwnerId=CustomSettings_Helper.getRecordIdsValue('DefaultOwnerId'));
        insert a;

        Contact c = new Contact(
            FirstName='TestFN',
            LastName='TestLN',
            Email='someone@abc.bix',
            Phone='9876543210',
            MailingStreet='Street',
            MailingCity='New Delhi',
            MailingState='Delhi',
            MailingCountry='India',
            MailingPostalCode='110060');
        insert c;

        Fellow_Application__c fa = new Fellow_Application__c(
            Applicant__c=c.Id,
            Status__c='Engagement Confirmed',
            Fellowship_Applying_for__c='U.S. Fellowship');
        insert fa;

        Profile p = [SELECT Id FROM Profile WHERE Name='Fellow Portal Community User'];
        User u = new User(
            Alias = 'standt',
            Email='someone@abc.bix',
            EmailEncodingKey='UTF-8',
            LastName='Testing',
            LanguageLocaleKey='en_US',
            LocaleSidKey='en_US',
            ProfileId = p.Id,
            TimeZoneSidKey='America/Los_Angeles',
            UserName='someone@abc.bix.edf',
            FirstName='TestFN',
            ContactId=c.Id);
        insert u;

        return u;
    }
}
@isTest
public class EngagementListControllerTest {
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

        List<EDFCCGlobal__c> EDFCCglobalCustomSetting = new List<EDFCCGlobal__c>();
        if(EDFCCGlobal__c.getAll().get('CurrentFellowshipYear') == NULL){
            EDFCCglobalCustomSetting.add(new EDFCCGlobal__c(name = 'CurrentFellowshipYear',Value__c =String.valueOf(Date.Today().year()) ));
        }
        if(EDFCCglobalCustomSetting.size()>0){
             insert EDFCCglobalCustomSetting;
        }
    }

    static testMethod void getFellowshipForTest(){

        EngagementListController elc = new EngagementListController();
        EngagementListController.getFellowshipFor();
    }
    static testMethod void getFelloWAppIdTest(){
        String currentYear = CustomSettings_Helper.getEDFCCGlobalValue('CurrentFellowshipYear');
        Account a = new Account(Name='Test Account', OwnerId=CustomSettings_Helper.getRecordIdsValue('DefaultOwnerId')); insert a;
        Contact c = new Contact(FirstName='TestFN', LastName='TestLN', Email='someone@abc.bix', Phone='9876543210', MailingStreet='Street', MailingCity='New Delhi', MailingState='Delhi', MailingCountry='India', MailingPostalCode='110060'); insert c;
        Fellow_Application__c fa = new Fellow_Application__c(Applicant__c=c.Id,Status__c='Engagement Confirmed',Fellowship_Applying_for__c='U.S. Fellowship', CC_Year__c=currentYear); insert fa;
        FellowAppWrapper fw = new FellowAppWrapper();
        Profile p = [SELECT Id FROM Profile WHERE Name='Fellow Portal Community User'];
        User u = new User(Alias = 'standt', Email='someone@abc.bix',
                          EmailEncodingKey='UTF-8', LastName='Testing', LanguageLocaleKey='en_US',
                          LocaleSidKey='en_US', ProfileId = p.Id,
                          TimeZoneSidKey='America/Los_Angeles', UserName='someone@abc.bix.edf', FirstName='TestFN', ContactId=c.Id);
        insert u;
        System.runAs(u){
            EngagementListController.getFelloWAppId();
            EngagementListController.getFellowshipApplyingFor();
            EngagementListController.getEngagementListSettings('U.S. Fellowship');
        }


    }



    static testMethod void searchEngagementsTest(){
        createTestEngagementData();
        EngagementListController.SearchFilterWrapper sfw =new EngagementListController.SearchFilterWrapper();
        sfw.fellowshipcity = 'test';
        sfw.fellowshipstate = 'test';
        sfw.publicTransport = 'test';
        sfw.industry = 'test';
        sfw.availableNotAvailable = 'available';
        sfw.projectType = 'test';
        sfw.locationPreferance = 'test';
        // sfw.engagementProgram = 'test'; // Commented by HSingh FB-2139
        sfw.searchText = 'Workplan';

        EngagementListController.sortDir = 'asc';
        System.assertEquals(EngagementListController.sortDir, 'asc');
        EngagementListController.sortBy = 'Date_Engagement_Added_to_Portal__c';
        System.assertEquals(EngagementListController.sortBy, 'Date_Engagement_Added_to_Portal__c');
        EngagementListController.searchEngagements(sfw);
    }

    static testMethod void saveConsiderMeTest(){
        String currentYear = CustomSettings_Helper.getEDFCCGlobalValue('CurrentFellowshipYear');
        Account a = new Account(Name='Test Account', OwnerId=CustomSettings_Helper.getRecordIdsValue('DefaultOwnerId')); insert a;
        Contact c = new Contact(FirstName='TestFN', LastName='TestLN', Email='someone@abc.bix', Phone='9876543210', MailingStreet='Street', MailingCity='New Delhi', MailingState='Delhi', MailingCountry='India', MailingPostalCode='110060'); insert c;
        Fellow_Application__c fa = new Fellow_Application__c(Applicant__c=c.Id,Status__c='Engagement Confirmed',Fellowship_Applying_for__c='U.S. Fellowship', CC_Year__c=currentYear); insert fa;
        FellowAppWrapper fw = new FellowAppWrapper();
        Profile p = [SELECT Id FROM Profile WHERE Name='Fellow Portal Community User'];
        User u = new User(Alias = 'standt', Email='someone@abc.bix',
                          EmailEncodingKey='UTF-8', LastName='Testing', LanguageLocaleKey='en_US',
                          LocaleSidKey='en_US', ProfileId = p.Id,
                          TimeZoneSidKey='America/Los_Angeles', UserName='someone@abc.bix.edf', FirstName='TestFN', ContactId=c.Id);
        insert u;
        List<Potential_Matching_From_Screener__c> listPms =new List<Potential_Matching_From_Screener__c>();
        Potential_Matching_From_Screener__c pms=new Potential_Matching_From_Screener__c();
        pms.How_Considered__c = 'Consider Me';
        pms.Is_Deleted__c = false;
        pms.Student_Application__c =fa.Id;
        listPms.add(pms);
        System.runAs(u){
            EngagementListController.submitConsiderMe(listPms,fa.Id);
            EngagementListController.saveConsiderMe(listPms,fa.Id);
        }
    }

    static testMethod void getProjectTypesTest(){

        User u = createTestFellowApplicantData();

        System.runAs(u) {
            EngagementListController elc = new EngagementListController();
            List<String> pTypes = EngagementListController.getProjectTypes();
            System.debug('getProjectTypesTest :: pTypes ::' + pTypes);
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

    static void createTestEngagementData() {
        Account a = new Account(
            Name='Test Account',
            OwnerId=CustomSettings_Helper.getRecordIdsValue('DefaultOwnerId'));
        insert a;

        Host_Application__c ha = new Host_Application__c(
            Account__c = a.Id,
            Date_Application_Submitted__c = Date.Today().addDays(-10),
            Stage__c = 'Submitted',
            Application_Type__c = 'Host-Funded',
            Fellowship_City__c = 'New York City',
            Fellowship_State__c = 'NY',
            Industry_Classification__c = 'Arts, Media, Entertainment',
            Proposed_Fellowship_Dates__c = Date.Today().addDays(60),
            Proposed_Fellowship_End_Date__c = Date.Today().addDays(120),
            Fellowship_Location_Preference__c = 'In Person (full time)',
            Workplan_Content_from_Application__c = 'This is a Workplan Content from Application');
        insert ha;

        Climate_Corps_Engagement__c engg = new Climate_Corps_Engagement__c(
            Name = 'Costco, 2023',
            Account__c = a.Id,
            EDF_Engagement_Manager__c = CustomSettings_Helper.getRecordIdsValue('DefaultOwnerId'),
            EDF_Project_Manager__c = CustomSettings_Helper.getRecordIdsValue('DefaultOwnerId'),
            CC_Year__c =  CustomSettings_Helper.getEDFCCGlobalValue('CurrentFellowshipYear'),
            Funding_Source__c = 'Barr Foundation',
            Stage__c = 'Confirmed Participation',
            How_did_we_meet_origin_of_lead__c = 'Existing pipeline organization',
            Host_Application__c = ha.Id,
            Fellowship_Program__c = 'U.S. Fellowship',
            Workplan_for_Student_Portal__c = 'This is a Workplan for Student Portal');
        insert engg;
    }

}
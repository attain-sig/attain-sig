/*
###########################################################################
# Created by............: Suresh Tavva & Team (OSI)
# Created Date..........: 3/25/2022
# Last Modified by......:
# Last Modified Date....:
# Description...........: Test class for FellowAppController
# Change Log:
#
#
############################################################################
*/

@isTest
public class FellowAppController_Test {

    @testsetup
    public static void createTestData() {
        createCustomSettingData();
    }

    static testMethod void testCreateContact() {
        String fellowshipYear = EDF02_CustomMetadata_Helper.getEDFCCGlobalValue('CurrentFellowshipYear');
        Account a = new Account(Name='Test Account', OwnerId=CustomSettings_Helper.getRecordIdsValue('DefaultOwnerId')); insert a;
        Contact c = new Contact(FirstName='TestFN', LastName='TestLN', Email='someone@abc.bix', Phone='9876543210', MailingStreet='Street', MailingCity='New Delhi', MailingState='Delhi', MailingCountry='India', MailingPostalCode='110060'); insert c;
        Fellow_Application__c fa = new Fellow_Application__c(Applicant__c=c.Id,Status__c='Prospective Applicant',Fellowship_Applying_for__c='U.S. Fellowship', CC_Year__c=fellowshipYear); insert fa;
        FellowAppWrapper fw = new FellowAppWrapper();
        Profile p = [SELECT Id FROM Profile WHERE Name='Fellow Portal Community User'];
        User u = new User(Alias = 'standt', Email='someone@abc.bix',
                          EmailEncodingKey='UTF-8', LastName='Testing', LanguageLocaleKey='en_US',
                          LocaleSidKey='en_US', ProfileId = p.Id,
                          TimeZoneSidKey='America/Los_Angeles', UserName='someone@abc.bix.edf', FirstName='TestFN', ContactId=c.Id);
        insert u;
        System.runAs(u){
            FellowAppController.getContactId();
            FellowAppController.getBackgroundInformation();
            FellowAppController.getEducationInformation();
            FellowAppController.getMatchPreferences();
            FellowAppController.getCoverLetter();

            FellowAppController.updateBackgroundInfo(fa);
            FellowAppController.updatePreference(fa);
            FellowAppController.updateCoverLetter(fa);
            FellowAppController.isDeadlinePassed();

            FellowAppController.getApplicationStatus();
            FellowAppController.retrieveUniversityAccounts();
            FellowAppController.validateReviewSubmit();
            FellowAppController.retrieveUniversitySchoolAccountsWithParents();

            FellowAppController.retrieveUniversitySchoolAccounts(a.Id);
            FellowAppController.getFellowshipApplyingFor();

            UniversityHelper.updateEducationInformation(fa);
            UniversityHelper.retrieveUniversitySchoolAccountsWithParents();
            UniversityHelper.retrieveUniversityAccounts();
            UniversityHelper.retrieveUniversitySchoolAccounts(a.Id);

            fa.Status__c = 'Engagement Confirmed'; // Setting this so that email is not sent.
            update fa;
            FellowAppController.submitApplication();
        }
    }


    static testMethod void testCreateValidateFellowApp() {
        String fellowshipYear = EDF02_CustomMetadata_Helper.getEDFCCGlobalValue('CurrentFellowshipYear');
        Account a = new Account(Name='Test Account', OwnerId=CustomSettings_Helper.getRecordIdsValue('DefaultOwnerId')); insert a;
        Contact c = new Contact(FirstName='TestFN', LastName='TestLN', Email='someone@abc.bix', Phone='9876543210', MailingStreet='Street', MailingCity='New Delhi', MailingState='Delhi', MailingCountry='India', MailingPostalCode='110060'); insert c;
        Fellow_Application__c fa = new Fellow_Application__c(Applicant__c=c.Id,Status__c='Prospective Applicant',Fellowship_Applying_for__c='U.S. Fellowship', CC_Year__c=fellowshipYear); insert fa;
        FellowAppWrapper fw = new FellowAppWrapper();
        Profile p = [SELECT Id FROM Profile WHERE Name='Fellow Portal Community User'];
        User u = new User(Alias = 'standt', Email='someone@abc.bix',
                          EmailEncodingKey='UTF-8', LastName='Testing', LanguageLocaleKey='en_US',
                          LocaleSidKey='en_US', ProfileId = p.Id,
                          TimeZoneSidKey='America/Los_Angeles', UserName='someone@abc.bix.edf', FirstName='TestFN', ContactId=c.Id);
        insert u;
        System.runAs(u) {
            FellowAppController.validateReviewSubmit();
            fa = addAdditionalFAppData(fa);
            update fa;
            FellowAppController.validateReviewSubmit();

            // Check for China
            fa.Fellowship_Applying_for__c = 'China Fellowship';
            update fa;
            FellowAppController.validateReviewSubmit();

            // Check for India
            fa.Fellowship_Applying_for__c = 'India Fellowship';
            update fa;
            FellowAppController.validateReviewSubmit();

            // Back to US
            fa.Fellowship_Applying_for__c = 'U.S. Fellowship';
            update fa;
            FellowAppController.validateReviewSubmit();

            fa.Graduation_Start_Date__c = Date.today().addYears(-2);
            fa.Date_Expected_Graduated_1__c = Date.today();
            update fa;
            FellowAppController.validateReviewSubmit();

            FellowAppController.getEducationInformation();

            fa.Status__c = 'Engagement Confirmed'; // Setting this so that email is not sent.
            update fa;
            FellowAppController.submitApplication();
        }
    }

    static Fellow_Application__c addAdditionalFAppData(Fellow_Application__c fa) {
        fa.Pronouns__c = 'He/Him/His';
        // fa.How_Did_You_Find_Us__c = 'EDF Staff webinar'; // temp for deployment
        fa.Returner_Fellow__c = 'No';
        // fa.Skype__c = 'hs'; // FB-3527
        fa.Graduation_Start_Date__c = Date.valueOf('2019-05-31');
        fa.Date_Expected_Graduated_1__c = Date.valueOf('2020-05-31');
        fa.Degree_Earned_2__c = 'Bachelor of Science (BS)';
        fa.US_Resident__c = 'Yes';
        fa.Are_you_eligible_to_work_in_U_S_in_summ__c = 'Yes';
        fa.Years_of_Experience_from_App__c = '1 year or less';
        fa.ExperienceAdvancedFinancialAnalysis__c = 'Basic';
        fa.Experience_Greenhouse_Gas_Accounting__c = 'Basic';
        fa.ExperienceExtensiveExcelAataAnalysis__c = 'Basic';
        fa.Experience_Supply_Chain__c = 'Basic';
        fa.ExperienceRenewables__c = 'None';
        fa.Native_English_Speaker__c = 'Yes';
        fa.Residency_in_china__c = 'Macau Resident';
        fa.China_fellowship_tests__c = 'IELTS';
        fa.China_fellowship_test_score__c = '10';
        fa.Geographic_Yes_Region__c = 'New England';
        fa.Sector_first_choice__c = 'Wholesale';
        fa.Sector_second_choice__c = 'Retail';
        fa.Sector_third_choice__c = 'Healthcare';
        fa.Regions_in_India__c = 'Telangana';
        fa.Regions_in_China__c = 'North China';
        fa.Cover_Letter__c = 'Cover Letter text';
        fa.Reference_Name_1__c = 'HS';
        fa.Reference_Name_2__c = 'BS';
        fa.Reference_Name_3__c = 'PK';
        fa.Reference_Title_1__c = 'Manager';
        fa.Reference_Title_2__c = 'CEO';
        fa.Reference_Title_3__c = 'COO';
        fa.Reference_Email_1__c = 'hs@hs.hs';
        fa.Reference_Email_2__c = 'bs@bs.bs';
        fa.Reference_Email_3__c = 'pk@pk.pk';
        return fa;
    }

    static testMethod void validateReviewSubmitTest(){
        String fellowshipYear = EDF02_CustomMetadata_Helper.getEDFCCGlobalValue('CurrentFellowshipYear');
        Account a = new Account(Name='Test Account 2', OwnerId=CustomSettings_Helper.getRecordIdsValue('DefaultOwnerId')); insert a;
        Contact c = new Contact(FirstName='TestFN', LastName='TestLN', Email='someone@abc.bix2', Phone='9876543211', MailingStreet='Street', MailingCity='New Delhi', MailingState='Delhi', MailingCountry='India', MailingPostalCode='110060'); insert c;
        Fellow_Application__c fa = new Fellow_Application__c(Applicant__c=c.Id,Status__c='Engagement Confirmed',Fellowship_Applying_for__c='China Fellowship', CC_Year__c=fellowshipYear); insert fa;
        FellowAppWrapper fw = new FellowAppWrapper();
        Profile p = [SELECT Id FROM Profile WHERE Name='Fellow Portal Community User'];
        User u = new User(Alias = 'standt', Email='someone@abc.bix2',
                          EmailEncodingKey='UTF-8', LastName='Testing', LanguageLocaleKey='en_US',
                          LocaleSidKey='en_US', ProfileId = p.Id,
                          TimeZoneSidKey='America/Los_Angeles', UserName='someone@abc.bix.edf2', FirstName='TestFN', ContactId=c.Id,Phone='1234512345');
        insert u;
        System.runAs(u){
            FellowAppController.getContactId();
            FellowAppController.getBackgroundInformation();
            FellowAppController.getEducationInformation();
            FellowAppController.getMatchPreferences();
            FellowAppController.getCoverLetter();
            FellowAppController.submitApplication();
            FellowAppController.getApplicationStatus();
            FellowAppController.retrieveUniversityAccounts();
            FellowAppController.validateReviewSubmit();

        }


    }

    static testMethod void fellowAppWrapperTest(){
        FellowAppWrapper faw = new FellowAppWrapper();
            faw.firstName='hello';
            faw.lastName = 'hello';
            faw.email='hello';
            faw.pronouns='hello';
            faw.pronounsSelfDescribe='hello';
            faw.phone='hello';
            faw.mailingCountry='hello';
            faw.mailingPostalCode='hello';
            faw.mailingState='hello';
            faw.mailingCity='hello';
            faw.permanentStreetAddressLine1='hello';
            faw.permanentStreetAddressLine2='hello';
            // faw.skypeID='hello'; // FB-3527
            faw.howDidYouFindUs='hello';
            faw.howDidYouFindUsOther='hello';
            faw.returnerFellow='hello';
            faw.gender='hello';
            faw.genderSelfDescribe='hello';
            faw.race='hello';
            faw.latinxOrHispanic='hello';
            faw.veteranStatus='hello';
            faw.graduateDegreeStartDate='hello';
            faw.expectedGraduationDate='hello';
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

}
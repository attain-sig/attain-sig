import { LightningElement, wire, api } from "lwc";
import { NavigationMixin } from 'lightning/navigation';
import getBackgroundInformation from '@salesforce/apex/FellowAppController.getBackgroundInformation';
import { getPicklistValues, getObjectInfo } from 'lightning/uiObjectInfoApi';
import { getRecord, getFieldValue, updateRecord } from "lightning/uiRecordApi";
import { onHeadingClick } from 'c/edfCommonUtils';
import updateBackgroundInfo from '@salesforce/apex/FellowAppController.updateBackgroundInfo';

// Import message service features required for subscribing and the message channel
import { subscribe, MessageContext } from 'lightning/messageService';
import FAPP_SUBMITTED_CHANNEL from '@salesforce/messageChannel/Application_Submitted__c';

// Import reference to the object and the fields
import FELLOW_APPLICATION_OBJECT from '@salesforce/schema/Fellow_Application__c';
import FELLOW_APPLICATION_ID_FIELD from '@salesforce/schema/Fellow_Application__c.Id';
import AUTHORIZED_WORK_US_FIELD from "@salesforce/schema/Fellow_Application__c.US_Resident__c";
import PHOTO_IDENTFICATIONNAME_FIELD from '@salesforce/schema/Fellow_Application__c.Photo_Identification_Name__c';
import REQUIRE_AUTHORIZATION_FIELD from "@salesforce/schema/Fellow_Application__c.Are_you_eligible_to_work_in_U_S_in_summ__c";
import NATIVE_ENGLISH_SPEAKER_FIELD from "@salesforce/schema/Fellow_Application__c.Native_English_Speaker__c";
import RESIDENCY_IN_CHINA_FIELD from "@salesforce/schema/Fellow_Application__c.Residency_in_china__c";
import CHINA_FELLOWSHIP_TESTS_FIELD from "@salesforce/schema/Fellow_Application__c.China_fellowship_tests__c";
import CHINA_PASSPORT_FIELD from '@salesforce/schema/Fellow_Application__c.ChinaPassport__c';
import CHINA_FELLOWSHIP_TEST_SCORE_FIELD from "@salesforce/schema/Fellow_Application__c.China_fellowship_test_score__c";
import YEARS_OF_EXPERIENCE_FIELD from "@salesforce/schema/Fellow_Application__c.Years_of_Experience_from_App__c";
import FINANCIAL_ANALYSIS_FIELD from "@salesforce/schema/Fellow_Application__c.ExperienceAdvancedFinancialAnalysis__c";
import GREENHOUSE_GAS_ACCOUNTING_FIELD from "@salesforce/schema/Fellow_Application__c.Experience_Greenhouse_Gas_Accounting__c";
import DATA_ANALYSIS_FIELD from "@salesforce/schema/Fellow_Application__c.ExperienceExtensiveExcelAataAnalysis__c";
import SUPPLY_CHAIN_FIELD from "@salesforce/schema/Fellow_Application__c.Experience_Supply_Chain__c";
import ENERGY_EFFICIENCY_RENEWABLES_FIELD from "@salesforce/schema/Fellow_Application__c.ExperienceRenewables__c";

import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import BOOTSTRAPData from '@salesforce/resourceUrl/bootstrapdata';
import { loadStyle, loadScript } from 'lightning/platformResourceLoader';
import registrationgbImage from '@salesforce/resourceUrl/registrationgbImage';
import checkDeadlinePassed from '@salesforce/apex/FellowAppController.isDeadlinePassed'; // Added by HSingh - FB-2039

export default class EDF16_BackgroundInformation extends NavigationMixin(LightningElement) {
    // variables
    //fellowApplicationId = 'a141D000001NYhLQAW';

    authorizedWorkUS = '';
    requireAuthorization = '';
    yearsOfExperience = '';
    nativeEnglishSpeaker = '';
    residencyInChina = '';
    financialAnalysis = '';
    greenhouseGasAccounting = '';
    dataAnalysis = '';
    supplyChain = '';
    energyEfficiencyRenewables = '';
    ChinaFellowshipTests = '';
    ChinaFellowshipTestScore = '';
    passportCheckboxVal = false;
    isUSFellowShip = false;
    isChinaFellowship = false;
    isIndiaorChinaFellowShip = false;
    fellowshipApplyingFor = '';
    isworkExpRequired = false;
    isfinanAnalysis= false;
    isGreenGas = false;
    isdataAnalysis = false;
    isSupplyChain = false;
    isEnergyEffi = false;
    isLegalAuthUS = false;
    isFutureWork = false;
    isIdCard = false;
    isEngProficient = false;
    isChinaResi = false;
    testScore = false;
    photoIdentification = '';
    showUploaded = false;
    @api backgroundImageClass = 'body-bg-image-application';

    @api saveSuccessTitle;
    @api saveSuccessMessage;
    @api isChild;
    @api readOnly = false;
    @api showYearsOfExperience;
    @api labelYearsOfExperience;
	@api showExperienceInfoHeading;
	@api headingExperienceInfo;
	@api showFinancialAnalysis;
	@api labelFinancialAnalysis;
	@api showGreenhouseGasAccounting;
	@api labelGreenhouseGasAccounting;
    @api showDataAnalysis;
    @api labelDataAnalysis;
	@api showSupplyChain;
	@api labelSupplyChain;
	@api showEnergyEfficiencyRenewables;
	@api labelEnergyEfficiencyRenewables;

    @api showUploadedIdentification;
    @api labelUploadedIdentification;
    @api labelUploadedIdentificationNote;
    @api helpTextUploadedIdentification;
    @api showNativeEnglishSpeaker;
    @api labelNativeEnglishSpeaker;
    @api showAuthWorkUS;
    @api labelAuthWorkUS;
    @api labelRequireWorkAuth;

    @api showChinaResidency;
    @api labelChinaResidency;
    @api showPassport;
    @api labelPassport;
    @api showChinaTestAndScore;
    @api labelChinaTestAndScore;

    // Following custom variables are used for Review Fellow App Page
    contentCSS = '';
    expCollSign;
    cssSection = 'registration-application-section';
    cssSectionSub = 'registration-application-section-sub';

    _isDeadlinePassed = null; // FB-2039

    // Encapsulate logic for LMS subscribe.
    subscribeToMessageChannel() {
        this.subscription = subscribe(
            this.messageContext,
            FAPP_SUBMITTED_CHANNEL,
            (message) => this.handleFAppSubmission(message)
        );
    }

    // Handler for message received by component
    handleFAppSubmission(message) {
        // let fAppId = message.fAppId; // Ignore fAppId for now.
        this.readOnly = true;
    }

    connectedCallback() {
        this.getBackgroundInfo();
        //this.handleFieldsValidity();
        this.checkDeadline(); // FB-2039
        if (this.isChild) {
            this.contentCSS = 'content';
            this.expCollSign = '+';
            this.cssSection += ' no-padding-top no-padding-bottom';
            this.cssSectionSub += ' no-padding-top no-padding-bottom';

            this.subscribeToMessageChannel();
        }
    }

    getBackgroundInfo() {
        getBackgroundInformation().then(response => {
            console.log('response:', response);

            this.fellowApplicationId = response.id ?? '';
            this.fellowshipApplyingFor = response.fellowshipApplyingFor ?? '';
            console.log('this.fellowshipApplyingFor:::'+this.fellowshipApplyingFor);
            if(this.fellowshipApplyingFor =='India Fellowship' || this.fellowshipApplyingFor =='China Fellowship'){
                this.isUSFellowShip = false;
                this.isIndiaorChinaFellowShip = true;
            }
            if(this.fellowshipApplyingFor =='China Fellowship'){
                this.isIndiaorChinaFellowShip = true;
                this.isChinaFellowship = true;
                this.isUSFellowShip = false;

            }
            if(this.fellowshipApplyingFor =='U.S. Fellowship'){
                this.isIndiaorChinaFellowShip = false;
                this.isUSFellowShip = true;
            }
            this.authorizedWorkUS = response.authorizedWorkUS ?? '';
            this.nativeEnglishSpeaker = response.nativeEnglishSpeaker ?? '';
            console.log('this.nativeEnglishSpeaker'+this.nativeEnglishSpeaker);
            this.residencyInChina = response.residencyInChina ?? '';
            this.passportCheckboxVal = response.passportCheckboxVal ?? '';
            this.ChinaFellowshipTests = response.ChinaFellowshipTests ?? '';
            this.ChinaFellowshipTestScore = response.ChinaFellowshipTestScore ?? '';
            this.requireAuthorization = response.requireAuthorization ?? '';
            this.yearsOfExperience = response.yearsOfExperience ?? '';
            this.financialAnalysis = response.financialAnalysis ?? '';
            this.greenhouseGasAccounting = response.greenhouseGasAccounting ?? '';
            this.dataAnalysis = response.dataAnalysis ?? '';
            this.supplyChain = response.supplyChain ?? '';
            this.energyEfficiencyRenewables = response.energyEfficiencyRenewables ?? '';
            this.photoIdentification =  response.photoIdentification ?? '';
            this.showUploaded = response.photoIdentification ? true : false;
            this.handleFieldsValidity();

        }).catch(error => {
            console.log('Error:', error);
        });

    }

    renderedCallback() {
        Promise.all([

            loadScript(this, BOOTSTRAPData + '/assets/js/jquery-3.2.1.slim.min.js'),
            loadScript(this, BOOTSTRAPData + '/assets/js/popper-1.12.9.min.js'),
            loadScript(this, BOOTSTRAPData +'/assets/js/bootstrap-4.0.0.min.js'),
            loadScript(this, BOOTSTRAPData + '/assets/js/custom.js'),

            loadStyle(this, BOOTSTRAPData + '/assets/css/bootstrap-4.0.0.min.css'),
            loadStyle(this, BOOTSTRAPData + '/assets/css/custom.css'),
            loadStyle(this, BOOTSTRAPData + '/assets/css/registration-application.css'),
            loadStyle(this, BOOTSTRAPData + '/assets/css/contact-information.css')
        ]).then(() => {
                console.log("All scripts and CSS are loaded.")
            })
            .catch(error => {
                console.log("Error page")
            });

         //this.setDefaultValues();

    }


    // By using the MessageContext @wire adapter, unsubscribe will be called
    // implicitly during the component descruction lifecycle.
    @wire(MessageContext)
    messageContext;

    subscription = null;

    // Get Object Info.
    @wire (getObjectInfo, {objectApiName: FELLOW_APPLICATION_OBJECT})
    fellowApplicationObjectInfo;

    setDefaultValues(){
        this.template.querySelector('.native-Eenglish-speaker').value = this.nativeEnglishSpeaker!=null?this.nativeEnglishSpeaker:'';
        this.template.querySelector('.residency-in-china').value = this.residencyInChina;
        this.template.querySelector('.China-fellowship-tests').value = this.ChinaFellowshipTests;
        this.template.querySelector('.authorized-work-us').value = this.authorizedWorkUS;
        this.template.querySelector('.require-authorization').value = this.requireAuthorization;
        this.template.querySelector('.years-of-experience').value = this.yearsOfExperience;
        this.template.querySelector('.financial-analysis').value = this.financialAnalysis;
        this.template.querySelector('.greenhouse-gas-accounting').value = this.greenhouseGasAccounting;
        this.template.querySelector('.data-analysis').value = this.dataAnalysis;
        this.template.querySelector('.supply-chain').value = this.supplyChain;
        this.template.querySelector('.energy-efficiency-renewables').value = this.energyEfficiencyRenewables;
    }


    // Get "Are you legally authorized to work in the U.S.?" Picklist values.
    @wire(getPicklistValues, {recordTypeId: '$fellowApplicationObjectInfo.data.defaultRecordTypeId', fieldApiName: AUTHORIZED_WORK_US_FIELD })
    authorizedWorkUSPickList;

    // Get "Will you now or in the future require work authorization" Picklist values.
    @wire(getPicklistValues, {recordTypeId: '$fellowApplicationObjectInfo.data.defaultRecordTypeId', fieldApiName: REQUIRE_AUTHORIZATION_FIELD })
    requireAuthorizationPickList;

    // Get "How many years of professional work experience do you have?" Picklist values.
    @wire(getPicklistValues, {recordTypeId: '$fellowApplicationObjectInfo.data.defaultRecordTypeId', fieldApiName: YEARS_OF_EXPERIENCE_FIELD })
    yearsOfExperiencePickList;

    // Get "English proficiency is required for this position. Are you fluent or proficient in English?" Picklist values.
    @wire(getPicklistValues, {recordTypeId: '$fellowApplicationObjectInfo.data.defaultRecordTypeId', fieldApiName: NATIVE_ENGLISH_SPEAKER_FIELD })
    nativeEnglishSpeakerPickList;

    // Get "Please select your residency in China." Picklist values.
    @wire(getPicklistValues, {recordTypeId: '$fellowApplicationObjectInfo.data.defaultRecordTypeId', fieldApiName: RESIDENCY_IN_CHINA_FIELD })
    residencyInChinaPickList;

    // Get "Please choose one of the following tests and input your score in the text box below." Picklist values.
    @wire(getPicklistValues, {recordTypeId: '$fellowApplicationObjectInfo.data.defaultRecordTypeId', fieldApiName: CHINA_FELLOWSHIP_TESTS_FIELD })
    ChinaFellowshipTestsPickList;


    // Get "Financial Analysis" Picklist values.
    @wire(getPicklistValues, {recordTypeId: '$fellowApplicationObjectInfo.data.defaultRecordTypeId', fieldApiName: FINANCIAL_ANALYSIS_FIELD })
    financialAnalysisPickList;

    // Get "Greenhouse Gas Accounting" Picklist values.
    @wire(getPicklistValues, {recordTypeId: '$fellowApplicationObjectInfo.data.defaultRecordTypeId', fieldApiName: GREENHOUSE_GAS_ACCOUNTING_FIELD })
    greenhouseGasAccountingPickList;

    // Get "Data Analysis (Excel or other software)" Picklist values.
    @wire(getPicklistValues, {recordTypeId: '$fellowApplicationObjectInfo.data.defaultRecordTypeId', fieldApiName: DATA_ANALYSIS_FIELD })
    dataAnalysisPickList;

    // Get "Supply Chain" Picklist values.
    @wire(getPicklistValues, {recordTypeId: '$fellowApplicationObjectInfo.data.defaultRecordTypeId', fieldApiName: SUPPLY_CHAIN_FIELD })
    supplyChainPickList;

    // Get "Energy Efficiency and/or Renewables" Picklist values.
    @wire(getPicklistValues, {recordTypeId: '$fellowApplicationObjectInfo.data.defaultRecordTypeId', fieldApiName: ENERGY_EFFICIENCY_RENEWABLES_FIELD })
    energyEfficiencyRenewablesPickList;



    //Change Handlers

    get acceptedFormats() {
        return ['.pdf'];
    }

    handleUploadFinished(event) {
        const uploadedFiles = event.detail.files;
        this.showUploaded = true;
        for(let i = 0; i < uploadedFiles.length; i++) {
            this.photoIdentification = uploadedFiles[0].name;
            console.log('this.resume:',this.photoIdentification);
        }

    }


    authorizedWorkUSChangeHandler(event){
        this.authorizedWorkUS = event.target.value;
        console.log('US --'+this.authorizedWorkUS);
    }
    requireAuthorizationChangeHandler(event){
        this.requireAuthorization = event.target.value;
    }
    passportCheckboxChangeHandler(event){
        this.passportCheckboxVal = event.target.checked;
    }
    yearsOfExperienceChangeHandler(event){
        this.yearsOfExperience = event.target.value;
    }
    nativeEnglishSpeakerChangeHandler(event){
        this.nativeEnglishSpeaker = event.target.value;
    }
    residencyInChinaChangeHandler(event){
        this.residencyInChina = event.target.value;
    }
    ChinaFellowshipTestsChangeHandler(event){
        this.ChinaFellowshipTests = event.target.value;
    }
    ChinaFellowshipTestScoreChangeHandler(event){
        this.ChinaFellowshipTestScore = event.target.value;
    }
    financialAnalysisChangeHandler(event){
        this.financialAnalysis = event.target.value;
    }
    greenhouseGasAccountingChangeHandler(event){
        this.greenhouseGasAccounting = event.target.value;
    }
    dataAnalysisChangeHandler(event){
        this.dataAnalysis = event.target.value;
    }
    supplyChainChangeHandler(event){
        this.supplyChain = event.target.value;
    }
    energyEfficiencyRenewablesChangeHandler(event){
        this.energyEfficiencyRenewables = event.target.value;
    }

    //update details
    updateBackgroundInformation(){

        const fields = {};
        fields[FELLOW_APPLICATION_ID_FIELD.fieldApiName] = this.fellowApplicationId;
        fields[AUTHORIZED_WORK_US_FIELD.fieldApiName] = this.authorizedWorkUS;
        fields[NATIVE_ENGLISH_SPEAKER_FIELD.fieldApiName] = this.nativeEnglishSpeaker;
        fields[RESIDENCY_IN_CHINA_FIELD.fieldApiName] = this.residencyInChina;
        fields[PHOTO_IDENTFICATIONNAME_FIELD.fieldApiName] = this.photoIdentification;
        fields[CHINA_PASSPORT_FIELD.fieldApiName] = this.passportCheckboxVal;
        fields[CHINA_FELLOWSHIP_TESTS_FIELD.fieldApiName] = this.ChinaFellowshipTests;
        fields[CHINA_FELLOWSHIP_TEST_SCORE_FIELD.fieldApiName] = this.ChinaFellowshipTestScore;
        fields[REQUIRE_AUTHORIZATION_FIELD.fieldApiName] = this.requireAuthorization;
        fields[YEARS_OF_EXPERIENCE_FIELD.fieldApiName] = this.yearsOfExperience;
        fields[FINANCIAL_ANALYSIS_FIELD.fieldApiName] = this.financialAnalysis;
        fields[GREENHOUSE_GAS_ACCOUNTING_FIELD.fieldApiName] = this.greenhouseGasAccounting;
        fields[DATA_ANALYSIS_FIELD.fieldApiName] = this.dataAnalysis;
        fields[SUPPLY_CHAIN_FIELD.fieldApiName] = this.supplyChain;
        fields[ENERGY_EFFICIENCY_RENEWABLES_FIELD.fieldApiName] = this.energyEfficiencyRenewables;

        const recordInput = {
            fields: fields
        };

        if (this.isInputValid()) {
        // updateRecord(recordInput).then((record) => {
        updateBackgroundInfo({fa:fields}).then((result) => {
            console.log('updateBackgroundInformation', result);
            if (result == '') {
                this.showToast(this.saveSuccessTitle, 'success', this.saveSuccessMessage);

                this.getBackgroundInfo();
                //this.setDefaultValues();
                this.saveNext();
            }
            else {
                console.log('INSIDE SAVE ERROR ::', result);
                this.showStickyToast('Background Information', 'error', result);
            }
        }).error(error => {

            console.log('Background Information Updated:Error:', error);
        });
    }
    }

    saveNext() {
        if (!this.isChild) {
            this.navigateToPreferences();
        }
    }
    navigateToPreferences() {
        this[NavigationMixin.Navigate]({
            type: 'standard__namedPage',
            attributes: {
                pageName: 'preferences'
            }
        });
    }
    backToPreviousTab(){
        if (!this.isChild) {
            this.navigateToEducationInformation();
        }
    }
    navigateToEducationInformation() {
        this[NavigationMixin.Navigate]({
            type: 'standard__namedPage',
            attributes: {
                pageName: 'educationinformation'
            }
        });
    }

    handleFieldsValidity(){
        if(this.fellowshipApplyingFor == 'U.S. Fellowship' || this.fellowshipApplyingFor == 'China Fellowship' || this.fellowshipApplyingFor == 'India Fellowship'){
            this.isworkExpRequired = true;
            this.isfinanAnalysis= true;
            this.isGreenGas = true;
            this.isdataAnalysis = true;
            this.isSupplyChain = true;
            this.isEnergyEffi = true;
        }

        if(this.fellowshipApplyingFor == 'U.S. Fellowship'){
            this.isLegalAuthUS = true;
            this.isFutureWork = true;
        }
        if(this.fellowshipApplyingFor == 'India Fellowship'){
            this.isIdCard = true;
            this.isEngProficient = true;
        }
        if(this.fellowshipApplyingFor == 'China Fellowship'){
            this.isIdCard = true;
            this.isEngProficient = true;
            this.isChinaResi = true;
            this.testScore = true;
        }

    }

    isInputValid() {
        let isValid = true;
        let inputFields = this.template.querySelectorAll('lightning-combobox');
        inputFields.forEach(inputField => {
            if (!inputField.checkValidity()) {
                inputField.reportValidity();
                inputField.focus();
                isValid = false;
            }
        });

        return isValid;


    }

    // Added by HSingh - FB-2039
    checkDeadline() {
        if (this._isDeadlinePassed == null) {
            checkDeadlinePassed()
            .then(response => {
                this._isDeadlinePassed = response;
            })
            .catch(error => {
                this._isDeadlinePassed = true;
            });
        }
    }

    // Added by HSingh - FB-2039
    set isDeadlinePassed(value) {
        this._isDeadlinePassed = value;
    }
    get isDeadlinePassed() {
        return (this._isDeadlinePassed == null  ||  this._isDeadlinePassed == true) ? true : false;
    }

    navigateToDashboard() {
        this[NavigationMixin.Navigate]({
            type: 'standard__namedPage',
            attributes: {
                pageName: 'home'
            }
        });
    }


    showToast(titleTxt, variantType, msgTxt, mode) {
        this.dispatchEvent(
            new ShowToastEvent({
                title: titleTxt,
                message: msgTxt,
                variant: variantType,
                mode: mode == null ? 'dismissible' : mode
            })
        );
    }

    showDismissibleToast(titleTxt, variantType, msgTxt) {
        this.showToast(titleTxt, variantType, msgTxt, 'dismissible');
    }

    showStickyToast(titleTxt, variantType, msgTxt) {
        this.showToast(titleTxt, variantType, msgTxt, 'sticky');
    }

    onHeadingClick() {
        this.expCollSign = onHeadingClick(this.isChild, this.template);
    }
}
import { LightningElement, track, wire, api } from "lwc";
import { NavigationMixin } from 'lightning/navigation';
import getMatchPreferences from '@salesforce/apex/FellowAppController.getMatchPreferences';
import { getPicklistValues, getObjectInfo } from 'lightning/uiObjectInfoApi';
import { getRecord, getFieldValue, updateRecord } from "lightning/uiRecordApi";
import { onHeadingClick, validateFields } from 'c/edfCommonUtils';
import updatePreference from '@salesforce/apex/FellowAppController.updatePreference';

// Import message service features required for subscribing and the message channel
import { subscribe, MessageContext } from 'lightning/messageService';
import FAPP_SUBMITTED_CHANNEL from '@salesforce/messageChannel/Application_Submitted__c';

// Import reference to the object and the fields
import FELLOW_APPLICATION_OBJECT from '@salesforce/schema/Fellow_Application__c';
import FELLOW_APPLICATION_ID_FIELD from '@salesforce/schema/Fellow_Application__c.Id';
// import AVALIBLITY_CLIMATE from '@salesforce/schema/Fellow_Application__c.Availability_Climates__c';
// import STATECITIES from '@salesforce/schema/Fellow_Application__c.State_Cities__c';
import APPLY_INDIA_FIELD from '@salesforce/schema/Fellow_Application__c.Apply_India_as_well__c';
import APPLY_CHINA_FIELD from '@salesforce/schema/Fellow_Application__c.Apply_for_China_Fellowship_as_well__c';
import REGIONS_IN_INDIA_FIELD from '@salesforce/schema/Fellow_Application__c.Regions_in_India__c';
import REGIONS_IN_INDIA_SORTED from '@salesforce/schema/Fellow_Application__c.Regions_in_India_Sorted__c';
import REGIONS_IN_CHINA_FIELD from '@salesforce/schema/Fellow_Application__c.Regions_in_China__c';
import REGIONS_IN_US_FIELD from '@salesforce/schema/Fellow_Application__c.Geographic_Yes_Region__c';
import US_REGIONAL_PREFERENCES_FIELD from '@salesforce/schema/Fellow_Application__c.US_regional_preferences__c';
import VALID_US_DRIVERS_LICENSE_FIELD from '@salesforce/schema/Fellow_Application__c.ValidUSDriversLicense__c';
import ACCESS_TO_VEHICLE_FIELD from '@salesforce/schema/Fellow_Application__c.AccessToAVehicleThisSummer__c';
import SECTOR_FIRST_CHOICE_FIELD from '@salesforce/schema/Fellow_Application__c.Sector_first_choice__c';
import SECTOR_CHOICE_SORTED from '@salesforce/schema/Fellow_Application__c.Sector_Choice_Sorted__c';
import SECTOR_CHOICE_CHINA from '@salesforce/schema/Fellow_Application__c.Sector_Choice_China__c';
// import SECTOR_SECOND_CHOICE_FIELD from '@salesforce/schema/Fellow_Application__c.Sector_second_choice__c';
// import SECTOR_THIRD_CHOICE_FIELD from '@salesforce/schema/Fellow_Application__c.Sector_third_choice__c';
import PROJECT_TYPE_PREFERENCE_ONE from '@salesforce/schema/Fellow_Application__c.Project_Type_Preference_China__c'; // Project_Type_Preference_One__c'; // temp for deployment
import PROJECT_TYPE_PREFERENCE_CHINA from '@salesforce/schema/Fellow_Application__c.Project_Type_Preference_China__c';
// import PROJECT_TYPE_PREFERENCE_TWO from '@salesforce/schema/Fellow_Application__c.Project_Type_Preference_Two__c';
// import PROJECT_TYPE_PREFERENCE_THREE from '@salesforce/schema/Fellow_Application__c.Project_Type_Preference_Three__c';

import AVAILABILITY_START_DATE from '@salesforce/schema/Fellow_Application__c.Availability_Start_Date__c';
import AVAILABILITY_END_DATE from '@salesforce/schema/Fellow_Application__c.Availability_End_Date__c';
import AVAILABILITY_ADDITIONAL from '@salesforce/schema/Fellow_Application__c.Availability_Additional__c';
import PROJECT_TYPE_PREFERENCE from '@salesforce/schema/Fellow_Application__c.Project_Type_Preference__c';
import PROJECT_TYPE_PREFERENCE_SORTED from '@salesforce/schema/Fellow_Application__c.Project_Type_Preference_Sorted__c';
import AREAS_OF_INTEREST_INDIA from '@salesforce/schema/Fellow_Application__c.Areas_of_Interest_India__c';
import AREAS_OF_INTEREST_INDIA_SORTED from '@salesforce/schema/Fellow_Application__c.Areas_of_Interest_India_Sorted__c';
import AREAS_OF_INTEREST_OTHER from '@salesforce/schema/Fellow_Application__c.Areas_of_Interest_Other__c';

// Labels added by Harpreet on 04-Jan-2022

// import AreaOfIntrestl from '@salesforce/label/c.AreaOfIntrest';
// import availabilityClimate from '@salesforce/label/c.availabilityClimate';
// import Statescities from '@salesforce/label/c.Statescities';
// import Project_Type_Preference from '@salesforce/label/c.Project_Type_Preference';
import Page_Heading from '@salesforce/label/c.FellowApp_MatchPref_Page_Heading';
import USRegionPref_HelpText from '@salesforce/label/c.FellowApp_MatchPref_USRegionPref_HelpText';
import IndiaRegionPref_HelpText from '@salesforce/label/c.FellowApp_MatchPref_IndiaRegionPref_HelpText';
import ChinaRegionPref_HelpText from '@salesforce/label/c.FellowApp_MatchPref_ChinaRegionPref_HelpText';
import USRegionPref_FieldLabel from '@salesforce/label/c.FellowApp_MatchPref_USRegionPref_FieldLabel';
import IndiaRegionPref_FieldLabel from '@salesforce/label/c.FellowApp_MatchPref_IndiaRegionPref_FieldLabel';
import ChinaRegionPref_FieldLabel from '@salesforce/label/c.FellowApp_MatchPref_ChinaRegionPref_FieldLabel';
import InterestForIndiaChina_FieldLabel from '@salesforce/label/c.FellowApp_MatchPref_InterestForIndiaChina_FieldLabel';
import InterestForIndiaChina_HelpText from '@salesforce/label/c.FellowApp_MatchPref_InterestForIndiaChina_HelpText';
import USRegionPrefText_FieldLabel from '@salesforce/label/c.FellowApp_MatchPref_USRegionPrefText_FieldLabel';
import USRegionPrefText_CharacterLimit from '@salesforce/label/c.FellowApp_MatchPref_USRegionPrefText_CharacterLimit';
import USDriverLicense_FieldLabel from '@salesforce/label/c.FellowApp_MatchPref_USDriverLicense_FieldLabel';
import AccessToVehicle_FieldLabel from '@salesforce/label/c.FellowApp_MatchPref_AccessToVehicle_FieldLabel';
import SectorPreference_Heading from '@salesforce/label/c.FellowApp_MatchPref_SectorPreference_Heading';
import SectorPreference3Choices_Heading from '@salesforce/label/c.FellowApp_MatchPref_SectorPreference3Choices_Heading';
// import SectorFirstChoice_FieldLabel from '@salesforce/label/c.FellowApp_MatchPref_SectorFirstChoice_FieldLabel';
// import SectorSecondChoice_FieldLabel from '@salesforce/label/c.FellowApp_MatchPref_SectorSecondChoice_FieldLabel';
// import SectorThirdChoice_FieldLabel from '@salesforce/label/c.FellowApp_MatchPref_SectorThirdChoice_FieldLabel';
import ProjectTypePreference_Heading from '@salesforce/label/c.FellowApp_MatchPref_ProjectTypePreference_Heading';
import ProjectTypePreference3Choices_Heading from '@salesforce/label/c.FellowApp_MatchPref_ProjectTypePreference3Choices_Heading';
// import ProjectTypeFirstChoice_FieldLabel from '@salesforce/label/c.FellowApp_MatchPref_ProjectTypeFirstChoice_FieldLabel';
// import ProjectTypeSecondChoice_FieldLabel from '@salesforce/label/c.FellowApp_MatchPref_ProjectTypeSecondChoice_FieldLabel';
// import ProjectTypeThirdChoice_FieldLabel from '@salesforce/label/c.FellowApp_MatchPref_ProjectTypeThirdChoice_FieldLabel';
import Back_ButtonLabel from '@salesforce/label/c.FellowApp_Back_ButtonLabel';
import SaveNext_ButtonLabel from '@salesforce/label/c.FellowApp_SaveNext_ButtonLabel';
import Cancel_ButtonLabel from '@salesforce/label/c.FellowApp_Cancel_ButtonLabel';
import Save_ButtonLabel from '@salesforce/label/c.FellowApp_Save_ButtonLabel';


import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import BOOTSTRAPData from '@salesforce/resourceUrl/bootstrapdata';
import { loadStyle, loadScript } from 'lightning/platformResourceLoader';
import registrationgbImage from '@salesforce/resourceUrl/registrationgbImage';
import checkDeadlinePassed from '@salesforce/apex/FellowAppController.isDeadlinePassed'; // Added by HSingh - FB-2039


export default class EDF17_MatchPreferences extends NavigationMixin(LightningElement) {

    // Labels added by Harpreet on 04-Jan-2022
    label = {
        Page_Heading: this.getCustomLabel(Page_Heading),
		// AreaOfIntrestl: this.getCustomLabel(AreaOfIntrestl),
		// Statescities: this.getCustomLabel(Statescities),
		Project_Type_Preference: 'this.getCustomLabel(Project_Type_Preference)',
		// availabilityClimate: this.getCustomLabel(availabilityClimate),
        USRegionPref_HelpText: this.getCustomLabel(USRegionPref_HelpText),
        IndiaRegionPref_HelpText: this.getCustomLabel(IndiaRegionPref_HelpText),
        ChinaRegionPref_HelpText: this.getCustomLabel(ChinaRegionPref_HelpText),
        USRegionPref_FieldLabel: this.getCustomLabel(USRegionPref_FieldLabel),
        IndiaRegionPref_FieldLabel: this.getCustomLabel(IndiaRegionPref_FieldLabel),
        ChinaRegionPref_FieldLabel: this.getCustomLabel(ChinaRegionPref_FieldLabel),

        InterestForIndiaChina_FieldLabel: this.getCustomLabel(InterestForIndiaChina_FieldLabel),
        InterestForIndiaChina_HelpText: this.getCustomLabel(InterestForIndiaChina_HelpText),
        USRegionPrefText_FieldLabel: this.getCustomLabel(USRegionPrefText_FieldLabel),
        USRegionPrefText_CharacterLimit: this.getCustomLabel(USRegionPrefText_CharacterLimit),
        USDriverLicense_FieldLabel: this.getCustomLabel(USDriverLicense_FieldLabel),
        AccessToVehicle_FieldLabel: this.getCustomLabel(AccessToVehicle_FieldLabel),
        SectorPreference_Heading: this.getCustomLabel(SectorPreference_Heading),
        SectorPreference3Choices_Heading: this.getCustomLabel(SectorPreference3Choices_Heading),
        // SectorFirstChoice_FieldLabel: this.getCustomLabel(SectorFirstChoice_FieldLabel),
        // SectorSecondChoice_FieldLabel: this.getCustomLabel(SectorSecondChoice_FieldLabel),
        // SectorThirdChoice_FieldLabel: this.getCustomLabel(SectorThirdChoice_FieldLabel),
        ProjectTypePreference_Heading: this.getCustomLabel(ProjectTypePreference_Heading),
        ProjectTypePreference3Choices_Heading: this.getCustomLabel(ProjectTypePreference3Choices_Heading),
        // ProjectTypeFirstChoice_FieldLabel: this.getCustomLabel(ProjectTypeFirstChoice_FieldLabel),
        // ProjectTypeSecondChoice_FieldLabel: this.getCustomLabel(ProjectTypeSecondChoice_FieldLabel),
        // ProjectTypeThirdChoice_FieldLabel: this.getCustomLabel(ProjectTypeThirdChoice_FieldLabel),
        Back_ButtonLabel: this.getCustomLabel(Back_ButtonLabel),
        SaveNext_ButtonLabel: this.getCustomLabel(SaveNext_ButtonLabel),
        Cancel_ButtonLabel: this.getCustomLabel(Cancel_ButtonLabel),
        Save_ButtonLabel: this.getCustomLabel(Save_ButtonLabel),
    }
    // variables
    availabilityStartDate = '';
    availabilityEndDate = '';
    availabilityAdditional = '';
    @track projectTypePreference = [];
    @track areaOfInterestSelected = [];
    areasOfInterestOthers = '';

    fellowApplicationId = '';
    fellowshipApplyingFor = '';
    applyIndia = false;
    applyChina = false;
    regionsInIndia = '';
    regionsInChina = '';
	AreaOfIntrests = '';
    regionsInUS = '';
    usRegionalPreferences = '';
    validUSDriversLicense = '';
    accessToVehicle = '';
    @track sectorFirstChoice = []; // FB-2980
    @track sectorChoiceChina = []; // FB-3193
    // sectorSecondChoice = '';
    // sectorThirdChoice = '';
    @track projectTypePreferenceOne = []; // FB-2980
    @track projectTypePreferenceChina = []; // FB-3193
    // projectTypePreferenceTwo = '';
    // projectTypePreferenceThree = '';
    isUSFellowShip = false;
    isChinaFellowship = false;
    isIndiaFellowShip = false;
    isUsRelocation = false;
    isFirstChoice = false;
    isSecondChoice = false;
    isThirdChoice = false;
    isChinaRelocation = false;
    isIndiaRelocation = false;

    @track regionsInIndiaSelected = [];
    @track regionsInIndiaOptions = [];

    @track regionsInChinaSelected = [];
    @track regionsInChinaOptions = [];

	@track areaOfIntSelected = []; // May not be used
    @track areaOfIntOptions = [];


    @track regionsInUSSelected = [];
    @track regionsInUSOptions = [];

    @api backgroundImageClass = 'body-bg-image-application';

    @api showInterestForIndiaChina;
    @api lblInterestForIndiaChina;
    @api lblInterestForIndiaChinaHelpText;
    @api showUSRegionPref;
    @api lblUSRegionPref;
    @api lblUSRegionPrefHelpText;
    @api charsUSRegionPrefText;
    @api showUSDriverLicense;
    @api lblUSDriverLicense;
    @api showAccessToVehicle;
    @api lblAccessToVehicle;
    @api showSectorPreference;
    @api showSectorPreferenceChina;
    @api lblSectorPreferenceHeader;
    @api lblSectorPreferenceNote;
    @api lblSectorFirstChoice;
    // @api lblSectorSecondChoice;
    // @api lblSectorThirdChoice;
    @api showProjectTypePreferenceSection;
    @api showProjectTypePreferenceSectionChina;
    @api lblProjectTypePreferenceHeader;
    @api lblProjectTypePreferenceNote;
    @api lblProjectTypeFirstChoice;
    // @api lblProjectTypeSecondChoice;
    // @api lblProjectTypeThirdChoice;
    @api showRegionsChina;
    @api lblRegionalPreferenceChina;

    @api showAvailability;
    @api lblAvailabilityHeader;
    @api lblAvailabilityNote;
    @api lblAvailabilityStartDate;
    @api isRequiredStartDate;
    @api lblAvailabilityEndDate;
    @api isRequiredEndDate;
    @api lblAvailabilityAdditionalDetails;
    @api isRequiredAvailabilityAdditional;
    @api charsAvailabilityAdditional;
    @api showProjectTypePreference;
    @api lblProjectTypePreference;
    @api isRequiredProjectTypePref;
    @api showRegionsIndia;
    @api lblRegionalPreferenceIndia;
    @api isRequiredRegionsIndia;
    @api showAreasOfInterest;
    @api showAreasOfInterestIndia;
    @api lblAreasOfInterestIndia;
    @api isRequiredAreasOfInterest;
    @api lblAreasOfInterestOther;
    @api charsAreasOfInterestOther;
    @api saveSuccessTitle;
    @api saveSuccessMessage;
    @api isChild = false;
    @api readOnly = false;

    // Following custom variables are used for Review Fellow App Page
    contentCSS = '';
    expCollSign;
    cssSection = 'registration-application-section';
    cssSectionSub = 'registration-application-section-sub';

    _isDeadlinePassed = null; // FB-2039

    // By using the MessageContext @wire adapter, unsubscribe will be called
    // implicitly during the component descruction lifecycle.
    @wire(MessageContext)
    messageContext;

    subscription = null;

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
        this.getMatchPref();
        this.checkDeadline(); // FB-2039
        if (this.isChild) {
            this.contentCSS = 'content';
            this.expCollSign = '+';
            this.cssSection += ' no-padding-top no-padding-bottom';
            this.cssSectionSub += ' no-padding-top no-padding-bottom';

            this.subscribeToMessageChannel();
        }
    }

    getMatchPref() {
        getMatchPreferences().then(response => {
            console.log('response:', response);

            this.fellowApplicationId = response.id;
            this.fellowshipApplyingFor = response.fellowshipApplyingFor ?? '';
            if(this.fellowshipApplyingFor =='India Fellowship'){
                this.isIndiaFellowShip = true;
                this.isChinaFellowship = false;
                this.isUSFellowShip = false;
            }
            if(this.fellowshipApplyingFor =='China Fellowship'){
                this.isChinaFellowship = true;
                this.isIndiaFellowShip = false;
                this.isUSFellowShip = false;
            }
            if(this.fellowshipApplyingFor =='U.S. Fellowship'){
                this.isUSFellowShip = true;
                this.isIndiaFellowShip = false;
                this.isChinaFellowship = false;
            }
            this.applyIndia = response.applyIndia ?? '';
            this.applyChina = response.applyChina ?? '';
            this.regionsInIndia = response.regionsInIndia ?? '';
            if (response.regionsInIndia) {
                this.regionsInIndiaSelected = response.regionsInIndia.split(';');
            }
            this.regionsInChina = response.regionsInChina;
            if (response.regionsInChina) {
                this.regionsInChinaSelected = response.regionsInChina.split(';');
            }
            this.regionsInUS = response.regionsInUS;
            if (response.regionsInUS) {
                this.regionsInUSSelected = response.regionsInUS.split(';');
            }
			// this.areaOfIntSelected = response.AreaOfIntrests.split(';');
            this.usRegionalPreferences = response.usRegionalPreferences ?? '';
            this.validUSDriversLicense = response.validUSDriversLicense ?? '';
            this.accessToVehicle = response.accessToVehicle ?? '';

            // this.sectorFirstChoice = response.sectorFirstChoice ?? '';
            if (response.sectorFirstChoice) { // FB-2980
                this.sectorFirstChoice = response.sectorFirstChoice.split(';');
            }
            if (response.sectorChoiceChina) { // FB-3193
                this.sectorChoiceChina = response.sectorChoiceChina.split(';');
            }
            // this.sectorSecondChoice = response.sectorSecondChoice ?? '';
            // this.sectorThirdChoice = response.sectorThirdChoice ?? '';
            // this.projectTypePreferenceOne = response.projectTypePreferenceOne ?? '';
            if (response.projectTypePreferenceOne) { // FB-2980
                this.projectTypePreferenceOne = response.projectTypePreferenceOne.split(';');
            }
            if (response.projectTypePreferenceChina) { // FB-3193
                this.projectTypePreferenceChina = response.projectTypePreferenceChina.split(';');
            }
            // this.projectTypePreferenceTwo = response.projectTypePreferenceTwo ?? '';
            // this.projectTypePreferenceThree = response.projectTypePreferenceThree ?? '';

			this.availabilityStartDate = response.availabilityStartDate ?? '';
            this.availabilityEndDate = response.availabilityEndDate ?? '';
            this.availabilityAdditional = response.availabilityAdditional ?? '';
            if (response.projectTypePreference) this.projectTypePreference = response.projectTypePreference.split(';');
            if (response.areaOfInterestSelected) this.areaOfInterestSelected = response.areaOfInterestSelected.split(';');
            this.areasOfInterestOthers = response.areasOfInterestOthers ?? '';

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

    // Get Object Info.
    @wire (getObjectInfo, {objectApiName: FELLOW_APPLICATION_OBJECT})
    fellowAppObjectInfo;

    // Perhaps, this method is not being used.
    setDefaultValues(){

        this.template.querySelector('.apply-india').checked = this.applyIndia;
        this.template.querySelector('.apply-china').checked = this.applyChina;
        //this.template.querySelector('.regions-in-india').value = this.regionsInIndiaSelected;
        //this.template.querySelector('.regions-in-china').value = this.regionsInChinaSelected;
        //this.template.querySelector('.us-regional-preferences').value = this.usRegionalPreferences;
        this.template.querySelector('.valid-us-drivers-license').value = this.validUSDriversLicense;
        this.template.querySelector('.access-to-vehicle').value = this.accessToVehicle;
        // this.template.querySelector('.sector-first-choice').value = this.sectorFirstChoice;
        // this.template.querySelector('.sector-second-choice').value = this.sectorSecondChoice;
        // this.template.querySelector('.sector-third-choice').value = this.sectorThirdChoice;
    }

    // Get "Regions in India" Picklist values.
    @wire(getPicklistValues, {recordTypeId: '$fellowAppObjectInfo.data.defaultRecordTypeId', fieldApiName: REGIONS_IN_INDIA_FIELD })
    regionsInIndiaPickListValues(data, error){
        if(data && data.data && data.data.values){
            // console.log('regionsInIndiaPickListValues :: ', JSON.stringify(data.data.values));
            data.data.values.forEach( objPicklist => {
                this.regionsInIndiaOptions.push({
                    label: objPicklist.label,
                    value: objPicklist.value
                });
            });
        } else if(error){
            console.log(error);
        }
    };

    // Get "Regions in China" Picklist values.
    @wire(getPicklistValues, {recordTypeId: '$fellowAppObjectInfo.data.defaultRecordTypeId', fieldApiName: REGIONS_IN_CHINA_FIELD })
    regionsInChinaPickListValues(data, error){
        if(data && data.data && data.data.values){
            // console.log('regionsInChinaPickListValues :: ', JSON.stringify(data.data.values));
            data.data.values.forEach( objPicklist => {
                this.regionsInChinaOptions.push({
                    label: objPicklist.label,
                    value: objPicklist.value
                });
            });
        } else if(error){
            console.log(error);
        }
    };

    // Get "Regions in US" Picklist values.
    @wire(getPicklistValues, {recordTypeId: '$fellowAppObjectInfo.data.defaultRecordTypeId', fieldApiName: REGIONS_IN_US_FIELD })
    regionsInUSPickListValues(data, error){
        if(data && data.data && data.data.values){
            // console.log('regionsInUSPickListValues :: ', JSON.stringify(data.data.values));
            data.data.values.forEach( objPicklist => {
                this.regionsInUSOptions.push({
                    label: objPicklist.label,
                    value: objPicklist.value
                });
            });
        } else if(error){
            console.log(error);
        }
    };



    // Get "Do you have a valid US Driver's License" Picklist values.
    @wire(getPicklistValues, {recordTypeId: '$fellowAppObjectInfo.data.defaultRecordTypeId', fieldApiName: VALID_US_DRIVERS_LICENSE_FIELD })
    validUSDriversLicensePickList;

    // Get "Access to a vehicle" Picklist values.
    @wire(getPicklistValues, {recordTypeId: '$fellowAppObjectInfo.data.defaultRecordTypeId', fieldApiName: ACCESS_TO_VEHICLE_FIELD })
    accessToVehiclePickList;

    // Get "Sector First Choice" Picklist values.
    @wire(getPicklistValues, {recordTypeId: '$fellowAppObjectInfo.data.defaultRecordTypeId', fieldApiName: SECTOR_FIRST_CHOICE_FIELD })
    sectorFirstChoicePickList;

    // Get "Sector Choice China" Picklist values. FB-3193
    @wire(getPicklistValues, {recordTypeId: '$fellowAppObjectInfo.data.defaultRecordTypeId', fieldApiName: SECTOR_CHOICE_CHINA })
    sectorChoiceChinaPickList;

    /* // Get "Sector Second Choice" Picklist values.
    @wire(getPicklistValues, {recordTypeId: '$fellowAppObjectInfo.data.defaultRecordTypeId', fieldApiName: SECTOR_SECOND_CHOICE_FIELD })
    sectorSecondChoicePickList;

    // Get "Sector Third Choice" Picklist values.
    @wire(getPicklistValues, {recordTypeId: '$fellowAppObjectInfo.data.defaultRecordTypeId', fieldApiName: SECTOR_THIRD_CHOICE_FIELD })
    sectorThirdChoicePickList; */

     // Get "Project Type Preference One" Picklist values.
    @wire(getPicklistValues, {recordTypeId: '$fellowAppObjectInfo.data.defaultRecordTypeId', fieldApiName: PROJECT_TYPE_PREFERENCE_ONE })
    projectTypePreferenceOnePickList;

     // Get "Project Type Preference China" Picklist values. FB-3193
     @wire(getPicklistValues, {recordTypeId: '$fellowAppObjectInfo.data.defaultRecordTypeId', fieldApiName: PROJECT_TYPE_PREFERENCE_CHINA })
     projectTypePreferenceChinaPickList;

     /* // Get "Project Type Preference Two" Picklist values.
    @wire(getPicklistValues, {recordTypeId: '$fellowAppObjectInfo.data.defaultRecordTypeId', fieldApiName: PROJECT_TYPE_PREFERENCE_TWO })
    projectTypePreferenceTwoPickList;

    // Get "Project Type Preference Three" Picklist values.
    @wire(getPicklistValues, {recordTypeId: '$fellowAppObjectInfo.data.defaultRecordTypeId', fieldApiName: PROJECT_TYPE_PREFERENCE_THREE })
    projectTypePreferenceThreePickList; */

	// Get "Project Type Preference" Picklist values.
	@wire(getPicklistValues, {recordTypeId: '$fellowAppObjectInfo.data.defaultRecordTypeId', fieldApiName: PROJECT_TYPE_PREFERENCE })
    projectTypePreferencePickList;

	// Get "Areas of Interest" Picklist values.
	@wire(getPicklistValues, {recordTypeId: '$fellowAppObjectInfo.data.defaultRecordTypeId', fieldApiName: AREAS_OF_INTEREST_INDIA })
    areaOfIntrestPickList(data, error){
		if(data && data.data && data.data.values){
            // console.log('areaOfIntrestPickList :: ', JSON.stringify(data.data.values));
			data.data.values.forEach( objPicklist => {
				this.areaOfIntOptions.push({
					label: objPicklist.label,
					value: objPicklist.value
				});
			});
		} else if(error){
			console.log(error);
		}
	}

    //Change Handlers
    applyIndiaChangeHandler(event){
        this.applyIndia = event.target.checked;
    }

    applyChinaChangeHandler(event){
        this.applyChina = event.target.checked;
    }

    regionsInIndiaChangeHandler(event) {
        this.regionsInIndiaSelected = event.detail.value;
    }

    regionsInChinaChangeHandler(event) {
        this.regionsInChinaSelected = event.detail.value;
    }
	areaOfIntChangeHandler(event) {
        this.areaOfIntSelected = event.detail.value;
    }
    regionsInUSChangeHandler(event) {
        this.regionsInUSSelected = event.detail.value;
    }

    usRegionalPreferencesChangeHandler(event){
        this.usRegionalPreferences = event.target.value;
    }

    validUSDriversLicenseChangeHandler(event){
        this.validUSDriversLicense = event.target.value;
    }

    accessToVehicleChangeHandler(event){
        this.accessToVehicle = event.target.value;
    }

    sectorFirstChoiceChangeHandler(event){
        this.sectorFirstChoice = event.target.value;
    }

    // FB-3193
    sectorChoiceChinaChangeHandler(event){
        this.sectorChoiceChina = event.target.value;
    }

    /* // FB-2980
    sectorSecondChoiceChangeHandler(event){
        this.sectorSecondChoice = event.target.value;
    }

    sectorThirdChoiceChangeHandler(event){
        this.sectorThirdChoice = event.target.value;
    } */

    projectTypePreferenceOneChangeHandler(event) {
        this.projectTypePreferenceOne = event.target.value;
    }

    // FB-3193
    projectTypePreferenceChinaChangeHandler(event) {
        this.projectTypePreferenceChina = event.target.value;
    }

    /* // FB-2980
    projectTypePreferenceTwoChangeHandler(event) {
        this.projectTypePreferenceTwo = event.target.value;
    }

    projectTypePreferenceThreeChangeHandler(event) {
        this.projectTypePreferenceThree = event.target.value;
    } */

    availabilityStartDateChangeHandler(event) {
		this.availabilityStartDate = event.target.value;
	}
    availabilityEndDateChangeHandler(event) {
		this.availabilityEndDate = event.target.value;
	}
    availabilityAdditionalChangeHandler(event) {
		this.availabilityAdditional = event.target.value;
	}

	projectTypePreferenceHandler(event){
        this.projectTypePreference = event.target.value;
    }
	/* StatescitiesHandler(event) {
		this.Statescitiess = event.target.value;
	} */
	areaOfInterestChangeHandler(event) {
        this.areaOfInterestSelected = event.target.value;
    }
    areasOfInterestOthersChangeHandler(event) {
        this.areasOfInterestOthers = event.target.value;
    }

    //update details
    updateMatchPreferences(){

        const fields = {};
        fields[FELLOW_APPLICATION_ID_FIELD.fieldApiName] = this.fellowApplicationId;
        fields[APPLY_INDIA_FIELD.fieldApiName] = this.applyIndia;
        fields[APPLY_CHINA_FIELD.fieldApiName] = this.applyChina;
        fields[REGIONS_IN_INDIA_FIELD.fieldApiName] = this.regionsInIndiaSelected ? this.regionsInIndiaSelected.join(';') : null;
        fields[REGIONS_IN_INDIA_SORTED.fieldApiName] = this.regionsInIndiaSelected ? this.regionsInIndiaSelected.join(';') : null;
        fields[REGIONS_IN_CHINA_FIELD.fieldApiName] = this.regionsInChinaSelected ? this.regionsInChinaSelected.join(';') : null;
        fields[REGIONS_IN_US_FIELD.fieldApiName] = this.regionsInUSSelected ? this.regionsInUSSelected.join(';') : null;
        // console.log('updateMatchPreferences :: 1. fields ::', fields);
        fields[US_REGIONAL_PREFERENCES_FIELD.fieldApiName] = this.usRegionalPreferences;
        fields[VALID_US_DRIVERS_LICENSE_FIELD.fieldApiName] = this.validUSDriversLicense;
        fields[ACCESS_TO_VEHICLE_FIELD.fieldApiName] = this.accessToVehicle;
        fields[SECTOR_FIRST_CHOICE_FIELD.fieldApiName] = this.sectorFirstChoice ? this.sectorFirstChoice.join(';') : null; // FB-2980
        fields[SECTOR_CHOICE_CHINA.fieldApiName] = this.sectorChoiceChina ? this.sectorChoiceChina.join(';') : null; // FB-3193
        console.log('updateMatchPreferences :: 1. fields ::', this.sectorChoiceChina);
        console.log('updateMatchPreferences :: 1. fields ::', this.sectorChoiceChina.length);
        if (this.sectorFirstChoice.length > 0) {
            fields[SECTOR_CHOICE_SORTED.fieldApiName] = this.sectorFirstChoice.join(';'); // FB-2980 - US
        }
        else if (this.sectorChoiceChina.length > 0) {
            fields[SECTOR_CHOICE_SORTED.fieldApiName] = this.sectorChoiceChina.join(';'); // FB-3193 - China
        }
        console.log('updateMatchPreferences :: 2. fields ::', fields);
        // fields[SECTOR_SECOND_CHOICE_FIELD.fieldApiName] = this.sectorSecondChoice;
        // fields[SECTOR_THIRD_CHOICE_FIELD.fieldApiName] = this.sectorThirdChoice;

        // fields[PROJECT_TYPE_PREFERENCE_TWO.fieldApiName] = this.projectTypePreferenceTwo;
        // fields[PROJECT_TYPE_PREFERENCE_THREE.fieldApiName] = this.projectTypePreferenceThree;

		fields[AVAILABILITY_START_DATE.fieldApiName] = this.availabilityStartDate;
		fields[AVAILABILITY_END_DATE.fieldApiName] = this.availabilityEndDate;
		fields[AVAILABILITY_ADDITIONAL.fieldApiName] = this.availabilityAdditional;

        fields[PROJECT_TYPE_PREFERENCE_ONE.fieldApiName] = this.projectTypePreferenceOne ? this.projectTypePreferenceOne.join(';') : null; // FB-2980
        fields[PROJECT_TYPE_PREFERENCE_CHINA.fieldApiName] = this.projectTypePreferenceChina ? this.projectTypePreferenceChina.join(';') : null; // FB-2980
        fields[PROJECT_TYPE_PREFERENCE.fieldApiName] = this.projectTypePreference ? this.projectTypePreference.join(';') : null;
        if (this.projectTypePreferenceOne.length > 0) {
            fields[PROJECT_TYPE_PREFERENCE_SORTED.fieldApiName] = this.projectTypePreferenceOne.join(';'); // US
        }
        else if (this.projectTypePreference.length > 0) {
            fields[PROJECT_TYPE_PREFERENCE_SORTED.fieldApiName] = this.projectTypePreference.join(';'); // India
        }
        else if (this.projectTypePreferenceChina.length > 0) {
            fields[PROJECT_TYPE_PREFERENCE_SORTED.fieldApiName] = this.projectTypePreferenceChina.join(';'); // FB-3193 - China
        }

        fields[AREAS_OF_INTEREST_INDIA.fieldApiName] = this.areaOfInterestSelected ? this.areaOfInterestSelected.join(';') : null;
		fields[AREAS_OF_INTEREST_INDIA_SORTED.fieldApiName] = this.areaOfInterestSelected ? this.areaOfInterestSelected.join(';') : null;
		fields[AREAS_OF_INTEREST_OTHER.fieldApiName] = this.areasOfInterestOthers;

        // fields[STATECITIES.fieldApiName] = this.Statescitiess;
        const recordInput = {
            fields: fields
        };

        // console.log('updateMatchPreferences :: calling isInputValid()');
        if(this.isInputValid()){
            // updateRecord(recordInput).then((record) => {
            console.log('updateMatchPreferences :: fields ::', fields);
            updatePreference({fa:fields}).then((result) => {
                console.log('updateMatchPreferences', result);
                if (result == '') {
                    this.showToast(this.saveSuccessTitle, 'success', this.saveSuccessMessage);

                    this.getMatchPref();
                    //this.setDefaultValues();
                    this.saveNext();
                }
                else {
                    // console.log('INSIDE SAVE ERROR ::', result);
                    this.showStickyToast('Match Preferences', 'error', result);
                }
            }).error(error => {

                console.log('Match Preferences Updated:Error:', error);
            });
        }
    }

    saveNext() {
        if (!this.isChild) {
            this.navigateToCoverLetter();
        }
    }
    navigateToCoverLetter() {
        this[NavigationMixin.Navigate]({
            type: 'standard__namedPage',
            attributes: {
                pageName: 'coverletter'
            }
        });
    }
    backToPreviousTab(){
        if (!this.isChild) {
            this.navigateToBackgroundInformation();
        }
    }
    navigateToBackgroundInformation() {
        this[NavigationMixin.Navigate]({
            type: 'standard__namedPage',
            attributes: {
                pageName: 'backgroundinformation'
            }
        });
    }
    handleFieldsValidity(){
        /* if(this.fellowshipApplyingFor == 'U.S. Fellowship' ){
            this.isUsRelocation = true;
            this.isFirstChoice = true;
            this.isSecondChoice = true;
            this.isThirdChoice = true;
        }
        if(this.fellowshipApplyingFor == 'China Fellowship'){
            this.isChinaRelocation = true;
        }
        if(this.fellowshipApplyingFor == 'India Fellowship'){
            this.isIndiaRelocation = true;
        } */
    }

    isInputValid() {
        let isValid = true;
        isValid = isValid && validateFields(this.template.querySelectorAll('lightning-combobox'));
        isValid = isValid && validateFields(this.template.querySelectorAll('lightning-dual-listbox'));
        isValid = isValid && validateFields(this.template.querySelectorAll('lightning-input'));
        isValid = isValid && validateFields(this.template.querySelectorAll('lightning-textarea'));
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

    getCustomLabel(labelText) {
        return (labelText == '___HIDE___') ? null : labelText;
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
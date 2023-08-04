import { LightningElement, api, wire } from 'lwc';
import checkDeadlinePassed from '@salesforce/apex/FellowAppController.isDeadlinePassed'; // Added by HSingh - FB-2039
import SubmitApplicationMethod from '@salesforce/apex/FellowAppController.submitApplication';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { publish, MessageContext } from 'lightning/messageService';
import FAPP_SUBMITTED_CHANNEL from '@salesforce/messageChannel/Application_Submitted__c';

export default class EDF54_SubmitFellowApp extends LightningElement {

    @api labelSubmitAppBtn;
    @api msgFAppSubmitted;
    @api titleFAppSubmitted;

    _isDeadlinePassed = null; // FB-2039
    blockRegister = false;

    connectedCallback() {
        // Added by HSingh - FB-2039
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

    @wire(MessageContext)
    messageContext;

    // Added by HSingh - FB-2039
    set isDeadlinePassed(value) {
        this._isDeadlinePassed = value;
    }
    get isDeadlinePassed() {
        return (this._isDeadlinePassed == null  ||  this._isDeadlinePassed == true) ? true : false;
    }


    submitApplication() {
        SubmitApplicationMethod().then(response => {
            console.log('Records updated: ', response);
            if (response == '') {
                const toastEvent = new ShowToastEvent({
                    title: this.titleFAppSubmitted,
                    message: this.msgFAppSubmitted,
                    variant: 'success'
                });
                this.dispatchEvent(toastEvent);
                this.blockRegister = true;

                // Publish it for other components to update themselves.
                const payload = { fAppId: 'fAppId' }; // Currently we do not need the ID, we are just publishing that FApp is submitted.
                publish(this.messageContext, FAPP_SUBMITTED_CHANNEL, payload);
                console.log('LMS message published');
            }
            else {
                this.showStickyToast('Error', 'error', response);
            }
        }).catch(error =>{
            console.log('Error:', error);
        });

    }

    showStickyToast(titleTxt, variantType, msgTxt) {
        this.showToast(titleTxt, variantType, msgTxt, 'sticky');
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
}
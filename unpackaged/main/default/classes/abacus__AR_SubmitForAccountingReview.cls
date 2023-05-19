/*
This file is generated and isn't the actual source code for this
managed global class.
This read-only file shows the class's global constructors,
methods, variables, and properties.
To enable code to compile, all methods return null.
*/
global class AR_SubmitForAccountingReview {
    global AR_SubmitForAccountingReview() {

    }
    global static List<abacus.AR_SubmitForAccountingReview.Response> doSubmit(List<abacus.AR_SubmitForAccountingReview.Request> requests) {
        return null;
    }
    @InvocableMethod(label='Submit for Accounting Review')
    global static List<abacus.AR_SubmitForAccountingReview.Response> submit(List<abacus.AR_SubmitForAccountingReview.Request> requests) {
        return null;
    }
global class Request {
    @InvocableVariable(label='Accounting Set API Name' description='Must be the API (Developer) Name of an Active Accounting Set' required=true)
    global String accountingSetApiName;
    @InvocableVariable(label='Primary Record's Salesforce Id' description='Must be the Salesforce Id of the Primary Record associated with this Accounting Set' required=true)
    global Id primaryRecordId;
    @InvocableVariable(label='Reason for Submit to Accounting Review' description='Optional Reason Text.  For example: Record changed.' required=false)
    global String reason;
    global Request() {

    }
}
global class Response {
    @InvocableVariable(label='Accounting Set API Name' description='Must be the API (Developer) Name of an Active Accounting Set' required=true)
    global String accountingSetApiName;
    @InvocableVariable(label='Primary Record's Salesforce Id' description='Primary Record Id Submitted for Review' required=false)
    global Id primaryRecordId;
    @InvocableVariable(label='Record Successfully Submitted For Accounting Review' required=false)
    global Boolean success;
    global Response(Id primaryRecordId, String accountingSetApiName) {

    }
}
}

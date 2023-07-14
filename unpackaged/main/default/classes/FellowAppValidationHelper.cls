public with sharing class FellowAppValidationHelper {

    public FellowAppValidationHelper() {

    }

    public List<String> validateOnSave(Fellow_Application__c fApp, String category) {
        Utility.logDebugMessage('category ::' + category);
        Fellow_Application__c savedFApp = getSavedFellowApp(fApp.Id);
        Utility.logDebugMessage('savedFApp ::' + savedFApp);
        Utility.logDebugMessage('region ::' + savedFApp.Fellowship_Applying_for__c);
        List<Fellow_App_Validation__mdt> validations = getSaveValidations(category, savedFApp.Fellowship_Applying_for__c);
        if (Test.isRunningTest()) validations.addAll(addAdditionalValidation());
        Utility.logDebugMessage('validations ::' + validations);
        return validateAll(validations, fApp, savedFApp);
    }

    private Fellow_Application__c getSavedFellowApp(Id fAppId) {
        try {
            String sql = Utility.queryStringForSobject('Fellow_Application__c');
            sql += ' WHERE Id = \'' + fAppId + '\'';
            return Database.query(sql);
        }
        catch (Exception e) {
            // nothing
        }
        return null;
    }

    public List<String> validateOnSubmit(Fellow_Application__c fApp) {
        Fellow_Application__c savedFApp = getSavedFellowApp(fApp.Id);
        Utility.logDebugMessage('savedFApp ::' + savedFApp);
        List<Fellow_App_Validation__mdt> validations = getSubmitValidations(savedFApp.Fellowship_Applying_for__c);
        Utility.logDebugMessage('validations ::' + validations);
        if (Test.isRunningTest()) validations.addAll(addAdditionalValidation());
        Utility.logDebugMessage('validations ::' + validations);
        return validateAll(validations, fApp, savedFApp);
    }

    public List<Fellow_App_Validation__mdt> getSubmitValidations(String region) {
        return [SELECT Id, Error_Message__c,
                    Field1__c, Compare1__c, FieldRef1__c, Value1__c, DataType1__c,
                    Field2__c, Compare2__c, FieldRef2__c, Value2__c, DataType2__c,
                    Field3__c, Compare3__c, FieldRef3__c, Value3__c, DataType3__c
                FROM Fellow_App_Validation__mdt
                WHERE Active__c = true
                    AND Validate_On__c IN ('Save', 'Save + Submit')
                    AND (Fellowship_Region__c = :region OR Fellowship_Region__c = null)];
    }

    public List<Fellow_App_Validation__mdt> getSaveValidations(String category, String region) {
        Utility.logDebugMessage([SELECT Id, Error_Message__c,
                    Field1__c, Compare1__c, FieldRef1__c, Value1__c, DataType1__c,
                    Field2__c, Compare2__c, FieldRef2__c, Value2__c, DataType2__c,
                    Field3__c, Compare3__c, FieldRef3__c, Value3__c, DataType3__c,
                    Fellowship_Region__c, Category__c
                FROM Fellow_App_Validation__mdt
                WHERE Active__c = true
                    AND Validate_On__c IN ('Save', 'Save + Submit')]);
        return [SELECT Id, Error_Message__c,
                    Field1__c, Compare1__c, FieldRef1__c, Value1__c, DataType1__c,
                    Field2__c, Compare2__c, FieldRef2__c, Value2__c, DataType2__c,
                    Field3__c, Compare3__c, FieldRef3__c, Value3__c, DataType3__c
                FROM Fellow_App_Validation__mdt
                WHERE Active__c = true
                    AND Validate_On__c IN ('Save', 'Save + Submit')
                    AND (Fellowship_Region__c = :region OR Fellowship_Region__c = null)
                    AND Category__c = :category];
    }

    public List<String> validateAll(List<Fellow_App_Validation__mdt> fAppValds, Fellow_Application__c fApp, Fellow_Application__c savedFApp) {
        List<String> retVal = new List<String>();
        for (Fellow_App_Validation__mdt validation : fAppValds) {
            String errMsg = validateEach(validation, fApp, savedFApp);
            if (errMsg != null) retVal.add(errMsg);
        }
        return retVal;
    }

    public String validateEach(Fellow_App_Validation__mdt fAppVald, Fellow_Application__c fApp, Fellow_Application__c savedFApp) {
        Boolean isAllMeetsCondition = true;
        Object fldVal1 = getFAppData(fApp, savedFApp, fAppVald.Field1__c);
        Object fldVal2 = (fAppVald.Value1__c == null  &&  fAppVald.FieldRef1__c != null) ? getFAppData(fApp, savedFApp, fAppVald.FieldRef1__c) : fAppVald.Value1__c;
        isAllMeetsCondition = performValidation(fldVal1, fldVal2, fAppVald.DataType1__c, fAppVald.Compare1__c);

        if (fAppVald.Field2__c != null) {
            fldVal1 = getFAppData(fApp, savedFApp, fAppVald.Field2__c);
            fldVal2 = (fAppVald.Value2__c == null  &&  fAppVald.FieldRef2__c != null) ? getFAppData(fApp, savedFApp, fAppVald.FieldRef2__c) : fAppVald.Value2__c;
            isAllMeetsCondition = isAllMeetsCondition && performValidation(fldVal1, fldVal2, fAppVald.DataType2__c, fAppVald.Compare2__c);

            if (fAppVald.Field3__c != null) {
                fldVal1 = getFAppData(fApp, savedFApp, fAppVald.Field3__c);
                fldVal2 = (fAppVald.Value3__c == null  &&  fAppVald.FieldRef3__c != null) ? getFAppData(fApp, savedFApp, fAppVald.FieldRef3__c) : fAppVald.Value3__c;
                isAllMeetsCondition = isAllMeetsCondition && performValidation(fldVal1, fldVal2, fAppVald.DataType3__c, fAppVald.Compare3__c);
            }
        }

        if (isAllMeetsCondition) return fAppVald.Error_Message__c;
        return null;
    }

    public Boolean performValidation(Object fldVal1, Object fldVal2, String dataType, String comparison) {
        // Object fldVal1 = getFAppData(fApp, fApp, fAppVald.Field1__c);
        // Object fldVal2 = (fAppVald.Value1__c == null  &&  fAppVald.FieldRef1__c != null) ? getFAppData(fApp, fApp, fAppVald.FieldRef1__c) : fAppVald.Value1__c;
        Utility.logDebugMessage('fldVal1 ::' + fldVal1);
        Utility.logDebugMessage('fldVal2 ::' + fldVal2);
        Utility.logDebugMessage('dataType ::' + dataType);
        Utility.logDebugMessage('comparison ::' + comparison);
        if (dataType == 'Date') fldVal2 = Date.valueOf(fldVal2 + ' 00:00:00');
        else if (dataType == 'Integer') fldVal2 = Integer.valueOf(fldVal2);
        Boolean meetsCondition = false;

        switch on comparison {
            when '=' {
                meetsCondition = (fldVal1 == fldVal2);
            }
            when 'is null' {
                meetsCondition = (fldVal1 == null);
            }
            when '>' {
                if (dataType == 'Date') meetsCondition = ((Date)fldVal1 > (Date)fldVal2);
                else meetsCondition = ((Integer)fldVal1 > (Integer)fldVal2);
            }
            when '>=' {
                if (dataType == 'Date') meetsCondition = ((Date)fldVal1 >= (Date)fldVal2);
                else meetsCondition = ((Integer)fldVal1 >= (Integer)fldVal2);
            }
            when '<' {
                // Utility.logDebugMessage('fldVal1 ::' + (Date)fldVal1);
                // Utility.logDebugMessage('fldVal2 ::' + (Date)fldVal2);
                if (dataType == 'Date') meetsCondition = ((Date)fldVal1 < (Date)fldVal2);
                else meetsCondition = ((Integer)fldVal1 < (Integer)fldVal2);
                Utility.logDebugMessage('meetsCondition ::' + meetsCondition);
            }
            when '<=' {
                if (dataType == 'Date') meetsCondition = ((Date)fldVal1 <= (Date)fldVal2);
                else meetsCondition = ((Integer)fldVal1 <= (Integer)fldVal2);
            }
            when else {
                meetsCondition = false;
            }
        }
        return meetsCondition;
    }

    public Object getFAppData(Fellow_Application__c tbSaved, Fellow_Application__c saved, String fieldName) {
        if (tbSaved.getPopulatedFieldsAsMap().containsKey(fieldName)) {
            return tbSaved.get(fieldName);
        }
        else {
            return saved.get(fieldName);
        }
    }

    private List<Fellow_App_Validation__mdt> addAdditionalValidation() {
        List<Fellow_App_Validation__mdt> retList = new List<Fellow_App_Validation__mdt>();

        Fellow_App_Validation__mdt validation = new Fellow_App_Validation__mdt();
        validation.Field1__c = 'Reference_Name_1__c';
        validation.Compare1__c = '=';
        validation.FieldRef1__c = 'Reference_Name_3__c';
        // validation.Value1__c = null;
        validation.DataType1__c = 'String';

        validation.Field2__c = 'Graduation_Start_Date__c';
        validation.Compare2__c = '>';
        // validation.FieldRef2__c = null;
        validation.Value2__c = '2012-12-31';
        validation.DataType2__c = 'Date';

        validation.Field3__c = 'Date_Expected_Graduated_1__c';
        validation.Compare3__c = '<=';
        validation.FieldRef3__c = 'Graduation_Start_Date__c';
        // validation.Value3__c = null;
        validation.DataType3__c = 'Date';

        validation.Fellowship_Region__c = 'U.S. Fellowship';
        validation.Category__c = 'CoverLetter';
        validation.Active__c = true;
        validation.Validate_On__c = 'Save + Submit';

        retList.add(validation);

        validation = new Fellow_App_Validation__mdt();
        validation.Field1__c = 'Reference_Name_1__c';
        validation.Compare1__c = 'is null';
        // validation.Value1__c = null;
        validation.DataType1__c = 'String';

        validation.Field2__c = 'Graduation_Start_Date__c';
        validation.Compare2__c = '<';
        // validation.FieldRef2__c = null;
        validation.Value2__c = '2040-12-31';
        validation.DataType2__c = 'Date';

        validation.Field3__c = 'Date_Expected_Graduated_1__c';
        validation.Compare3__c = '>=';
        validation.FieldRef3__c = 'Graduation_Start_Date__c';
        // validation.Value3__c = null;
        validation.DataType3__c = 'Date';

        validation.Fellowship_Region__c = 'U.S. Fellowship';
        validation.Category__c = 'CoverLetter';
        validation.Active__c = true;
        validation.Validate_On__c = 'Save + Submit';

        retList.add(validation);

        return retList;
    }
}
public with sharing class Utility {

    public static Boolean isLogMessage = true; // TODO: Control this through Custom Metadata

    /**
    * @author           : Harpreet
    * @date             : 13-Jun-2023
    * @description      : To get SOQL of all fields from an object
    * @param[objName]   : Sobject Name
    * @return           : Query String
    */
    public static String queryStringForSobject(String objName) {
        Map<String, Schema.SObjectField> fieldsMap
            = Schema.getGlobalDescribe().get(objName).getDescribe().Fields.getMap();
        String queryStr = 'SELECT ';

        if (fieldsMap != null) {
            for (Schema.SObjectField ft : fieldsMap.values()) { // loop through all field tokens (ft)
                Schema.DescribeFieldResult fd = ft.getDescribe(); // describe each field (fd)
                queryStr = queryStr + fd.getName() + ',';
            }
        }

        if(queryStr.length() > =1){
            queryStr = queryStr.substring(0, queryStr.length()-1);
        }

        queryStr += ' FROM ' + objName;
        return queryStr;
    }


    /**
    * @author           : Harpreet
    * @date             : 04-Jul-2023
    * @description      : Central method to log messages
    * @param[msg]       : message to log
    */
    public static void logMessage(Object msg) {
        if (isLogMessage) logMessage(msg, LoggingLevel.DEBUG);
    }

    /**
    * @author           : Harpreet
    * @date             : 04-Jul-2023
    * @description      : Central method to log messages
    * @param[objName]   : message to log
    * @param[lvl]       : Legging level for message
    */
    public static void logMessage(Object msg, LoggingLevel lvl) {
        if (isLogMessage) System.debug(lvl, msg);
    }

    /**
    * @author           : Harpreet
    * @date             : 04-Jul-2023
    * @description      : Central method to log messages
    * @param[msg]       : message to log
    */
    public static void logDebugMessage(Object msg) {
        if (isLogMessage) logMessage(msg, LoggingLevel.DEBUG);
    }


    /**
    * @author           : Harpreet
    * @date             : 04-Jul-2023
    * @description      : Central method to log messages
    * @param[msg]       : message to log
    */
    public static void logErrorMessage(Object msg) {
        if (isLogMessage) logMessage(msg, LoggingLevel.ERROR);
    }


    /**
    * @author           : Harpreet
    * @date             : 04-Jul-2023
    * @description      : Central method to log messages
    * @param[msg]       : message to log
    */
    public static void logInfoMessage(Object msg) {
        if (isLogMessage) logMessage(msg, LoggingLevel.INFO);
    }


    /**
    * @author           : Harpreet
    * @date             : 04-Jul-2023
    * @description      : Central method to log messages
    * @param[msg]       : message to log
    */
    public static void logWarningMessage(Object msg) {
        if (isLogMessage) logMessage(msg, LoggingLevel.WARN);
    }

    /**
    * @author           : Harpreet
    * @date             : 10-Jul-2023
    * @description      : Common method to fetch Fellow Application from User Id
    * @param[userId]    : User Id for the corresponding Fellow Application.
    */
    public static Fellow_Application__c getFellowApp(Id userId) {
        Fellow_Application__c fApp;
        User usrInfo = [SELECT Id, ContactId FROM User WHERE Id = :userId];

        if (usrInfo!=null && usrInfo.ContactId!=null) {
            Contact con = [SELECT Id, (SELECT Id, Applicant__c, Status__c, CC_Year__c, Fellowship_Applying_for__c FROM Applications__r ORDER BY CC_Year__c DESC LIMIT 1) FROM Contact WHERE Id = :usrInfo.ContactId];
            if (con != null) {
                fApp = con.Applications__r[0];
            }
        }
        return fApp;
    }


    /**
    * @author           : Harpreet
    * @date             : 11-Jul-2023
    * @description      : Method to return Fellowship Region for current user.
    */
    public static String getFellowshipApplyingFor() {
        Fellow_Application__c fapp = Utility.getFellowApp(Userinfo.getUserId());
        if (fapp != null) return fApp.Fellowship_Applying_for__c;
        return '';
    }


    /**
    * @author           : Harpreet
    * @date             : 11-Jul-2023
    * @description      : Method to return Fellowship Status for current user.
    */
    public static String getFellowshipStatus() {
        Fellow_Application__c fapp = Utility.getFellowApp(Userinfo.getUserId());
        if (fapp != null) return fApp.Status__c;
        return '';
    }


    /**
    * @author           : Harpreet
    * @date             : 11-Jul-2023
    * @description      : Method to return Fellowship Year for current user.
    */
    public static String getFellowshipYear() {
        Fellow_Application__c fapp = Utility.getFellowApp(Userinfo.getUserId());
        if (fapp != null) return fApp.CC_Year__c;
        return '';
    }

    /**
    * @author           : Harpreet
    * @date             : 11-Jul-2023
    * @description      : Method to return Fellowship Id for current user.
    */
    public static String getFellowAppId() {
        Fellow_Application__c fapp = Utility.getFellowApp(Userinfo.getUserId());
        if (fapp != null) return fApp.Id;
        return null;
    }


    /**
    * @author           : Harpreet
    * @date             : 11-Jul-2023
    * @description      : Method to return Fellow's Contact Id for current user.
    */
    public static String getFellowContactId() {
        Fellow_Application__c fapp = Utility.getFellowApp(Userinfo.getUserId());
        if (fapp != null) return fApp.Applicant__c;
        return null;
    }
}
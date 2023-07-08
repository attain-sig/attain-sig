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
}
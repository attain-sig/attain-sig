/*
This file is generated and isn't the actual source code for this
managed global class.
This read-only file shows the class's global constructors,
methods, variables, and properties.
To enable code to compile, all methods return null.
*/
global class DevOps {
    global DevOps() {

    }
    global static Q9.DevOps.Result deleteStories(String apiKey, List<Id> devopsStoryIds) {
        return null;
    }
    global static Q9.DevOps.Result updateStories(String apiKey, Map<String,List<Q9.DevOps.Story>> stories) {
        return null;
    }
global class DevOpsException extends Exception {
}
global class ElementsStory {
    global String acceptanceCriteria;
    global String description;
    global String elementsId;
    global String summary;
    global Boolean syncWithElements;
    global ElementsStory() {

    }
}
global class Environment {
    global String devopsId;
    global String myDomain;
    global String name;
    global String orgId;
    global Boolean production;
    global String url;
    global Environment() {

    }
}
global class PipelineStage {
    global String devopsId;
    global Q9.DevOps.Environment environment;
    global String name;
    global Datetime promotionDateTime;
    global PipelineStage() {

    }
}
global class Result {
    global Map<String,Object> error;
    global String foundStatus;
    global Object item;
    global Integer responseStatusCode;
    global String returnJson;
}
global class Story {
    global String description;
    global String devopsDomain;
    global String devopsId;
    global String devopsStoryUrl;
    global String elementsId;
    global Set<String> metadata;
    global String name;
    global Q9.DevOps.PipelineStage stage;
    global String state;
    global String storyGroupId;
    global String subject;
    global Boolean syncWithElements;
    global Story() {

    }
}
global class StoryGroup {
    global Boolean active;
    global String devopsId;
    global String name;
    global Q9.DevOps.Environment releaseEnv;
    global StoryGroup() {

    }
}
}

/*
This file is generated and isn't the actual source code for this
managed global class.
This read-only file shows the class's global constructors,
methods, variables, and properties.
To enable code to compile, all methods return null.
*/
global interface IElements {
    Map<String,List<Q9.DevOps.Story>> createStories(Map<String,List<Q9.DevOps.ElementsStory>> param0);
    List<Q9.DevOps.Story> getStoriesByStoryGroup(String param0);
    List<Q9.DevOps.StoryGroup> getStoryGroups();
    List<String> getUrlsByStoryGroup(String param0);
    Map<String,List<Q9.DevOps.Story>> linkStories(Map<String,String> param0);
    void unlinkStoriesByDevOpsId(List<String> param0);
    void unlinkStoriesByStoryId(List<String> param0);
    void updateStories(List<Q9.DevOps.ElementsStory> param0);
}

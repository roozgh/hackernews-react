import { useState, useEffect } from "react";
import { Collapse } from "antd";
import { Story } from "./Story";
import { Item as StoryI } from "../types/hackernews";
import { getTopStoryIDs, getTopStoriesDetails } from "../services/api";

export const Stories = () => {
  const [stories, setStories] = useState<StoryI[]>([]);

  useEffect(() => {
    const fetch = async () => {
      const topStoryIDs = await getTopStoryIDs();
      const topXStoryIDs = topStoryIDs.slice(0, 10);
      const stories = await getTopStoriesDetails(topXStoryIDs);
      const topStories = topXStoryIDs.map((storyID) =>
        stories.find(({ id }) => id === storyID)
      ) as StoryI[];
      setStories(topStories);
    };
    fetch();
  }, []);

  return (
    <Collapse accordion>
      {stories.map((story, index) => (
        <Collapse.Panel
          header={<Story story={story} index={index + 1} />}
          key={story.id}
        ></Collapse.Panel>
      ))}
    </Collapse>
  );
};

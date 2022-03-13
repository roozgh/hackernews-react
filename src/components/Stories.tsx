import { useState, useEffect } from "react";
import { Collapse, Empty } from "antd";
import { config } from "../config";
import { Story } from "./Story";
import { Item as StoryI } from "../types/hackernews";
import { getTopStoryIDs, getItemsDetails } from "../services/api";
import { Comments } from "./Comments";

export const Stories = () => {
  const [stories, setStories] = useState<StoryI[]>([]);

  useEffect(() => {
    const fetch = async () => {
      const topStoryIDs = await getTopStoryIDs();
      const topXStoryIDs = topStoryIDs.slice(0, config.MAX_STORIES);
      const stories = await getItemsDetails(topXStoryIDs);
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
        <Collapse.Panel header={<Story story={story} index={index + 1} />} key={story.id}>
          {!story.kids ? (
            <Empty description="No Comments Yet" image={Empty.PRESENTED_IMAGE_SIMPLE} />
          ) : (
            <Comments kids={story.kids.slice(0, config.MAX_COMMENTS)} />
          )}
        </Collapse.Panel>
      ))}
    </Collapse>
  );
};

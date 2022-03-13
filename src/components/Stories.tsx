import { Collapse } from "antd";
import { Story } from "./Story";
import { mockStories } from "../mock-data/stories";

export const Stories = () => {
  return (
    <Collapse accordion>
      {mockStories.map((story, index) => (
        <Collapse.Panel
          header={<Story story={story} index={index + 1} />}
          key={story.id}
        ></Collapse.Panel>
      ))}
    </Collapse>
  );
};

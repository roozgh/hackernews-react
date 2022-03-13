import { Typography, Divider } from "antd";
import { formatDistanceToNow } from "date-fns";
import { Item } from "../types/hackernews";

const { Title, Text } = Typography;

interface StoryProps {
  index: number;
  story: Item;
}

export const Story = ({ index, story }: StoryProps) => {
  const { title, by, score, url, time, descendants } = story;
  return (
    <div>
      <Title level={5}>
        {index}. &nbsp; {title} [
        <a href={url} target="_blank" rel="noreferrer">
          link
        </a>
        ]
      </Title>
      <Divider style={{ margin: 5 }} />
      <Text type="secondary" italic style={{ fontSize: 11 }}>
        {score} points | by {by} | posted {formatDistanceToNow(time * 1000)} ago | {descendants}{" "}
        comments
      </Text>
    </div>
  );
};

import { Layout, Typography } from "antd";
import { config } from "./config";
import { Stories } from "./components/Stories";

const { Header, Content } = Layout;
const { Title } = Typography;

export const Hackernews = () => {
  return (
    <Layout>
      <Header>
        <Title level={4} style={{ color: "#FFF", marginTop: 18 }}>
          Top {config.MAX_STORIES} Hacker News Stories
        </Title>
      </Header>
      <Content>
        <Stories />
      </Content>
    </Layout>
  );
};

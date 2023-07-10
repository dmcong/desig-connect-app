import { Content } from "antd/es/layout/layout";

export default function Evms(props: any) {
  return (
    <Content
      style={{
        padding: 24,
      }}
    >
      {props.content}
    </Content>
  );
}

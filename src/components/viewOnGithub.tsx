import { Button, Space, Typography } from 'antd'

const ViewOnGithub = ({ src }: { src: string }) => {
  const path = `~${src}/index.tsx`.replace('//', '/').replace('~~', '~')

  return (
    <Space size={4}>
      <Typography.Text>View on</Typography.Text>
      <Button
        type="link"
        onClick={() =>
          window.open(
            `https://github.com/dmcong/desig-connect-app/blob/main/src/views/${path}`,
            '_blank',
          )
        }
        style={{ padding: 0 }}
      >
        Github
      </Button>
    </Space>
  )
}

export default ViewOnGithub

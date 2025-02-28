import { Button, Card, Flex } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Input } from "antd";
const { Search } = Input;
const Users = () => {
  const onSearchRes = (value) => console.log(value);
  return (
    <div className="">
      <Card>
        <Flex justify="space-between">
          <div>
            <Search
              placeholder="Search user"
              onChange={(e) => onSearchRes(e.target.value)}
            />
          </div>
          <div>
            <Button
              type="primary"
              size="default"
              icon={<PlusOutlined />}
              style={{
                background: "#820C59",
                color: "white",
              }}
            >
              Create
            </Button>
          </div>
        </Flex>
      </Card>
    </div>
  );
};

export default Users;

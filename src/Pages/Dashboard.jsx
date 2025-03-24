/* eslint-disable no-unused-vars */
import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../htttp/api";
import { Card, List, Avatar, Popover } from "antd";
import { User } from "lucide-react";

function Dashboard() {
  const { data } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
    placeholderData: (prevData) => prevData,
  });

  // Role priority order
  const rolePriority = { manager: 1, engineer: 2, analyst: 3 };

  // Sort users based on role priority
  const sortedUsers = data?.data
    ? [...data.data].sort((a, b) => rolePriority[a.role] - rolePriority[b.role])
    : [];

  return (
    <div className="container mx-auto  px-4 py-8">
      <h1 className="text-4xl font-semibold text-black mb-8 text-center">
        Team Dashboard
      </h1>
      <div className="flex gap-6">
        {/* Team Members List (Scrollable) */}
        <Card
          title="Team Members"
          style={{ width: "50%", maxHeight: "400px", overflowY: "auto" }}
        >
          <List
            itemLayout="horizontal"
            dataSource={sortedUsers}
            renderItem={(user) => (
              <List.Item>
                <Popover
                  content={
                    <div className="text-sm">
                      <p>Email: {user.email}</p>
                      <p>
                        Joined: {new Date(user.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  }
                  title="User Details"
                  trigger="hover"
                >
                  <div className="flex items-center gap-3 cursor-pointer">
                    <Avatar icon={<User />} />
                    <div>
                      <p className="font-semibold">{user.name}</p>
                      <p className="text-gray-500 text-sm">{user.role}</p>
                    </div>
                  </div>
                </Popover>
              </List.Item>
            )}
          />
        </Card>

        {/* Other Card */}
        <Card title="Recent Analytics" style={{ width: "50%" }}>
          <p>Activity 1: User joined</p>
          <p>Activity 2: Profile updated</p>
          <p>Activity 3: New role assigned</p>
        </Card>
      </div>
    </div>
  );
}

export default Dashboard;
